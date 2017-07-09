
import * as ts from 'typescript'
import Documenter from './documenter'

export interface ThemeDetails {
      name: string
      engine: string
      viewsDir: string
}

export interface Filter {
    isFiltered (node: ts.Node): boolean
}

/**
 * Options passed to `Documenter.run()`.
 */
export interface RunOptions {
      themeName?: string
      filters?: Filter[]
}

export interface ProgramOptions {
      compilerArgs?: string[]
      fileNames: string[]
}

export interface Provider<T> {
      id: string
      new (...args): T
}

export interface DocumenterOptions {
}

// FIXME: no support for cyclic types
export type ViewParams = any

export interface Renderer {
    render (viewName: string, params: ViewParams): string
}

export interface DocEntry {
      parent?: DocEntry
      kind: string
      pos: number
      end: number
      [name: string]: any
}
