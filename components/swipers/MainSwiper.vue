<template>
<div class="main_slider">
  <swiper :options="config" ref="swiper">
    <swiper-slide v-for="(e, i) in slides" :key="i" class="gamecard">
      <div class="box">
        <div class="img"><img :src="e.poster.default" :alt="e.title"></div>
        <div class="info">
          <div class="text">
            <div v-html="e.title" class="title"></div>
            <div v-html="e.description" class="desc"></div>
          </div>
          <!-- <button v-if="!profile" @click="$root.$emit('toggleModal', {target: 'signIn'})" type="button"><svg-icon name="ui/play"/><span>play</span></button> -->
<!--          <nuxt-link v-if="e.installed" :to="'/game/' + e.gid"><svg-icon name="ui/play"/><span>play</span></nuxt-link>-->
<!--          <button v-else @click="$root.$emit('toggleModal', {target: 'gameInfo', game: e.gid})" type="button"><svg-icon name="ui/play"/><span>play</span></button>-->
          <button class="action-to-game" :data-id="e.gid"  :data-installed="e.installed" type="button"><svg-icon name="ui/play"/><span>{{ $t('Button_play') }}</span></button>
        </div>
      </div>
    </swiper-slide>
  </swiper>
  <div class="swipernav">
    <button class="main_prev prev b" type="button"><svg-icon name="ui/swiper_prev"/></button>
    <button class="main_next next b" type="button"><svg-icon name="ui/swiper_next"/></button>
  </div>
  <div class="swiperpager"></div>
</div>
</template>

<script>
export default {
  name: 'MainSwiperComponent',
  props: ['slides'],
  data: () => ({
    swiper: null,
    config: {
      slidesPerView: 'auto',
      centeredSlides: true,
      simulateTouch:false,
      loop: true,
      navigation: {
        prevEl: '.main_prev',
        nextEl: '.main_next'
      },
      pagination: {
        el: '.swiperpager',
        clickable: true
      },
      on: {
        init(e) {
          if(typeof e.slides[e.activeIndex] != 'undefined') {
            e.slides[e.activeIndex].firstChild.classList.add('current_slide')
          }
        },
        update(e) {
          if(typeof e.slides[e.activeIndex] != 'undefined') {
            e.slides[e.activeIndex].firstChild.classList.add('current_slide')
          }
        }
      },
      breakpoints: {
        0: {spaceBetween: 8},
        577: {spaceBetween: 16},
        1025: {spaceBetween: 104}
      }
    }
  }),
  methods:{
    actionToGame(id,installed){
      if(!installed && this.profile && !this.profile?.is_guest){
        this.$root.$emit('toggleModal', {target: 'gameInfo', game: id})
      }else {
        this.$router.push('/game/' + id)
      }
    }
  },
  mounted() {
    this.swiper = this.$refs.swiper?.$swiper
    this.swiper?.on('slideChangeTransitionStart', (e) => {
      e.slides[e.previousIndex].firstChild.classList.add('previous')
      setTimeout(() => {
        e.slides.map(slide => {
          slide.firstChild.classList.remove('previous')
          slide.firstChild.classList.remove('current_slide')
        })
        e.slides[e.activeIndex].firstChild.classList.add('current_slide')
      }, 1)
    })
    document.addEventListener('click', (event) => {
      const clickedElement = event.target.closest('.action-to-game');

      if (clickedElement) {
        const installed = clickedElement.getAttribute('data-installed')
        const id = clickedElement.getAttribute('data-id')
        this.actionToGame(id,installed)
      }
    })
  },
  computed: {
    profile() {
      return this.$store.getters['profile/data']
    }
  }
}
</script>
