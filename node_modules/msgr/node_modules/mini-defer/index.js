'use strict'

/* global Promise:false */

/**
 * Create a deferred.
 * @returns {Object}
 */
function defer () {
  var res
  var rej
  var promise = new Promise(function (resolve, reject) {
    res = resolve
    rej = reject
  })
  return {
    promise: promise,
    resolve: res,
    reject: rej
  }
}

/* global define:false window:false */
if (typeof define === 'function' && define.amd) {
  define('miniDefer', function () {
    return defer
  })
} else if (typeof module === 'object' && module.exports) {
  module.exports = defer
} else if (typeof window !== 'undefined') {
  window.miniDefer = defer
} else {
  throw new Error(
    'Environment is not supported. ' +
    'Please raise an issue at https://github.com/sdgluck/mini-defer/issues'
  )
}
