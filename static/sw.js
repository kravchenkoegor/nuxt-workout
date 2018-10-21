importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/08c103dc840c90dc5c4c.js",
    "revision": "407e9ca4064dac0fcbd7963518398c14"
  },
  {
    "url": "/_nuxt/1255ef808e367be8269d.js",
    "revision": "c51892bd73a1fa066507fd5c09b6c11b"
  },
  {
    "url": "/_nuxt/34909dd926b5f19cc1ae.js",
    "revision": "b08fbd3d3865e951e82361bab1e2128b"
  },
  {
    "url": "/_nuxt/62cf85ee347b70f9ca2a.js",
    "revision": "82a4be1166497423c65676da80c70c62"
  },
  {
    "url": "/_nuxt/723ac9ce5d741e24a8fa.js",
    "revision": "bec7966d8cb537790b06fbf455e6d4da"
  },
  {
    "url": "/_nuxt/788008fd297ab59d9c0b.js",
    "revision": "6c00a8a1ffdd921e99646000333c1fc2"
  },
  {
    "url": "/_nuxt/ba150d88da71914da958.js",
    "revision": "2c4d596276088a3d88f2ea1b610faa81"
  },
  {
    "url": "/_nuxt/c0a849777a58472e5f77.js",
    "revision": "235b77b1f0c53df86ad525fa1ce6d445"
  },
  {
    "url": "/_nuxt/c890b2b59bd5e1086787.js",
    "revision": "8fda727ebb3b8a5afd058c34ba038590"
  },
  {
    "url": "/_nuxt/c941c4d992c391e17737.js",
    "revision": "f4009ac706681ed00d8b521b1c49d228"
  },
  {
    "url": "/_nuxt/e0ed947df56d58d40d6f.js",
    "revision": "6532d926aed5562919886f2d3c2ed570"
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





