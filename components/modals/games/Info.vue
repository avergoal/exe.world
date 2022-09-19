<template>
<div class="modalinfo gamemodal info big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div v-if="loaded" class="modalcontent">
    <div class="top">
      <div class="img"><img :src="game.icon.hires" alt=""></div>
      <div class="info">
        <div v-html="game.title" class="title"></div>
        <div class="btns">
          <div class="item"><button @click="goGame()" type="button" class="btn st2">launch game</button></div>
          <div class="item">
            <button @click="shareOpen = !shareOpen" type="button" class="btn st3 toggleshare">share</button>
            <div :class="{open: shareOpen}" class="dropdown">
              <ul class="menu">
                <li><a href=""><div class="ico"><svg-icon name="ui/facebook" /></div><span>Facebook</span></a></li>
                <li><a href=""><div class="ico"><svg-icon name="ui/twitter" /></div><span>Twitter</span></a></li>
                <li><a href=""><div class="ico"><svg-icon name="ui/vk" /></div><span>VK</span></a></li>
              </ul>
            </div>
          </div>
          <div v-if="game.friends" class="friends">
            <div class="label">Friends playing: <span v-html="game.friends.length"></span></div>
            <ul>
              <li v-for="(e, i) in game.friends" :key="i">
                <button @click="$root.$emit('toggleModal', {target: 'userProfile', user: e.uid})" type="button">
                  <img :src="e.avatar_urls.x100" alt="">
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <perfect-scrollbar ref="scroll" class="gameinfo">
      <div v-if="game.media.length" class="screens">
        <div class="boxtitle">Screenshots</div>
        <div class="swiperbox">
          <swiper :options="config" ref="screens">
            <swiper-slide v-for="(e, i) in game.media" :key="i">
              <div @click="index = i" class="img">
                <img :src="e.image">
                <span><svg-icon name="ui/plus" /></span>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swipernav">
            <button class="prev_screen b" type="button"><svg-icon name="ui/swiper_prev"/></button>
            <button class="next_screen b" type="button"><svg-icon name="ui/swiper_next"/></button>
          </div>
        </div>
      </div>
      <div v-html="game.description" class="desc"></div>
    </perfect-scrollbar>
    <div class="bottom-btns">
      <div class="item"><button @click="goGame()" type="button" class="btn st2">launch game</button></div>
      <div class="item">
        <button @click="shareOpen = !shareOpen" type="button" class="btn st3 toggleshare">share</button>
        <div :class="{open: shareOpen}" class="dropdown">
          <ul class="menu">
            <li>
              <a href="">
                <div class="ico">
                  <svg-icon name="ui/facebook" />
                </div>
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ico">
                  <svg-icon name="ui/twitter" />
                </div>
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="">
                <div class="ico">
                  <svg-icon name="ui/vk" />
                </div>
                <span>VK</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <CoolLightBox :items="gallery" :index="index" :effect="'fade'" @close="index = null" />
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
    gallery: [],
    index: null
  }),
  created() {
    if(this.gamesData[this.modal.game]) {
      this.game = this.gamesData[this.modal.game]
      this.game.media.map(e => this.gallery.push(e.image))
      this.loaded = true
    } else {
      this.loadGame(this.modal.game)
    }
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
      await this.$store.dispatch('games/setGamesData', {
        id: this.modal.game
      })

      if(this.gamesData[this.modal.game]) {
        this.game = this.gamesData[this.modal.game]
        this.game.media.map(e => this.gallery.push(e.image))
        this.loaded = true
        let interval = setInterval(() => {
          if(this.$refs.scroll) {
            clearInterval(interval)
            this.$refs.scroll.$el.scrollBy(0, 0)
            this.$refs.scroll.update()
          }
        }, 100)
      }
    },
    goGame() {
      if(localStorage.token) {
        this.$router.push('/g/' + this.game.gid)
        this.$root.$emit('toggleModal', {})
      } else {
        this.$root.$emit('toggleModal', { target: 'logInTemp', game_id: this.game.gid })
      }
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    },
    gamesData() {
      return this.$store.getters['games/gamesData']
    }
  }
}
</script>
