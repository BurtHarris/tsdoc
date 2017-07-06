
import * as ts from "typescript"
import Documenter from "./documenter"

export const TYPES = {
  Documenter: Symbol('tsdoc documenter'),
  Plugin: Symbol('tsdoc plugin'),
}

export interface Filter {
  isFiltered(node: ts.Node): boolean
}

/**
 * Options passed to `Documenter.run()`.
 */
export interface RunOptions {
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
  plugins: PluginExports[]
}

