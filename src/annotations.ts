
import "reflect-metadata"

import { PROVIDES_KEY, TYPES } from "./constants"

import { injectable, Container } from "inversify"

import getDecorators from "inversify-inject-decorators"

export function getProvided(target: any) {
  return Reflect.getMetadata(PROVIDES_KEY, target) || []
}

function createInjectable(type: Symbol) {
  return function (name: string) {
    return function (target: any) {
      const newTarget = injectable()(target)
      const provides = getProvided(newTarget)
      Reflect.defineMetadata(PROVIDES_KEY, provides.concat([[type, name]]), newTarget)
      return newTarget
    }
  }
}

export const renderer = createInjectable(TYPES.Renderer)

export const container = new Container()

const { lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject } = getDecorators(container)

export { 
  injectable
, lazyInject as inject
, lazyInjectNamed as injectNamed
, lazyInjectTagged as injectTagged
, lazyMultiInject as multiInject
} 

