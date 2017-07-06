
function getDeep(val: any, path: string) {
  for (const chunk of path.split('.'))
    val = val[chunk]
  return val
}

function setDeep(val: any, path: string, newVal: any) {
  const chunks = path.split('.')
  for (const chunk of chunks.slice(-1))
    val = val[chunk]
  val[chunks[chunks.length-1]] = newVal
}

function assignDeep(obj: any, toAssign: any) {
  if (toAssign === undefined)
    return
  for (const key of Object.keys(toAssign)) {
    obj[key] = toAssign[key]
    if ((typeof obj === 'object' && obj !== null) || typeof obj === 'function')
      assignDeep(obj[key], toAssign[key])
  }
}

function defaultsDeep(obj: any, defaults: any) {
  if (defaults === undefined)
    return
  for (const key of Object.keys(defaults)) {
    obj[key] = obj[key] === undefined ? defaults[key] : obj[key]
    if ((typeof obj === 'object' && obj !== null) || typeof obj === 'function')
      defaultsDeep(obj[key], defaults[key])
  }
}

export class Config {

  protected _values = Object.create(null)

  get(path: string) {
    return getDeep(this._values, path)
  }

  set(path: string, newVal: any) {
    setDeep(this._values, path, newVal)
  }

  assign(obj: any, path: string = '') {
    if (obj instanceof Config)
      obj = obj._values
    assignDeep(this._values, this.get(path))
  }

  defaults(obj: any, path: string = '') {
    if (obj instanceof Config)
      obj = obj._values
    defaultsDeep(this._values, this.get(path))
  }

}

export default Config

