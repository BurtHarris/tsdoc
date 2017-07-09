#!/usr/bin/env node

import 'source-map-support/register'
import 'neat-errors/register'

import * as ts from 'typescript'
import * as fs from 'fs'
import * as path from 'path'
import * as minimist from 'minimist'
import * as vfs from 'vinyl-fs'

import createProgram from '../createProgram'
import { toArray } from '../util'
import { Documenter } from '..'

const argv = minimist(process.argv.slice(2))

const documenter = new Documenter({ })

const options = getCompilerOptionsFromArgv(argv['--'] || [])

if (argv.length < 1) {
  console.error('command requires arguments')
  process.abort()
}

let { program, errors } = argv._.length > 0
  ? createProgram(argv._, getCompilerOptionsFromArgv(argv))
  : createProgram(argv['project'] || 'tsconfig.json')

if (errors) {
  for (const error of errors) {
    renderError(error)
  }
  process.exit(1)
}

const destDir = argv['out'] || 'docs'

if (fs.existsSync(destDir)) {
  console.error(`Directroy ${destDir} already exists. Updating is not yet supported. For now, you have to delete it manually.`)
  process.exit(1)
}

documenter.analyse(program!)

const generated = vfs.src(program!.getRootFileNames())
  .pipe(documenter.run())
  .pipe(vfs.dest(destDir))

function renderError (error: ts.Diagnostic): string {
  let output = ''
  if (error.file) {
    const loc = ts.getLineAndCharacterOfPosition(error.file, error.start || 0)
    output += `${ error.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `
  }
  output += `${ ts.flattenDiagnosticMessageText(error.messageText, ts.sys.newLine) }`
  return output
}

function getCompilerOptionsFromArgv (argv: string[]) {
  const { options, errors } = ts.parseCommandLine(argv)
  if (!options) {
    for (const err of errors) {
      console.error(renderError(err))
    }
    process.exit(1)
  }
  return options
}
