
import { Container } from "inversify"

import getDecorators from "inversify-inject-decorators"

export { injectable } from "inversify"

export const container = new Container()

const { lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject } = getDecorators(container)

export { 
  lazyInject as inject
, lazyInjectNamed as injectNamed
, lazyInjectTagged as injectTagged
, lazyMultiInject as multiInject
} 

