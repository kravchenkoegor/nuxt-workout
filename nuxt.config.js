module.exports = {
  build: {},
  serverMiddleware: ['~/api/index.js'],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  head: {
    title: 'Nuxt.js Workout',
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
    color: '#D4B483',
    failedColor: '#ED1C24',
    height: '5px'
  },
  manifest: {
    name: 'nuxt-workout',
    theme_color: '#125E8A'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'nuxt-sass-resources-loader'
  ],
  vuetify: {
    iconfont: 'fa',
    theme: {
      primary: '#125E8A',
      secondary: '#48A9A6',
      accent: '#D4B483',
      error: '#ED1C24'
    }
  },
  plugins: [
    {src: '~/plugins/moment.js', ssr: false}
  ],
  sassResources: ['@/assets/scss/_variables.scss'],
  axios: {
    baseURL: '/api'
  }
}
