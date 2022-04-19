const cleanupIDs = require('svgo/plugins/cleanupIDs')
const removeAttrs = require('svgo/plugins/removeAttrs')
const removeDimensions = require('svgo/plugins/removeDimensions')
const removeViewBox = require('svgo/plugins/removeViewBox')
function defaultPlugins () {
  removeAttrs.active = true
  removeAttrs.params.attrs = '*:(fill|stroke|id)'
  removeViewBox.active = false
  removeDimensions.active = true
  return [
    removeDimensions,
    cleanupIDs,
    removeAttrs,
    removeViewBox
  ]
}
export default {
  head: {
    title: 'exeWorld',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/scss/main',
  ],
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/data', mode: 'server' },
    { src: '~/plugins/plugins' },
    { src: '~/plugins/services' },
    { src: '~/plugins/templates' }
  ],
  components: true,
  buildModules: [
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/moment',
    'nuxt-font-loader'
  ],
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true,
    webp: {
      preset: 'default',
      quality: 100
    }
  },
  svgSprite: {
    input: '~/assets/sprite',
    output: '~/static/theme/img',
    svgoConfig () {
      return {
        plugins: defaultPlugins()
      }
    }
  },
  fontLoader: {
    url: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    prefetch: true,
    preconnect: true
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/appApi': {
      target: 'https://api.exe.world/',
      pathRewrite: { '^/appApi': '' }
    }
  },
  pwa: {
    manifest: {
      lang: 'ru'
    }
  },
  build: {
    cssSourceMap: true,
    extractCSS: true
  },
  telemetry: false
}