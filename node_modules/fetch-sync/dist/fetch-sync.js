(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fetchSync"] = factory();
	else
		root["fetchSync"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(11);
	
	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;
	
	var shuffled;
	
	function reset() {
	    shuffled = false;
	}
	
	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }
	
	    if (_alphabet_ === alphabet) {
	        return;
	    }
	
	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }
	
	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });
	
	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }
	
	    alphabet = _alphabet_;
	    reset();
	}
	
	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}
	
	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}
	
	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }
	
	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;
	
	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}
	
	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}
	
	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}
	
	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(8);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global Promise:false, define:false, module:false, self:false, MessageChannel:false */
	
	'use strict'
	
	var shortid = __webpack_require__(1)
	var defer = __webpack_require__(5)
	
	// Proxy references for testing
	try {
	  var _self = self
	  var _MessageChannel = MessageChannel
	} catch (err) {}
	
	// ---
	// API
	// ---
	
	/**
	 * Initialise a client or worker to send and receive messages.
	 * @param {Object} messageHandlers
	 * @param {ServiceWorkerRegistration} worker
	 * @returns {Channel}
	 */
	function msgr (messageHandlers, worker) {
	  return new Channel(messageHandlers, worker)
	}
	
	/**
	 * Initialise a worker to send and receive messages to and from the client.
	 * @param {Object} messageHandlers
	 * @returns {Channel}
	 */
	msgr.worker = function (messageHandlers) {
	  return msgr(messageHandlers, null)
	}
	
	/**
	 * Initialise a client to send and receive messages to and from the worker.
	 * @param {ServiceWorkerRegistration} worker
	 * @param {Object} messageHandlers
	 * @returns {Channel}
	 */
	msgr.client = function (worker, messageHandlers, __mockMessageChannel) {
	  _self = __mockMessageChannel ? {} : self
	  _MessageChannel = __mockMessageChannel || MessageChannel
	  return msgr(messageHandlers, worker)
	}
	
	// Reserved message types
	msgr.types = {
	  CONNECT: '@@MSGR/CONNECT',
	  UNKNOWN: '@@MSGR/UNKNOWN',
	  RESPONSE: '@@MSGR/RESPONSE'
	}
	
	// ---
	// Channel
	// ---
	
	function Channel (handlers, worker) {
	  this.handlers = handlers
	  this.isClient = Boolean(worker)
	  this.isWorker = !this.isClient
	
	  // Is the comms channel open?
	  this.open = defer()
	
	  // Handlers for unknown message types
	  this.receiveHandlers = []
	
	  // Deferreds for sent messages so we can resolve
	  // the promise if they receive a response
	  this.promises = {}
	
	  if (this.isClient) {
	    this.open.resolve()
	    this.recipient = worker
	    this.messageChannel = new _MessageChannel()
	    this.messageChannel.port1.onmessage = this._handleMessage.bind(this)
	    this.send(msgr.types.CONNECT)
	  } else {
	    _self.onmessage = this._handleMessage.bind(this)
	  }
	}
	
	/**
	 * Handle a message received from the client or worker.
	 * @param {Object} event
	 * @private
	 */
	Channel.prototype._handleMessage = function (event) {
	  try {
	    var request = JSON.parse(event.data)
	    var id = request.id
	    var type = request.type
	    if (!id || !type) throw new Error()
	  } catch (err) {
	    throw new Error('msgr: malformed message')
	  }
	
	  var responder = function (data) {
	    this.send(msgr.types.RESPONSE, data, id)
	  }.bind(this)
	
	  if (this.isWorker && request.data === msgr.types.CONNECT) {
	    // Special init message type that gives us the port
	    // that we will be sending messages to the client over
	    this.recipient = event.ports[0]
	    this.open.resolve()
	  }
	
	  if (request.type === msgr.types.UNKNOWN && request.data in this.handlers) {
	    // Known message type without data, invoke registered handler
	    this.handlers[request.data](null, responder)
	  } else if (request.type in this.handlers) {
	    // Known message type with data, invoke registered handler
	    this.handlers[request.type](request.data, responder)
	  } else if (id && id in this.promises) {
	    // Response to a message, invoke registered response handler
	    var promise = this.promises[id]
	    promise.resolve(request.data)
	    this.promises[id] = null
	  } else {
	    // Unknown message type, invoke receive handlers
	    this.receiveHandlers.forEach(function (handler) {
	      handler(request.data, responder)
	    })
	  }
	}
	
	Channel.prototype.ready = function (fn) {
	  this.open.promise.then(fn)
	}
	
	/**
	 * Receive an "unknown" message that does not have a predefined handler.
	 * @param {Function} handler
	 */
	Channel.prototype.receive = function (handler) {
	  if (typeof handler !== 'function') {
	    throw new Error('msgr: expecting handler to be a function')
	  }
	  this.receiveHandlers.push(handler)
	}
	
	/**
	 * Send a message.
	 * @param {String|*} type The message type or message data
	 * @param {*} [data] The message data
	 * @returns {Object}
	 */
	Channel.prototype.send = function (type, data, _id) {
	  var id = _id || shortid.generate()
	
	  if (!data) {
	    data = type
	    if (type !== msgr.types.RESPONSE) {
	      type = msgr.types.UNKNOWN
	    }
	  }
	
	  var deferred = defer()
	
	  var payload = JSON.stringify({
	    __msgr: true,
	    id: id,
	    type: type,
	    data: data
	  })
	
	  var args = [payload]
	
	  if (this.isClient && data === msgr.types.CONNECT) {
	    args.push([this.messageChannel.port2])
	  }
	
	  this.open.promise.then(function () {
	    this.recipient.postMessage.apply(this.recipient, args)
	  }.bind(this))
	
	  this.promises[id] = deferred
	
	  return deferred.promise
	}
	
	// ---
	// Export
	// ---
	
	var api = {
	  client: msgr.client,
	  worker: msgr.worker,
	  types: msgr.types
	}
	
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return api }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	} else if (typeof module === 'object' && module.exports) {
	  module.exports = api
	} else {
	  self.msgr = api
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.serialiseRequest=t():e.serialiseRequest=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){function r(e){return s.blobToArrayBuffer(e).then(function(e){return String.fromCharCode.apply(null,new Uint16Array(e))})}function o(e,t){return s.base64StringToBlob(e).then(function(e){switch(t){case c.ARRAY_BUFFER:return s.blobToArrayBuffer(e);case c.BLOB:return e;case c.FORM_DATA:throw new Error("Cannot make FormData from serialised Request");case c.JSON:return r(e).then(function(e){return JSON.parse(e)});case c.TEXT:return r(e);default:throw new Error('Unknown requested body type "'+t+'"')}})}function i(e,t){if(!(e instanceof Request))throw new Error("Expecting request to be instance of Request");for(var n=[],r=e.headers.keys(),o=0;o<r.length;o++){var i=r[o];n[i]=e.headers.get(i)}var u={method:e.method,url:e.url,headers:n,context:e.context,referrer:e.referrer,mode:e.mode,credentials:e.credentials,redirect:e.redirect,integrity:e.integrity,cache:e.cache,bodyUsed:e.bodyUsed};return e.blob().then(s.blobToBase64String).then(function(e){return u.__body=e,t?u:JSON.stringify(u)})}function u(e){var t,n;if("string"==typeof e)t=JSON.parse(e),n=t.url;else{if("object"!=typeof e)throw new Error("Expecting serialised request to be a string or object");t=e,n=t.url}const r=new Request(n,t),i={context:{enumerable:!0,value:t.context}},u=Object.keys(c).reduce(function(e,n){const i=f[n];return e[i]={enumerable:!0,value:function(){return r.bodyUsed?Promise.reject(new TypeError("Already used")):(r.bodyUsed=!0,Promise.resolve(o(t.__body,n)))}},e},i);return Object.defineProperties(r,u),r}var a,a,s=n(1),c={ARRAY_BUFFER:"ARRAY_BUFFER",BLOB:"BLOB",FORM_DATA:"FORM_DATA",JSON:"JSON",TEXT:"TEXT"},f={ARRAY_BUFFER:"arrayBuffer",BLOB:"blob",FORM_DATA:"formData",JSON:"json",TEXT:"text"};i.deserialise=u,i.deserialize=u,a=function(){return i}.call(t,n,t,e),!(void 0!==a&&(e.exports=a)),a=function(){return i}.call(t,n,t,e),!(void 0!==a&&(e.exports=a))},function(e,t,n){"use strict";function r(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=-1;++o<t;)r[o]=e.charCodeAt(o);return n}function o(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=-1;++o<r;)t+=String.fromCharCode(n[o]);return t}function i(e,t){return new R(function(n,r){var o=new Image;t&&(o.crossOrigin=t),o.onload=function(){n(o)},o.onerror=r,o.src=e})}function u(e){var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var n=t.getContext("2d");return n.drawImage(e,0,0,e.width,e.height,0,0,e.width,e.height),t}function a(e,t){return t=t||{},"string"==typeof t&&(t={type:t}),new g(e,t)}function s(e){return(window.URL||window.webkitURL).createObjectURL(e)}function c(e){return(window.URL||window.webkitURL).revokeObjectURL(e)}function f(e){return new R(function(t,n){var r=new FileReader,i="function"==typeof r.readAsBinaryString;r.onloadend=function(e){var n=e.target.result||"";return i?t(n):void t(o(n))},r.onerror=n,i?r.readAsBinaryString(e):r.readAsArrayBuffer(e)})}function l(e,t){return R.resolve().then(function(){var n=[r(atob(e))];return t?a(n,{type:t}):a(n)})}function d(e,t){return R.resolve().then(function(){return l(btoa(e),t)})}function h(e){return f(e).then(function(e){return btoa(e)})}function p(e){return R.resolve().then(function(){var t=e.match(/data:([^;]+)/)[1],n=e.replace(/^[^,]+,/,""),o=r(atob(n));return a([o],{type:t})})}function v(e,t,n,r){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return e.toDataURL(t,r)})}function y(e,t,n){return R.resolve().then(function(){return"function"==typeof e.toBlob?new R(function(r){e.toBlob(r,t,n)}):p(e.toDataURL(t,n))})}function b(e,t,n,r){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return y(e,t,r)})}function w(e,t){return R.resolve().then(function(){return a([e],t)})}function m(e){return new R(function(t,n){var r=new FileReader;r.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0);t(n)},r.onerror=n,r.readAsArrayBuffer(e)})}var g=n(2),R=n(3);e.exports={createBlob:a,createObjectURL:s,revokeObjectURL:c,imgSrcToBlob:b,imgSrcToDataURL:v,canvasToBlob:y,dataURLToBlob:p,blobToBase64String:h,base64StringToBlob:l,binaryStringToBlob:d,blobToBinaryString:f,arrayBufferToBlob:w,blobToArrayBuffer:m}},function(e,t){(function(t){function n(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.buffer instanceof ArrayBuffer){var r=n.buffer;if(n.byteLength!==r.byteLength){var o=new Uint8Array(n.byteLength);o.set(new Uint8Array(r,n.byteOffset,n.byteLength)),r=o.buffer}e[t]=r}}}function r(e,t){t=t||{};var r=new i;n(e);for(var o=0;o<e.length;o++)r.append(e[o]);return t.type?r.getBlob(t.type):r.getBlob()}function o(e,t){return n(e),new Blob(e,t||{})}var i=t.BlobBuilder||t.WebKitBlobBuilder||t.MSBlobBuilder||t.MozBlobBuilder,u=function(){try{var e=new Blob(["hi"]);return 2===e.size}catch(t){return!1}}(),a=u&&function(){try{var e=new Blob([new Uint8Array([1,2])]);return 2===e.size}catch(t){return!1}}(),s=i&&i.prototype.append&&i.prototype.getBlob;e.exports=function(){return u?a?t.Blob:o:s?r:void 0}()}).call(t,function(){return this}())},function(e,t,n){(function(t){"function"==typeof t.Promise?e.exports=t.Promise:e.exports=n(4)}).call(t,function(){return this}())},function(e,t,n){var r,r;!function(t){e.exports=t()}(function(){return function e(t,n,o){function i(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof r&&r;if(!s&&c)return r(a,!0);if(u)return u(a,!0);throw new Error("Cannot find module '"+a+"'")}var f=n[a]={exports:{}};t[a][0].call(f.exports,function(e){var n=t[a][1][e];return i(n?n:e)},f,f.exports,e,t,n,o)}return n[a].exports}for(var u="function"==typeof r&&r,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,n){"use strict";function r(){}t.exports=r},{}],2:[function(e,t,n){"use strict";var r=e("./promise"),o=e("./reject"),i=e("./resolve"),u=e("./INTERNAL"),a=e("./handlers"),s=o(new TypeError("must be an array"));t.exports=function(e){function t(e,t){function r(e){c[t]=e,++f===n&!o&&(o=!0,a.resolve(d,c))}i(e).then(r,function(e){o||(o=!0,a.reject(d,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return s;var n=e.length,o=!1;if(!n)return i([]);for(var c=new Array(n),f=0,l=-1,d=new r(u);++l<n;)t(e[l],l);return d}},{"./INTERNAL":1,"./handlers":3,"./promise":5,"./reject":7,"./resolve":8}],3:[function(e,t,n){"use strict";function r(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}var o=e("./tryCatch"),i=e("./resolveThenable"),u=e("./states");n.resolve=function(e,t){var a=o(r,t);if("error"===a.status)return n.reject(e,a.value);var s=a.value;if(s)i.safely(e,s);else{e.state=u.FULFILLED,e.outcome=t;for(var c=-1,f=e.queue.length;++c<f;)e.queue[c].callFulfilled(t)}return e},n.reject=function(e,t){e.state=u.REJECTED,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e}},{"./resolveThenable":9,"./states":10,"./tryCatch":11}],4:[function(e,t,n){t.exports=n=e("./promise"),n.resolve=e("./resolve"),n.reject=e("./reject"),n.all=e("./all")},{"./all":2,"./promise":5,"./reject":7,"./resolve":8}],5:[function(e,t,n){"use strict";function r(e){if(!(this instanceof r))return new r(e);if("function"!=typeof e)throw new TypeError("reslover must be a function");this.state=a.PENDING,this.queue=[],this.outcome=void 0,e!==i&&u.safely(this,e)}var o=e("./unwrap"),i=e("./INTERNAL"),u=e("./resolveThenable"),a=e("./states"),s=e("./queueItem");t.exports=r,r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a.FULFILLED||"function"!=typeof t&&this.state===a.REJECTED)return this;var n=new r(i);if(this.state!==a.PENDING){var u=this.state===a.FULFILLED?e:t;o(n,u,this.outcome)}else this.queue.push(new s(n,e,t));return n}},{"./INTERNAL":1,"./queueItem":6,"./resolveThenable":9,"./states":10,"./unwrap":12}],6:[function(e,t,n){"use strict";function r(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}var o=e("./handlers"),i=e("./unwrap");t.exports=r,r.prototype.callFulfilled=function(e){o.resolve(this.promise,e)},r.prototype.otherCallFulfilled=function(e){i(this.promise,this.onFulfilled,e)},r.prototype.callRejected=function(e){o.reject(this.promise,e)},r.prototype.otherCallRejected=function(e){i(this.promise,this.onRejected,e)}},{"./handlers":3,"./unwrap":12}],7:[function(e,t,n){"use strict";function r(e){var t=new o(i);return u.reject(t,e)}var o=e("./promise"),i=e("./INTERNAL"),u=e("./handlers");t.exports=r},{"./INTERNAL":1,"./handlers":3,"./promise":5}],8:[function(e,t,n){"use strict";function r(e){if(e)return e instanceof o?e:u.resolve(new o(i),e);var t=typeof e;switch(t){case"boolean":return a;case"undefined":return c;case"object":return s;case"number":return f;case"string":return l}}var o=e("./promise"),i=e("./INTERNAL"),u=e("./handlers");t.exports=r;var a=u.resolve(new o(i),!1),s=u.resolve(new o(i),null),c=u.resolve(new o(i),void 0),f=u.resolve(new o(i),0),l=u.resolve(new o(i),"")},{"./INTERNAL":1,"./handlers":3,"./promise":5}],9:[function(e,t,n){"use strict";function r(e,t){function n(t){a||(a=!0,o.reject(e,t))}function r(t){a||(a=!0,o.resolve(e,t))}function u(){t(r,n)}var a=!1,s=i(u);"error"===s.status&&n(s.value)}var o=e("./handlers"),i=e("./tryCatch");n.safely=r},{"./handlers":3,"./tryCatch":11}],10:[function(e,t,n){n.REJECTED=["REJECTED"],n.FULFILLED=["FULFILLED"],n.PENDING=["PENDING"]},{}],11:[function(e,t,n){"use strict";function r(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}t.exports=r},{}],12:[function(e,t,n){"use strict";function r(e,t,n){o(function(){var r;try{r=t(n)}catch(o){return i.reject(e,o)}r===e?i.reject(e,new TypeError("Cannot resolve promise with itself")):i.resolve(e,r)})}var o=e("immediate"),i=e("./handlers");t.exports=r},{"./handlers":3,immediate:13}],13:[function(e,t,n){"use strict";function r(){i=!0;for(var e,t,n=s.length;n;){for(t=s,s=[],e=-1;++e<n;)t[e]();n=s.length}i=!1}function o(e){1!==s.push(e)||i||u()}for(var i,u,a=[e("./nextTick"),e("./messageChannel"),e("./stateChange"),e("./timeout")],s=[],c=-1,f=a.length;++c<f;)if(a[c].test()){u=a[c].install(r);break}t.exports=o},{"./messageChannel":14,"./nextTick":15,"./stateChange":16,"./timeout":17}],14:[function(e,t,n){(function(e){"use strict";n.test=function(){return e.setImmediate?!1:"undefined"!=typeof e.MessageChannel},n.install=function(t){var n=new e.MessageChannel;return n.port1.onmessage=t,function(){n.port2.postMessage(0)}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,n){(function(e){"use strict";var t=e.MutationObserver||e.WebKitMutationObserver;n.test=function(){return t},n.install=function(n){var r=0,o=new t(n),i=e.document.createTextNode("");return o.observe(i,{characterData:!0}),function(){i.data=r=++r%2}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],16:[function(e,t,n){(function(e){"use strict";n.test=function(){return"document"in e&&"onreadystatechange"in e.document.createElement("script")},n.install=function(t){return function(){var n=e.document.createElement("script");return n.onreadystatechange=function(){t(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n),t}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(e,t,n){"use strict";n.test=function(){return!0},n.install=function(e){return function(){setTimeout(e,0)}}},{}]},{},[4])(4)})}])});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;'use strict'
	
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
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return serialiseResponse
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return serialiseResponse
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict'
	
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
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return defer
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(0);
	
	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}
	
	module.exports = decode;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(10);
	
	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;
	
	    var str = '';
	
	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}
	
	module.exports = encode;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(0);
	var encode = __webpack_require__(7);
	var decode = __webpack_require__(6);
	var isValid = __webpack_require__(9);
	
	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;
	
	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;
	
	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(12) || 0;
	
	// Counter is used when shortid is called multiple times in one second.
	var counter;
	
	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;
	
	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {
	
	    var str = '';
	
	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);
	
	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }
	
	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);
	
	    return str;
	}
	
	
	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}
	
	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}
	
	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }
	
	    return alphabet.shuffled();
	}
	
	
	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(0);
	
	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }
	
	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}
	
	module.exports = isShortId;


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto
	
	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}
	
	module.exports = randomByte;


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
	
	var seed = 1;
	
	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}
	
	function setSeed(_seed_) {
	    seed = _seed_;
	}
	
	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	'use strict'
	
	/* global Promise:false */
	
	/**
	 * Create a deferred.
	 * @returns {Object}
	 */
	module.exports = function defer () {
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


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global Promise:false, define:false, module:false, self:false */
	
	'use strict'
	
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return register }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	} else if (typeof module === 'object' && module.exports) {
	  module.exports = register
	} else {
	  self.swRegister = register
	}
	
	function register (options, __mockSelf) {
	  var _self = __mockSelf || self
	  var navigator = _self.navigator
	
	  if (!('serviceWorker' in navigator)) {
	    return Promise.reject(new Error('Service Workers unsupported'))
	  }
	
	  var serviceWorker = navigator.serviceWorker.controller
	
	  return Promise.resolve()
	    .then(function () {
	      // Get existing service worker or get registration promise
	      if (serviceWorker) return serviceWorker
	      else if (!options) return navigator.serviceWorker.ready
	    })
	    .then(function (registration) {
	      if (registration) {
	        // Take this service worker that the registration returned
	        serviceWorker = registration
	      } else if (!registration && options) {
	        // No registration but we have options to register one
	        return navigator.serviceWorker
	            .register(options.url, options)
	            .then(function (registration) {
	              options.forceUpdate && registration.update()
	            })
	      } else if (!registration && !options) {
	        // No existing worker,
	        // no registration that returned one,
	        // no options to register one
	        throw new Error(
	          'no active service worker or configuration passed to install one'
	        )
	      }
	    })
	    .then(function () {
	      return serviceWorker
	    })
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* global require:false, fetch:false, Request:false */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var msgr = __webpack_require__(2);
	var shortid = __webpack_require__(1);
	var defer = __webpack_require__(14);
	var register = __webpack_require__(15);
	var serialiseRequest = __webpack_require__(3);
	var serialiseResponse = __webpack_require__(4);
	
	var ready = defer();
	
	var syncs = [];
	var channel = null;
	var hasStartedInit = false;
	var hasBackgroundSyncSupport = true;
	
	var syncUtil = {
	  _base: {
	    id: null,
	    name: null,
	    createdOn: null,
	    syncedOn: null,
	    request: null,
	    response: null,
	    cancelled: false
	  },
	
	  _create: function _create() {
	    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    return _extends({}, syncUtil._base, obj, defer());
	  },
	  createFromUserOptions: function createFromUserOptions(obj) {
	    return syncUtil._create({
	      id: obj.name || shortid.generate(),
	      name: obj.name,
	      createdOn: Date.now(),
	      request: obj.request
	    });
	  },
	  hydrate: function hydrate(obj) {
	    var sync = syncUtil._create(obj);
	    if (sync.response) {
	      sync.response = serialiseResponse.deserialise(sync.response);
	      sync.resolve();
	    }
	    return sync;
	  },
	  makePublicApi: function makePublicApi(sync) {
	    return Object.assign(sync.promise, {
	      name: sync.name,
	      id: sync.id,
	      createdOn: sync.createdOn,
	      syncedOn: sync.syncedOn,
	      cancel: function cancel() {
	        return !sync.cancelled && !sync.response ? (sync.cancelled = true, channel.send('CANCEL_SYNC', sync.id)) : Promise.reject(new Error('already cancelled or complete'));
	      }
	    });
	  }
	};
	
	/**
	 * Start a channel with the worker. Wrapped so we can delay
	 * execution until we know we have an activated worker.
	 * @param {Object} worker
	 * @returns {Object}
	 */
	var openCommsChannel = function openCommsChannel(worker) {
	  return msgr.client(worker, {
	    SYNC_RESULT: function SYNC_RESULT(_ref) {
	      var id = _ref.id;
	      var syncedOn = _ref.syncedOn;
	      var response = _ref.response;
	
	      var sync = syncs.find(function (s) {
	        return s.id === id;
	      });
	      if (sync) {
	        var realResponse = serialiseResponse.deserialise(response);
	        sync.resolve(realResponse);
	        if (sync.name) {
	          sync.response = realResponse;
	          sync.syncedOn = syncedOn;
	        }
	      }
	    }
	  });
	};
	
	// ---
	// Public
	// ---
	
	/**
	 * Create a 'sync' operation.
	 * @param {String|Request} [name]
	 * @param {Object|String|Request} request
	 * @param {Object} [options]
	 * @returns {Promise}
	 */
	var _fetchSync = function fetchSync(name, request, options) {
	  var _arguments = arguments;
	
	  if (!hasStartedInit) {
	    throw new Error('initialise first with fetchSync.init()');
	  }
	
	  var isRequestOptionsCall = function isRequestOptionsCall() {
	    return _arguments.length === 2 && (typeof _arguments[0] === 'string' || _arguments[0] instanceof Request) && _typeof(_arguments[1]) === 'object' && !(_arguments[1] instanceof Request);
	  };
	
	  if (arguments.length === 1) {
	    request = name;
	    name = null;
	  } else if (isRequestOptionsCall()) {
	    options = request;
	    request = name;
	    name = null;
	  }
	
	  if (typeof request !== 'string' && !(request instanceof Request)) {
	    throw new Error('expecting request to be a string or Request');
	  } else if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
	    throw new Error('expecting options to be an object');
	  }
	
	  if (!hasBackgroundSyncSupport) {
	    return fetch(request, options);
	  }
	
	  var sync = syncs.find(function (s) {
	    return s.id === name;
	  });
	
	  if (sync) {
	    var err = new Error('sync operation already exists with name \'' + name + '\'');
	    return Promise.reject(err);
	  }
	
	  sync = syncUtil.createFromUserOptions({ name: name, request: request, options: options });
	
	  syncs.push(sync);
	
	  ready.promise.then(function () {
	    return serialiseRequest(new Request(request, options));
	  }).then(function (request) {
	    sync.request = request;
	  }).then(function () {
	    return channel.send('REGISTER_SYNC', sync);
	  });
	
	  return syncUtil.makePublicApi(sync);
	};
	
	exports.default = _fetchSync;
	
	/**
	 * Initialise fetchSync.
	 * @param {Object} options
	 * @returns {Promise}
	*/
	
	_fetchSync.init = function fetchSync_init() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	  if (hasStartedInit) {
	    throw new Error('fetchSync.init() called multiple times');
	  }
	
	  hasStartedInit = true;
	
	  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
	    hasBackgroundSyncSupport = false;
	    return Promise.reject(new Error('environment not supported'));
	  }
	
	  return register(options).then(openCommsChannel).then(function (c) {
	    channel = c;
	  }).then(function () {
	    return channel.send('GET_SYNCS');
	  }).then(function (data) {
	    var _syncs;
	
	    return (_syncs = syncs).push.apply(_syncs, _toConsumableArray((data || []).map(syncUtil.hydrate)));
	  }).then(function () {
	    ready.resolve();
	  });
	};
	
	/**
	 * Get a sync.
	 * @param {String} name
	 * @returns {Promise}
	 */
	_fetchSync.get = waitForReady(function fetchSync_get(name) {
	  var sync = syncs.find(function (s) {
	    return s.name === name;
	  });
	  return sync ? syncUtil.makePublicApi(sync) : Promise.reject(new Error('not found'));
	});
	
	/**
	 * Get all syncs.
	 * @returns {Array}
	 */
	_fetchSync.getAll = waitForReady(function fetchSync_getAll() {
	  return syncs.map(syncUtil.makePublicApi);
	});
	
	/**
	 * Cancel a sync.
	 * @param {Object|String} sync
	 * @returns {Promise}
	 */
	_fetchSync.cancel = waitForReady(function fetchSync_cancel(name) {
	  var sync = syncs.find(function (s) {
	    return s.name === name;
	  });
	  return sync ? syncUtil.makePublicApi(sync).cancel() : Promise.reject(new Error('not found'));
	});
	
	/**
	 * Cancel all syncs.
	 * @returns {Promise}
	 */
	_fetchSync.cancelAll = waitForReady(function fetchSync_cancelAll() {
	  return channel.send('CANCEL_ALL_SYNCS').then(function () {
	    syncs = [];
	  });
	});
	
	/**
	 * Wrap a function to wait for the application to be initialised
	 * (comms channel with service worker is open) before executing.
	 * @param {Function} method
	 * @returns {Function}
	 */
	function waitForReady(method) {
	  return function fetchSync_readyWrapper() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (hasStartedInit) return ready.promise.then(function () {
	      return method.apply(undefined, args);
	    });
	    throw new Error('initialise first with fetchSync.init()');
	  };
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fetch-sync.js.map