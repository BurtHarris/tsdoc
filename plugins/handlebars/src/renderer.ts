
import * as path from "path"
import * as fs from "fs"
import * as glob from "glob"
import * as Handlebars from "handlebars"
import { renderer, inject, DocEntry, ViewParams } from "tsdoc"

@renderer("handlebars")
export class HandlebarsRenderer {

  views = new Map<string, (params: ViewParams) => void>()

  constructor(@inject("viewsDir") viewsDir: string) {
    for (const viewPath of glob.sync(path.join(viewsDir, '**/*.hbs'))) {
      this.views.set(path.basename(viewPath.substring(0,viewPath.length-4)), 
        Handlebars.compile(fs.readFileSync(viewPath).toString()))
    }
  }

  hasView(viewName: string) {
    return this.views.has(viewName)
  }

  render(viewName: string, params: ViewParams) {
    const view = this.views.get(viewName)
    if (view === undefined)
      throw new Error(`view ${viewName} not found`)
    return view(params)
  }

}

export default HandlebarsRenderer

