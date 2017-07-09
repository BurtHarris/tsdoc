TSDoc/test 
==========

Contents
--------

This directory contains some files for testing.   There are a couple of ECMAScript 2015 modules, {@link module:es2015/geometry} and {@link module:es2015/try}.   There should also be a {@link module:snippets/mixed} module, but so far TypeScript isn't working...

JSDoc Options
-------------
```json
{
    "plugins": [
        "plugins/markdown"
    ],
    "markdown": {
        "tags": [
            "foo",
            "bar"
        ]
    },
    "recurseDepth": 10,
    "source": {
        "includePattern": ".(t|j)s(doc|x)?$",
        "excludePattern": ""
    },
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": [
            "jsdoc",
            "closure"
        ]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
```

Misc