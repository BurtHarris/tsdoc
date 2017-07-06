
export function mapValues<K,V,R>(map: Map<K,V>, proc: (val: V) => R) {
  const newMap = new Map<K,R>()
  for (const [key, val] of map) {
    newMap.set(key, proc(val))
  }
  return newMap
}

export function toArray<T>(val: T | T[] | undefined): T[] {
  if (val === undefined)
    return []
  if (val instanceof Array)
    return val
  return [val]
}

