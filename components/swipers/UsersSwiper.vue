<template>
<div class="users_slider">
  <div class="boxtitle">
    <span v-html="title"></span>
    <button v-if="target" @click="setRoute(target)" type="button"><svg-icon name="ui/more"/></button>
  </div>
  <div v-if="config" class="swiperbox">
    <swiper :options="config" ref="newSwiper">
      <swiper-slide v-for="(e, i) in slides" :key="i">
        <button type="button">
          <div class="userphoto"><img :src="e.img" :alt="e.name"></div>
          <div class="name" v-html="e.name"></div>
        </button>
      </swiper-slide>
    </swiper>
    <div class="swipernav">
      <button :class="'prev_'+_uid" class="prev b" type="button"><svg-icon name="ui/swiper_prev"/></button>
      <button :class="'next_'+_uid" class="next b" type="button"><svg-icon name="ui/swiper_next"/></button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UsersSwiperTemplate',
  props: ['slides', 'between', 'title', 'target'],
  data() {
    return{
      config: null
    }
  },
  mounted() {
    this.config = {
      slidesPerView: 'auto',
      spaceBetween: Number(this.between),
      navigation: {
        prevEl: '.prev_'+this._uid,
        nextEl: '.next_'+this._uid
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
