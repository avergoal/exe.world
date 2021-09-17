import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'theme/img/noimg.jpg',
  loading: 'theme/img/loader.gif',
  attempt: 1
})
