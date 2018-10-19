module.exports = {
  build: {},
  serverMiddleware: ['~/api/index.js'],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  head: {
    title: 'vue-workout',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' }
    ]
  },
  loading: {
    color: '#30c670',
    // color: '#82b1ff',
    failedColor: '#ff8a80',
    height: '5px'
  },
  manifest: {
    name: 'vue-workout',
    theme_color: '#30c670'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'nuxt-sass-resources-loader'
  ],
  sassResources: [
    '@/assets/scss/_variables.scss'
  ],
  axios: {
    baseURL: '/api'
  }
}
