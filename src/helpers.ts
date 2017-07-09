
import * as fs from 'fs'
import * as assert from 'assert'

import { DocEntry } from './types'

export function getSourceFile (node: DocEntry) {
  while (node) {
    if (node.kind === 'SourceFile') return node
    node = node.parent!
  }
  console.assert(false, 'Unable to locate source file node in tree')
  process.abort()
}

export function getLineAndColumn (node: DocEntry, pos = node.pos) {
  const sourceFile = getSourceFile(node)
  if (!sourceFile) {
    return null
  }
  const content = sourceFile.text || fs.readFileSync(sourceFile.fileName)
  let offset = 0
  let line = 0
  let column = 0
  for (const char of content) {
    if (offset === pos) return { line, column }
    if (char === '\n') {
      column = 0
      ++line
    } else ++column
  }
  return null
}
