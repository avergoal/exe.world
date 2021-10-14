<template>
<div class="modalinfo gamemodal info big">
  <button @click="closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div v-if="loaded" class="modalcontent">
    <div class="top">
      <div class="img"><img :src="game.poster.default" alt=""></div>
      <div class="info">
        <div v-html="game.title" class="title">Knight Wars</div>
        <div class="btns">
          <div class="item"><button @click="goGame()" type="button" class="btn st2">launch game</button></div>
          <div class="item">
            <button @click="shareOpen = !shareOpen" type="button" class="btn st3 toggleshare">share</button>
            <div :class="{open: shareOpen}" class="dropdown">
              <ul class="menu">
                <li>
                  <a href="">
                    <div class="ico"><svg-icon name="ui/facebook" /></div>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div class="ico"><svg-icon name="ui/twitter" /></div>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div class="ico"><svg-icon name="ui/vk" /></div>
                    <span>VK</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="screens">
      <div class="boxtitle">Screenshots</div>
      <div v-if="game.media.length" class="swiperbox">
        <swiper :options="config" ref="newSwiper">
          <swiper-slide v-for="(e, i) in game.screenList" :key="i">
            <div @click="index = i" class="img">
              <img :src="e">
              <span><svg-icon name="ui/plus" /></span>
            </div>
          </swiper-slide>
        </swiper>
        <!--div class="swipernav">
          <button class="prev_screen b" type="button"><svg-icon name="ui/swiper_prev"/></button>
          <button class="next_screen b" type="button"><svg-icon name="ui/swiper_next"/></button>
        </div-->
      </div>
    </div>
    <div v-html="game.description" class="desc"></div>
  </div>
  <!--CoolLightBox :items="game.screenList" :index="index" :effect="'fade'" @close="index = null" /-->
</div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
	name: 'GameInfoModalComponent',
  components: {CoolLightBox},
  data: () => ({
    loaded: false,
    game: {},
    config: {
      slidesPerView: 'auto',
      spaceBetween: 24,
      navigation: {
        prevEl: '.prev_screen',
        nextEl: '.next_screen'
      }
    },
    shareOpen: false,
    index: null
  }),
  created() {
    if(this.gamesData[this.gameId]) {
      this.game = this.gamesData[this.gameId]
      this.loaded = true
    } else {
      this.loadGame(this.gameId)
    }
    console.log(this.game)
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.dropdown') && !e.target.closest('.toggleshare')) {
        this.shareOpen = false
      }
    })
  },
  methods: {
    async loadGame() {
      let formData = new FormData()
      formData.append('api_token', this.token)
      formData.append('id', this.gameId)
      await this.$store.dispatch('games/setGamesData', formData)
      if(this.gamesData[this.gameId]) {
        this.game = this.gamesData[this.gameId]
        this.loaded = true
      }
      console.log(this.game)
    },
    goGame() {
      this.$router.push('/g/' + this.game.gid)
      this.closeModal()
    },
    closeModal() {
      this.$root.$emit('modalOpen', {
        open: false,
        target: null,
        message: null,
        status: null,
        tab: null
      })
    }
  },
  computed: {
    gameId() {
      return this.$store.getters['modals/tab']
    },
    gamesData() {
      return this.$store.getters['games/gamesData']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
