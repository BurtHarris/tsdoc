
import * as path from 'path'
import * as fs from 'fs'
import * as glob from 'glob'
import * as Handlebars from 'handlebars'
import { Renderer, DocEntry, ViewParams } from './types'

export class HandlebarsRenderer implements Renderer {

  views = new Map<string, (params: ViewParams) => string>()

  constructor (viewsDir: string) {
    for (const viewPath of glob.sync(path.join(viewsDir, '**/*.hbs'))) {
      this.views.set(path.basename(viewPath.substring(0, viewPath.length - 4)),
        Handlebars.compile(fs.readFileSync(viewPath).toString()))
    }
  }

  hasView (viewName: string) {
    return this.views.has(viewName)
  }

  render (viewName: string, params: ViewParams): string {
    const view = this.views.get(viewName)
    if (view === undefined) throw new Error(`view ${viewName} not found`)
    return view(params)
  }

}

export default HandlebarsRenderer
