# mini-defer

> Tiny module for creating a deferred with no polyfilling

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/serialise-response"><img alt="npm version" src="https://badge.fury.io/js/serialise-response.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

    npm install mini-defer --save

__ES6 Import (w/ Babel)__

    import defer from 'mini-defer'

__CommonJS Require__

    var defer = require('mini-defer')

__Script__

    <script src="/node_modules/mini-defer/index.js"></script>
    typeof window.miniDefer //=> "Function"

## Usage

`defer() : Object`

Create a deferred.

## Example

    function operation ()
      const deferred = defer()
      const eventBasedOperation = doOperation()

      eventBasedOperation.onsuccess = deferred.resolve
      eventBasedOperation.onerror = deferred.reject

      return deferred.promise
    }

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds' [great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!
