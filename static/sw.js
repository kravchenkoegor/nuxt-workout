importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/33dee65157248c065df7.js",
    "revision": "ece72330c1b54be00cbf8fe8a3481aa4"
  },
  {
    "url": "/_nuxt/4e61fbd7d4f3f5e88d96.js",
    "revision": "04af2673a03e2dbd40e58cc8a39e9a83"
  },
  {
    "url": "/_nuxt/5649a8a9415843a21739.js",
    "revision": "75c70cf7f3eed1f78903e214361cefcb"
  },
  {
    "url": "/_nuxt/6893312a527a75c1c31e.js",
    "revision": "1825966631d927aa77618a20546caf0d"
  },
  {
    "url": "/_nuxt/6a5dafe334ea48c85478.js",
    "revision": "e170f032cdeb223257e501ce71614f7a"
  },
  {
    "url": "/_nuxt/850272d110d0a816fc56.js",
    "revision": "bb904c914bcb97486b31f4d126be3760"
  },
  {
    "url": "/_nuxt/9ed2ca233770458f4fac.js",
    "revision": "b5de87065dbb9248cacc8f24f5a7d091"
  },
  {
    "url": "/_nuxt/c1b7fd05bc1b51ff29a9.js",
    "revision": "495dc375913cb3f6ad258630983eadc6"
  },
  {
    "url": "/_nuxt/e0aa2829b2443f993208.js",
    "revision": "4cadee285c086d7c08892fe325771fae"
  },
  {
    "url": "/_nuxt/f1098f87cb3af9ecfb55.js",
    "revision": "e0a376a632276353d497e812d3a7f7df"
  },
  {
    "url": "/_nuxt/f895ff776a35dccc45e7.js",
    "revision": "c5704985099ed4121a9a3bbc66124e69"
  },
  {
    "url": "/_nuxt/feb28d88a83508aeef70.js",
    "revision": "81523f1125efd4b737548b71f35ac903"
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





