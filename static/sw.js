importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0618290a4dace1f83797.js",
    "revision": "f3c9bf9c16b1a8b5edcc8ccf560c7e87"
  },
  {
    "url": "/_nuxt/0f1112bcd900b4878573.js",
    "revision": "97bdbf79bf16e5b8f9584857284e6e54"
  },
  {
    "url": "/_nuxt/268634f4caee50423513.js",
    "revision": "251d37585ea6d22a3b9560b148b354a6"
  },
  {
    "url": "/_nuxt/2935d8b2658a85b4a737.js",
    "revision": "9367e72a2195a138ee6bc4211da799f0"
  },
  {
    "url": "/_nuxt/33dee65157248c065df7.js",
    "revision": "ece72330c1b54be00cbf8fe8a3481aa4"
  },
  {
    "url": "/_nuxt/3daa47924ff4a820d268.js",
    "revision": "f271ff82051d10ab1f1137cef5c11f4b"
  },
  {
    "url": "/_nuxt/4e5da29a51cdd4cbe293.js",
    "revision": "421472aa2349ffd1c60c0a538c136400"
  },
  {
    "url": "/_nuxt/9b55edc40abb43d9cf9c.js",
    "revision": "5253e3e7647c9077e1ba83b2e2c49d47"
  },
  {
    "url": "/_nuxt/9d33ff7a528d9fd89d6a.js",
    "revision": "aacb8057f95e8fced7286025498291d5"
  },
  {
    "url": "/_nuxt/d2b8eb93b4f114840043.js",
    "revision": "c4821913b837decefc7b02591e16b797"
  },
  {
    "url": "/_nuxt/d9acdbd1ebfe38de504a.js",
    "revision": "58a16b0307f21b8ecbec2ba7c8e4d2ae"
  },
  {
    "url": "/_nuxt/de98614234946c7dc5d5.js",
    "revision": "48fdec4b777b902f5233ade1b1c5ecf2"
  }
], {
  "cacheId": "workout",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





