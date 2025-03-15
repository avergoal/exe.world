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
      { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'referrer', content: 'no-referrer-when-downgrade' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {src: '//api.exe.world/assets/js/main.js'}
    ]
  },
  css: [
    '@/assets/scss/main',
  ],
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/data', mode: 'server' },
    { src: '~/plugins/i18n' },
    { src: '~/plugins/plugins' },
    { src: '~/plugins/services' },
    { src: '~/plugins/templates' },
    { src: '~/plugins/gtm' },
  ],
  components: true,
  buildModules: [
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/moment',
    'nuxt-font-loader',
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
    '@nuxtjs/pwa',
    ['nuxt-i18n',
     {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
    // ...
  ],
    defaultLocale: 'en',
    vueI18n: {
    fallbackLocale: 'en',
    // Remove the messages section here
  },
  interpolate: {
    prefix: '{',
    suffix: '}',
  },
},],
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '95926948',
        webvisor: true,
        clickmap: true,
        // useCDN: false,
        trackLinks: true,
        accurateTrackBounce: true,
        ecommerce: "dataLayer"
      }
    ]
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/appApi': {
      target: 'https://api.exe.world/',
      pathRewrite: {'^/appApi/': '/'},
    }
  },
  pwa: {
    manifest: {
      lang: 'ru'
    }
  },
  build: {
    cssSourceMap: true,
    extractCSS: true,
    hotMiddleware: {
      client: {
        autoConnect: false,
      },
    },
    indicator: false,
    babel: {
      plugins: [
        ['lodash', { id: 'lodash' }]
      ]
    },
    extend (config, { isDev }) {
      if (!isDev) {
        config.optimization.minimize = true
      }
    },
    uglify: {
      cache: true,
      parallel: true,
      sourceMap: true,
    },
  },
  cache: {
    max: 1000,
    maxAge: 900000,
  },
  render: {
    gzip: {
      threshold: 1024,
    },
  },
  telemetry: false,
  server: {
    port: 3000
  }
}
