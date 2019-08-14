'use strict'

var test = require('tape')
var defer = require('./index.js')

var deferred = defer()

test('creates an object with resolve, reject, promise', function (t) {
  t.ok(deferred.resolve)
  t.ok(deferred.reject)
  t.ok(deferred.promise)
  t.end()
})

test('promise is instanceof Promise', function (t) {
  t.ok(deferred.promise instanceof Promise)
  t.end()
})
