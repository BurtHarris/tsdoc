
import "reflect-metadata"

import { compose } from "./util"
import { TAGS_KEY, PROVIDES_KEY, TYPES } from "./constants"

import { decorate, injectable, Container } from "inversify"

import getDecorators from "inversify-inject-decorators"

export function getProvided(target: any) {
  return Reflect.getMetadata(PROVIDES_KEY, target) || []
}

export function getTags(target: any) {
  return Reflect.getMetadata(TAGS_KEY, target) || []
}

function createInjectable(type: Symbol, isFactory = false) {
  return function (target: any) {
    decorate(injectable(), target)
    const provides = getProvided(target)
    Reflect.defineMetadata(PROVIDES_KEY, provides.concat([[type, isFactory]]), target)
    return target
  }
}

export function tag(key: string, value: any) {
  return function (target: any) {
    const tags = getTags(target)
    Reflect.defineMetadata(TAGS_KEY, tags.concat([[key, value]]), target)
    return target
  }
}

export const renderer = function (engineName: string) {
  return function (target: any) {
    decorate(createInjectable(TYPES.Renderer, true), target)
    decorate(tag('engine', engineName), target)
  }
}

export const container = new Container()

const { lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject } = getDecorators(container)

export { 
  injectable
, lazyInject as inject
, lazyInjectNamed as injectNamed
, lazyInjectTagged as injectTagged
, lazyMultiInject as multiInject
} 

