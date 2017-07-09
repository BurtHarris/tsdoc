/** 
 * @module
 * @author Burt Harrs
 * @description This module is unambigiously an **ES2015 module** due to the top-level **`export`** statments it contains.   
 * 
 * JSDoc didn't pick up on that automatically.   It still needed me to insert a `@module` JSDoc comment.
 * This may or may not be a good thing!
 */

/** Write console
 * @description  Write a pleasant greeting to the console
 * 
 * This description containsesome [markdown](https://www.npmjs.com/package/marked) annotations with *italic*, and **bold**.
 */
export function greet() {
    console.log('hello JavaScript')
}

/**
 * Write exclamation
 */
export function wow() {
    console.log('Wow, it works!')
}
