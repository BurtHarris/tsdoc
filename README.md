
[![Gitter](https://badges.gitter.im/TypeForce/tsdoc.svg)](https://gitter.im/TypeForce/tsdoc?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Build status](https://ci.appveyor.com/api/projects/status/8omlvo00ww98npsb?svg=true)](https://ci.appveyor.com/project/samvv/tsdoc) [![Build Status](https://travis-ci.org/TypeForce/tsdoc.svg?branch=master)](https://travis-ci.org/TypeForce/tsdoc)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


> TSDoc is aiming to be an augmentation or replacement of
> [TypeDoc](https://github.com/TypeStrong/TypeDoc), a documentation generator
> for TypeScript and JavaScript. The main features of this new version are a
> pluggable architecture, full themability and a flexible and highly
> configurable output.

:point_up: We could use a helping hand. If you think you're up for it, [open an issue](https://github.com/TypeForce/tsdoc/issues/new).

:warning: tsdoc is under heavy development. The current code is still unstable
and does not generate full documentation just yet. If you want to know when it
will be finished, you can [watch](https://github.com/TypeForce/tsdoc/watchers)
the repository.

## Developer Notes

We use [Gulp](http://gulpjs.com/) to build the sources. Here are some usefull commands:

 - `gulp watch` watches the directory for changes and will compile all source files
 - `gulp compile` will compile all of TSDoc's source files and plugins

We also use [InversifyJS](https://github.com/inversify/InversifyJS) as a means
to decouple **configuration** from **implementation**. In general, string bindings
are used to denote a configuration entry and bingins using a
[symbol](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
are used to denote a specific interface.

