
import * as fs from "fs"

import { DocEntry } from "./types"

export function getSourceFile(node: DocEntry) {
  while (node) {
    if (node.kind === 'SourceFile')
      return node
    node = node.parent
  }
}

export function getLineAndColumn(node: DocEntry, pos = node.pos) {
  const sourceFile = getSourceFile(node)
  if (!sourceFile)
    return null
  const content = sourceFile.text || fs.readFileSync(sourceFile.fileName)
  let offset = 0, line = 0, column = 0
  for (const char of content) {
    if (offset === pos)
      return { line, column }
    if (char === '\n') {
      column = 0;
      ++line;
    } else
      ++column;
  }
  return null
}

