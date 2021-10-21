import Vue from 'vue'

// VueLazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'theme/img/noimg.jpg',
  loading: 'theme/img/loader.gif',
  attempt: 1
})

// PerfectScrollbar
import PerfectScrollbar from 'vue2-perfect-scrollbar'
Vue.use(PerfectScrollbar, {
  swipeEasing: true,
  suppressScrollX: true
})

// Swiper
import { Swiper as SwiperClass, Navigation, Pagination } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Navigation, Pagination])
Vue.use(getAwesomeSwiper(SwiperClass))

export const deepClone = (obj) => {
  const clObj = {}
  for(const i in obj) {
    if(obj[i] instanceof Object) {
      clObj[i] = deepClone(obj[i])
      continue
    }
    clObj[i] = obj[i]
  }
  return clObj
}

export default ({}, inject) => {
  inject('deepClone', deepClone)
}