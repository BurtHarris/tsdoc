
import * as path from "path"
import * as ts from "typescript"
import { RunOptions, PluginExports, Provider, DocumenterOptions } from "./types"
import { Container } from "inversify"

import { TYPES } from "./constants"
import { Renderer } from "./types"
import { injectable, container } from "./annotations"
import { mapValues } from "./util"
import { visit, Visitor } from "./transform"
import DocEntryFactory from "./transform_factory"
import HandlebarsRenderer from "./renderer_handlebars"

function index<K,T>(els: T[], mapper: (el: T) => K) {
  const map = new Map<K,T>()
  for (const el of els) {
    map.set(mapper(el), el)
  }
  return map
}

@injectable()
export class Documenter {

  container = new Container()      

  renderer: Renderer

  plugins: Map<string, PluginExports>

  constructor(public options: DocumenterOptions) {
    this.container.parent = container
    this.container.bind<Documenter>(TYPES.Documenter).toConstantValue(this)
    this.renderer = new HandlebarsRenderer(path.join(__dirname, '..', 'theme', 'views'))
    this.container.bind<Renderer>(TYPES.Renderer).toConstantValue(this.renderer)
    this.plugins = index(options.plugins, plugin => plugin.default.id)
  }

  run(program: ts.Program, options: RunOptions) {

    for (const exports of this.plugins.values()) {
      container.bind<Plugin>(TYPES.Plugin).to(exports.default).whenTargetNamed(exports.default.id)
    }
    
    const renderer = this.container.get<Renderer>(TYPES.Renderer)
    const plugins = mapValues(this.plugins, exports => container.getNamed(TYPES.Plugin, exports.default.id))

    const factory = new DocEntryFactory()
    const visitor = new Visitor(factory)

    for (const sourceFile of program.getSourceFiles()) {
      visitor.visit(sourceFile)
    }

    const files = new Map<string, string>()
    for (const decl of factory.classes) {
      files.set(`class_${decl.id}.html`, renderer.render('class', decl))
    }

    return files
  }

}

export default Documenter

