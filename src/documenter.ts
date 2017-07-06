
import * as ts from "typescript"
import { RunOptions, PluginExports, Provider, DocumenterOptions } from "./types"
import { Container } from "inversify"

import { TYPES } from "./types"
import { container } from "./annotations"
import { mapValues } from "./util"
import { visit, Visitor } from "./transform"
import DocEntryFactory from "./transform_factory"

function index<K,T>(els: T[], mapper: (el: T) => K) {
  const map = new Map<K,T>()
  for (const el of els) {
    map.set(mapper(el), el)
  }
  return map
}

export class Documenter {

  container = new Container()      

  plugins: Map<string, PluginExports>

  constructor(public options: DocumenterOptions) {
    this.container.parent = container
    this.plugins = index(options.plugins, plugin => plugin.default.id)
  }

  run(program: ts.Program, options: RunOptions) {

    for (const exports of this.plugins.values()) {
      container.bind<Plugin>(TYPES.Plugin).to(exports.default).whenTargetNamed(exports.default.id)
    }

    const plugins = mapValues(this.plugins, exports => container.getNamed(TYPES.Plugin, exports.default.id))

    const factory = new DocEntryFactory()
    const visitor = new Visitor(factory)
    for (const sourceFile of program.getSourceFiles()) {
      visitor.visit(sourceFile)
    }
    for (const decl of factory.classes) {
      console.log(decl.kind)
    }

  }

}

export default Documenter

