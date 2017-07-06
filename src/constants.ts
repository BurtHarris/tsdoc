
/**
 * Keyword in package.json that is used to detect a TSDoc-compatible theme
 */
export const THEME_KEYWORD = "tsdoc-theme"

/**
 * Keyword in package.json that is used to detect a TSDoc-compatible plugin
 */
export const PLUGIN_KEYWORD = "tsdoc-plugin"

/**
 * Interface types that are used by the IoC container.
 */
export const TYPES = {
  Theme: Symbol('tsdoc theme'),
  Renderer: Symbol('tsdoc renderer'),
  Documenter: Symbol('tsdoc documenter'),
  Plugin: Symbol('tsdoc plugin'),
}

/**
 * Used to mark a class as implementing a certain type/interface.
 */
export const PROVIDES_KEY = "provides"

/**
 * Used to tag a class with a specific key-value pair.
 */
export const TAGS_KEY = "tags"

