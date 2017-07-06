#!/usr/bin/env node

import "source-map-support/register"
import "neat-errors/register"

import * as ts from "typescript"
import * as fs from "fs"
import * as path from "path"
import * as minimist from "minimist"

import { Provider } from "../types"
import { toArray } from "../util"
import { Documenter } from ".."

const argv = minimist(process.argv.slice(2))

const documenter = new Documenter({
  themes: scanThemes()
    .concat(toArray(argv['add-theme']).map(themeDir => path.resolve(themeDir)))
    .map(themeDir => {
      const packageJson = require(path.join(themeDir, 'package.json'))
      return {
        name: (packageJson.theme && packageJson.theme.name)  || getThemeName(packageJson.name || path.basename(themeDir))
      , viewsDir: (packageJson.theme && packageJson.theme.viewsDir) || path.join(themeDir, 'views')
      , engine: (packageJson.theme && packageJson.theme.engine) || 'handlebars'
      }
    })
, plugins: scanPlugins()
    .concat(toArray(argv['plugin']).map(pluginDir => path.resolve(pluginDir)))
    .map(require)
})

const program = createProgram(argv)

console.log(documenter.run(program, {
  themeName: argv['theme'] || 'default',
}))

function renderError(error: ts.Diagnostic): string {
  let output = ''
  if (error.file) {
    const loc = ts.getLineAndCharacterOfPosition(error.file, error.start);
    output += `${ error.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
  }
  output += `${ ts.flattenDiagnosticMessageText(error.messageText, ts.sys.newLine) }`
  return output
}

function createProgram(argv: minimist.ParsedArgv) {

  if (argv._.length > 0) {

    const { options, errors } = ts.parseCommandLine(argv['--'] || [])
    if (!options) {
      for (const err of errors) {
        console.error(renderError(err));
      }
      process.exit(1);
    }

    return ts.createProgram(argv._, options);

  } else {

    const basePath: string = path.resolve(argv['project'])
    const { config, error } = ts.parseConfigFileTextToJson("tsconfig.json", fs.readFileSync(path.resolve(basePath, "tsconfig.json")).toString())

    if (error) {
      console.error(renderError(error));
      process.exit(1);
    }

    const { errors, fileNames, options } = ts.parseJsonConfigFileContent(config, ts.sys, basePath);
    if (!options) {
      for (const err of errors) {
        console.error(renderError(err));
      }
      process.exit(1);
    }

    return ts.createProgram(fileNames, options);
  }

}

function parentDirs(startDir: string) {
  let res = []
  if (fs.statSync(startDir).isDirectory())
    res.push(startDir)
  while (path.dirname(startDir) !== startDir) {
    const parentDir = path.dirname(startDir)
    res.push(parentDir)
    startDir = parentDir
  }
  return res
}

function findNodeModulesWithKeyword(dirs: string[], keyword: string) {
  const res = []
  for (const dir of dirs) {
    for (const parentDir of parentDirs(dir)) {
      if (fs.existsSync(path.join(parentDir, 'node_modules')))
        for (const modulename of fs.readdirSync(path.join(parentDir, 'node_modules'))) {
          const packageJsonPath = path.join(parentDir, 'node_modules', modulename, 'package.json')
          if (fs.existsSync(packageJsonPath)
              && (require(packageJsonPath).keywords || []).indexOf(keyword) !== -1)
            res.push(path.join(parentDir, 'node_modules', modulename))
        }
    }
  }
  return res
}

function scanThemes() {
  return findNodeModulesWithKeyword([__dirname, process.cwd()], 'tsdoc-theme')
}

function scanPlugins() {
  return findNodeModulesWithKeyword([__dirname, process.cwd()], 'tsdoc-plugin')
}

function getThemeName(moduleName: string) {
  const matches = /tsdoc-([a-z0-9]+)-theme/.exec(moduleName) 
  if (matches !== null)
    return matches[1]
  return moduleName
}

