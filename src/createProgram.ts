
import { ProgramOptions } from './types'
import * as path from 'path'
import * as fs from 'fs'
import * as ts from 'typescript'

/**
 * Creates a TypeScript program that will be used to generate documentation from.
 *
 * @param file If a string, must point to a valid tsconfig.json. If an array, must be a list of files to add to the program.
 */
export function createProgram (files: string | string[], compilerOptions: ts.CompilerOptions = {}): { program?: ts.Program, errors?: ts.Diagnostic[] } {

  if (typeof files === 'string') {

    const basePath: string = path.resolve()
    const { config, error } = ts.parseConfigFileTextToJson('tsconfig.json', fs.readFileSync(path.resolve(basePath, 'tsconfig.json')).toString())

    if (error) {
      return { errors: [error] }
    }

    const { errors, fileNames, options } = ts.parseJsonConfigFileContent(config, ts.sys, basePath)
    if (!options) {
      return { errors }
    }

    return { program: ts.createProgram(fileNames, mergeCompilerOptions(compilerOptions, options)) }
  } else {
    return { program: ts.createProgram(files, compilerOptions) }
  }

}

export default createProgram

/**
 * Merges two independant TypeScript compiler options objects into one.
 *
 * If two conflicting values exist, the value of the leftmost argument will be
 * used.
 */
function mergeCompilerOptions (a: ts.CompilerOptions, b: ts.CompilerOptions) {
  // FIXME: this just does a regular assignment, which is probably not what we
  // want for options accepting an array
  return Object.assign({}, a, b)
}
