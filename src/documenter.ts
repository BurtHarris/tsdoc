
import * as path from 'path'
import * as ts from 'typescript'

import { Renderer, DocumenterOptions, RunOptions } from './types'
import { Visitor } from './transform'
import DocEntryFactory from './transform_factory'
import HandlebarsRenderer from './renderer'
import * as Vinyl from 'vinyl'
import * as through from 'through2'
import { getSourceFile } from './helpers'

export class Documenter {
    cwd: string
    renderer: Renderer
    visitor: Visitor
    factory: DocEntryFactory

    constructor (public options: DocumenterOptions) {
    this.renderer = new HandlebarsRenderer(path.resolve(__dirname, '..', 'theme', 'views'))
    this.factory = new DocEntryFactory()
    this.visitor = new Visitor(this.factory)
  }

    analyse (program: ts.Program) {
      for (const sourceFile of program.getSourceFiles()) {
      this.visitor.visit(sourceFile)
    }
    }

    run (options: RunOptions = {}) {

      const documenter = this
      function writeDocumentation (file: Vinyl, encoding: string, callback: () => void) {
      for (const entry of documenter.factory.interfaces) {
        // TODO
      }
      for (const entry of documenter.factory.classes) {
        const filePath = `class_${entry.id}.html`
        this.push(new Vinyl({
          cwd: file.cwd,
          basedir: file.basedir,
          path: filePath,
          contents: Buffer.from(documenter.renderer.render('class', entry), 'utf8')
        }))
      }
      callback()
    }

      return through.obj(writeDocumentation)
    }

}

export default Documenter
