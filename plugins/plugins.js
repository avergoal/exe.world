import Vue from 'vue'

// VueLazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'theme/img/noimg.jpg',
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
