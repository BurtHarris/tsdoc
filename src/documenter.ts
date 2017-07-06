
import * as path from "path"
import * as ts from "typescript"
import { Theme, RunOptions, PluginExports, Provider, DocumenterOptions } from "./types"
import { Container, ContainerModule, interfaces } from "inversify"

import { TYPES } from "./constants"
import { Renderer } from "./types"
import { ThemeDetails, getProvided, getTags, injectable, container } from "./annotations"
import { omit, mapValues } from "./util"
import { visit, Visitor } from "./transform"
import DocEntryFactory from "./transform_factory"

@injectable()
export class Documenter {

  container = new Container()      

  renderer: Renderer

  themes: Map<string, ThemeDetails>
  plugins: Map<string, PluginExports>

  constructor(public options: DocumenterOptions) {
    this.container.load(createConfigModule(omit(options, 'plugins')))
    this.container.parent = container
    this.container.bind<Documenter>(TYPES.Documenter).toConstantValue(this)

    this.plugins = index(options.plugins, plugin => plugin.default.id)
    this.themes = index(options.themes, theme => theme.name)

    for (const exports of this.plugins.values()) {
      for (const exportName of Object.keys(exports)) {
        if (exportName === 'default')
          container.bind<Plugin>(TYPES.Plugin).to(exports.default).whenTargetNamed(exports.default.id)
        else if (typeof exports[exportName] === 'function') {
          const target = exports[exportName]
          if (getProvided(target)) {
            for (const [TYPE, isFactory] of getProvided(target)) {
              let binding
              if (isFactory)
                binding = container.bind<any>(TYPE).to(exports[exportName])
              else
                binding = container.bind<any>(TYPE).toFactory(exports[exportName])
              for (const [key, val] of getTags(target))
                binding.whenTargetTagged(key, val)
            }
          }
        }
      }
    }

  }

  findTheme(themeName: string) {
    return this.themes.get(themeName)
  }

  run(program: ts.Program, options: RunOptions) {

    let { theme } = options

    if (theme === undefined)
      theme = 'default'

    const themeDetails = this.findTheme(options.theme)
    console.log(themeDetails)
    if (themeDetails === undefined)
      throw new Error(`theme ${theme} not found`)
    
    // create a container with run configuration
    const container = new Container()
    container.parent = this.container
    console.log(Object.assign(omit(options, 'theme'), themeDetails))
    container.load(createConfigModule(Object.assign(omit(options, 'theme'), themeDetails)))

    const renderer = container.getTagged<Renderer>(TYPES.Renderer, "engine", themeDetails.engine)
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

