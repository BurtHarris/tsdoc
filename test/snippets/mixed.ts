/**
 * @module
 * @description
 * This module is in TypeScript.
 */
// tslint:disable:no-empty

type Point = [number, number]

/**
 * Documentation for C
 * @class
 */
export class C {
  constructor (public a: string, public b: C) {

   }
  foo (p: Point) {
    console.log('foo')
  }
}

/**
 * This is just another quick test.
 */
export function testSome (a: number, b: number) {

}

export const baz: number = 3

declare namespace Foo {

  export interface Baz {
    a: string
    b: number
  }

}
