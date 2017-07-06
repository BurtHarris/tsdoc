#!/usr/bin/env node

import * as ts from "typescript"
import * as fs from "fs"
import * as path from "path"
import * as minimist from "minimist"

import { visit, Visitor } from "../transform"
import DocEntryFactory from "../transform_factory"

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

const program = createProgram(minimist(process.argv.slice(2)))
const factory = new DocEntryFactory()
const visitor = new Visitor(factory)

for (const sourceFile of program.getSourceFiles()) {
  visitor.visit(sourceFile)
}

for (const decl of factory.classes) {
  console.log(decl.kind)
}

