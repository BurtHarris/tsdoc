#!/usr/bin/env node

import * as ts from "typescript"
import * as fs from "fs"
import * as path from "path"
import * as minimist from "minimist"

import { Provider } from "../types"
import { toArray } from "../util"
import { Documenter } from ".."

const argv = minimist(process.argv.slice(2))

console.log(scanPlugins().concat(toArray(argv['plugin'])))

const documenter = new Documenter({ 
  plugins: scanPlugins().concat(toArray(argv['plugin']).map(pluginDir => path.resolve(pluginDir))).map(require)
})

const program = createProgram(argv)

console.log(documenter.run(program, {}))

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

function scanPlugins() {

  let res = new Set<string>()

  function getPluginDirsUpToRoot(dir: string) {
    for (const parentDir of parentDirs(dir)) {
      console.log(parentDir)
      if (fs.existsSync(path.join(parentDir, 'node_modules')))
        for (const modulename of fs.readdirSync(path.join(parentDir, 'node_modules'))) {
          const packageJsonPath = path.join(parentDir, 'node_modules', modulename, 'package.json')
          if (fs.existsSync(packageJsonPath)
              && (require(packageJsonPath).keywords || []).indexOf('tsdoc-plugin') !== -1)
            res.add(path.join(parentDir, 'node_modules', modulename))
        }
    }
  }

  return [...res]
}

