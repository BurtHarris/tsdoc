// geometry.js
/** 
 * @module 
 * @description 
 * See usejs.org for info on ES2015 [classes](http://usejsdoc.org/howto-es2015-classes.html) and 
 * [modules](http://usejsdoc.org/howto-es2015-modules.html).
 */

/**
 * @class Class representing a 2 dimensional point
 */
export class Point {
    /**
     * Generate point from numeric values x & y
     * @param {number} x Position of the Point with reference to the x-axis in a 2D Cartesian coordinate system
     * @param {number} y Position of the Point with reference to the y-axis in a 2D Cartesian coordinate system
     */
    constructor(x, y) {
        /** @member: {number} */
        this.x = x;
        /** @member: {number} */
        this.y = y;
    }

    /**
     * An ugly way to get the x value.
     * @return {number} The x value.
     */
    getX() {
        // ...
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
        const m = str.match(/(\d+),(\d+)/)
        if (m) return new Point(m[0], m[1])
        throw new Error(`Not a valid Point: '${str}'`)
    }
}

/**
 * Class representing a dot.
 * @extends Point
 */
export class Dot extends Point {
    /**
     * Create a dot.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width of the dot, in pixels.
     */
    constructor(x, y, width) {
        super(x,y)
        this.width = width;
    }

    /**
     * Get the dot's width.
     * @return {number} The dot's width, in pixels.
     */
    getWidth() {
        // ...
    }

    /**
     * @return {string} a represenation of the object as a string
     */
    toString() {
        return `!Dot(${this.x},${this.y},${this.width})`

    }
}
