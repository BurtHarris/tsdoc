
import * as path from "path"
import * as fs from "fs"
import * as glob from "glob"
import * as Handlebars from "handlebars"
import { injectable } from "./annotations"
import { DocEntry, ViewParams } from "./types"

@injectable()
export class HandlebarsRenderer {

  views = new Map<string, (params: ViewParams) => void>()

  constructor(public viewsDir: string) {
    for (const viewPath of glob.sync(path.join(viewsDir, '**/*.hbs'))) {
      this.views.set(path.basename(viewPath.substring(0,viewPath.length-4)), Handlebars.compile(fs.readFileSync(viewPath).toString()))
    }
  }

  render(viewName: string, params: ViewParams) {
    return this.views.get(viewName)(params)
  }

}

export default HandlebarsRenderer

