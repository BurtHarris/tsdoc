
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

export function compose<T,R,S>(a: (T) => R, b: (R) => S): (T) => S {
  return function (arg: T) {
    return b(a(arg))
  }
}

export function omit(obj: any, ...toOmit: string[]) {
  const newObj = {}
  for (const key of Object.keys(obj))
    if (toOmit.indexOf(key) === -1)
      newObj[key] = obj[key]
  return newObj
}

