
import * as ts from "typescript"
import Documenter from "./documenter"

export interface ThemeDetails {
  name: string
  engine: string
  viewsDir: string
}

export interface Filter {
  isFiltered(node: ts.Node): boolean
}

/**
 * Options passed to `Documenter.run()`.
 */
export interface RunOptions {
  theme?: string
  filters?: Filter[]
}

export interface Provider<T> {
  new (...args): T
  id: string
}

export interface PluginExports {
  [name: string]: any
  default: Provider<Plugin>
}

export interface DocumenterOptions {
  themes: ThemeDetails[],
  plugins: PluginExports[]
}

// FIXME: no support for cyclic types
export type ViewParams = any

export interface Renderer {
  render(viewName: string, params: ViewParams): string
}

export interface DocEntry {
  parent?: DocEntry
  kind: string
  pos: number
  end: number
  [name: string]: any
}

