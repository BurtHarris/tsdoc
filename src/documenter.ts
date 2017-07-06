
import * as path from "path"
import * as ts from "typescript"
import { Container, ContainerModule, interfaces } from "inversify"

import { DocumenterOptions, RunOptions } from "./types"
import { visit, Visitor } from "./transform"
import DocEntryFactory from "./transform_factory"
import HandlebarsRenderer from "./renderer"

export class Documenter {

  container = new Container()      

  constructor(public options: DocumenterOptions) {
    
  }

  run(program: ts.Program, options: RunOptions) {

    let { themeName } = options

    if (themeName === undefined)
      themeName = 'default'

    const renderer = new HandlebarsRenderer(path.resolve(__dirname, '..', 'theme', 'views'))

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

function index<K,T>(els: T[], mapper: (el: T) => K) {
  const map = new Map<K,T>()
  for (const el of els) {
    map.set(mapper(el), el)
  }
  return map
}

function createConfigModule(config: any) {
  return new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    function traverse(val: any, path: string) {
      if ((typeof val === 'object' && val !== null) || typeof val === 'function')
        for (const key of Object.keys(config)) {
          if (isNaN(parseInt(key)))
            traverse(val[key], path === '' ? key : path+'.'+key)
          else
            traverse(val[key], path+'['+key+']')
        }
      else {
        bind(path).toConstantValue(val)
      }
    }
    traverse(config, '')
  })
}

