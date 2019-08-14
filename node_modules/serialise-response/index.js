'use strict'

/* global Response:false, FileReader:false */

// https://gist.github.com/davoclavo/4424731
function dataURItoBlob (dataURI) {
  var byteString = atob(dataURI.split(',')[1])
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var arrayBuffer = new ArrayBuffer(byteString.length)
  var _ia = new Uint8Array(arrayBuffer)
  for (var i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i)
  }
  var dataView = new DataView(arrayBuffer)
  return new Blob([dataView.buffer], {type: mimeString})
}

/**
 * Serialise a Response to a string or object.
 * @param {Response} response
 */
function serialiseResponse (response) {
  if (!(response instanceof Response)) {
    throw new Error('Expecting response to be instance of Response')
  }

  var headers = []
  var headerNames = response.headers.keys()
  for (var i = 0; i < headerNames.length; i++) {
    var headerName = headerNames[i]
    headers[headerName] = response.headers.get(headerName)
  }

  return new Promise(function (resolve, reject) {
    var reader = new FileReader()
    response.blob().then(function (blob) {
      return reader.readAsDataURL(blob)
    })
    reader.onerror = reject
    reader.onloadend = function () {
      resolve(JSON.stringify({
        type: response.type,
        url: response.url,
        useFinalURL: response.useFinalURL,
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        headers: headers,
        __body: reader.result
      }))
    }
  })
}

/**
 * De-serialise a Response from a string or object.
 * @param {Object|String} response
 */
function deserialiseResponse (response) {
  var realResponse

  if (typeof response === 'string') {
    realResponse = JSON.parse(response)
  } else if (typeof response === 'object') {
    realResponse = response
  } else {
    throw new Error('Expecting serialised response to be a string or object')
  }

  return new Response(dataURItoBlob(realResponse.__body))
}

serialiseResponse.deserialise = deserialiseResponse
serialiseResponse.deserialize = deserialiseResponse

/* global define:false window:false */
if (typeof define === 'function' && define.amd) {
  define('serialiseResponse', function () {
    return serialiseResponse
  })
  define('serializeResponse', function () {
    return serialiseResponse
  })
} else if (typeof module === 'object' && module.exports) {
  module.exports = serialiseResponse
} else if (typeof window !== 'undefined') {
  window.serialiseResponse = serialiseResponse
  window.serializeResponse = serialiseResponse
} else {
  throw new Error(
    'Environment is not supported. ' +
    'Please raise an issue at https://github.com/sdgluck/serialise-response/issues'
  )
}
