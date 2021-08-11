<template>
<div class="category_slider">
  <div class="boxtitle">
    <span v-html="title"></span>
    <button v-if="target" @click="setRoute(target)" type="button"><svg-icon name="ui/more"/></button>
  </div>
  <Filters v-if="filters" :filters="filters"/>
  <div v-if="config" class="swiperbox">
    <swiper :options="config" ref="newSwiper">
      <swiper-slide v-for="(e, i) in slides" :key="i" :class="(slideClass ? slideClass : 'b')" class="gamecard">
        <div class="box">
          <div class="img">
            <img :src="e.img" :alt="e.title">
            <nuxt-link :to="e.link"><svg-icon name="ui/play"/><span>play</span></nuxt-link>
          </div>
          <div class="info">
            <div v-html="e.title" class="title"></div>
            <div v-html="e.desc" class="desc"></div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div :class="navClass" class="swipernav">
      <button :class="'prev_'+_uid" class="prev b" type="button"><svg-icon name="ui/swiper_prev"/></button>
      <button :class="'next_'+_uid" class="next b" type="button"><svg-icon name="ui/swiper_next"/></button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GamesSwiperTemplate',
  props: ['slides', 'between', 'filters', 'title', 'target', 'slideClass', 'navClass'],
  data() {
    return{
      config: null
    }
  },
  mounted() {
    this.config = {
      slidesPerView: 'auto',
      navigation: {
        prevEl: '.prev_'+this._uid,
        nextEl: '.next_'+this._uid
      },
      breakpoints: {
        0: {
          spaceBetween: 8
        },
        577: {
          spaceBetween: 16
        },
        1025: {
          spaceBetween: Number(this.between)
        }
      }
    }
  },
  methods: {
    setRoute(target) {
      this.$root.$emit('changeMainPageTemplate', target)
      this.$root.$emit('changeProfileModals', target)
    }
  }
}
</script>
