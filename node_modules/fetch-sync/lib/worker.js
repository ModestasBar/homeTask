'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  /* global self:false, require:false, fetch:false */

  'use strict';

  var msgr = require('msgr');
  var IDBStore = require('idb-wrapper');
  var serialiseRequest = require('serialise-request');
  var serialiseResponse = require('serialise-response');

  var store = new IDBStore({
    dbVersion: 1,
    keyPath: 'id',
    storePrefix: 'fetchSyncs/',
    storeName: 'syncs'
  });

  var channel = msgr.worker({
    // On get syncs, respond with all operations in the store
    GET_SYNCS: function GET_SYNCS(_, respond) {
      var _pify;

      (_pify = pify(store.getAll)()).then.apply(_pify, _toConsumableArray(responders(respond)));
    },
    // On register, register a sync with worker and then add to store
    REGISTER_SYNC: function REGISTER_SYNC(sync, respond) {
      var _registerSync$then;

      (_registerSync$then = registerSync(sync).then(function () {
        return addSync(sync);
      })).then.apply(_registerSync$then, _toConsumableArray(responders(respond)));
    },
    // On cancel, remove the sync from store
    CANCEL_SYNC: function CANCEL_SYNC(id, respond) {
      var _pify2;

      (_pify2 = pify(store.remove)(id)).then.apply(_pify2, _toConsumableArray(responders(respond)));
    },
    // On cancel all, remove all syncs from store
    CANCEL_ALL_SYNCS: function CANCEL_ALL_SYNCS(_, respond) {
      var _pify$then$then;

      (_pify$then$then = pify(store.getAll)().then(function (syncs) {
        return syncs.map(function (sync) {
          return sync.id;
        });
      }).then(function (ids) {
        return pify(store.removeBatch)(ids);
      })).then.apply(_pify$then$then, _toConsumableArray(responders(respond)));
    }
  });

  function pify(method) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new Promise(method.bind.apply(method, [store].concat(args)));
    };
  }

  function responders(respond) {
    return [respond, function (e) {
      return respond({ error: e.message });
    }];
  }

  function registerSync(sync) {
    return self.registration['sync'].register(sync.id);
  }

  function addSync(sync) {
    return pify(store.put)(sync).then(null, function (err) {
      if (!/key already exists/.test(err.message)) {
        throw err;
      }
    });
  }

  function syncEvent(event) {
    event.waitUntil(pify(store.get)(event.tag).then(function (sync) {
      if (!sync) {
        event.registration && event.registration.unregister();
        store.remove(event.tag);
        return;
      }

      var id = sync.id;
      var syncedOn = Date.now();

      return fetch(serialiseRequest.deserialise(sync.request)).then(serialiseResponse).then(function (response) {
        var updatedSync = _extends({}, sync, { response: response, syncedOn: syncedOn });
        channel.send('SYNC_RESULT', { id: id, syncedOn: syncedOn, response: response });
        if (!updatedSync.name) store.remove(id);else store.put(updatedSync);
      });
    }));
  }

  // The 'sync' event fires when connectivity is
  // restored or already available to the UA.
  self.addEventListener('sync', syncEvent);

  // The 'activate' event is fired when the service worker becomes operational.
  // For example, after a refresh after install, or after all pages using
  // the older version of the worker have closed after upgrade of the worker.
  self.addEventListener('activate', function (event) {
    return event.waitUntil(self.clients.claim());
  });

  // The 'install' event is fired when the service worker has been installed.
  // This does not mean that the service worker is operating, as the UA will wait
  // for all pages to close that are using older versions of the worker.
  self.addEventListener('install', function (event) {
    return event.waitUntil(self.skipWaiting());
  });
})();