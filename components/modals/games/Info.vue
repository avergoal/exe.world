<template>
  <div class="modalinfo gamemodal info big">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close"/>
    </button>
    <div v-if="loaded" class="modalcontent">
      <div class="top">
        <div class="img"><img :src="game.icon.hires?game.icon.hires:game.icon.default" alt=""></div>
        <div class="info">
          <div v-html="game.title" class="title"></div>
          <div class="btns">
            <div class="item">
              <button @click="goGame()" type="button" class="btn st2"><svg-icon name="ui/play"/><span>{{ $t('Button_play') }}</span></button>
            </div>
            <div class="item" v-if="false">
              <button @click="copyPath" type="button" class="btn st3 toggleshare tooltip-btn">
                <span class="tooltiptext">{{ copyText }}</span>
                share</button>
              <div v-if="shareOpen" :class="{open: shareOpen}" class="dropdown">
                <ul class="menu">
                  <li><a href="">
                    <div class="ico">
                      <svg-icon name="ui/facebook"/>
                    </div>
                    <span>Facebook</span></a></li>
                  <li><a href="">
                    <div class="ico">
                      <svg-icon name="ui/twitter"/>
                    </div>
                    <span>Twitter</span></a></li>
                  <li><a href="">
                    <div class="ico">
                      <svg-icon name="ui/vk"/>
                    </div>
                    <span>VK</span></a></li>
                </ul>
              </div>
            </div>
            <div v-if="game.friends" class="friends">
              <div class="label">{{ $t('Game_install_modal_text_friends') }}: <span v-html="game.friends.length"></span></div>
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
          <div class="boxtitle">{{ $t('Game_install_modal_text_screenshots') }}</div>
          <div class="swiperbox">
            <swiper :options="config" ref="screens">
              <swiper-slide v-for="(e, i) in screenshot" :key="i">
                <div @click="index = i" class="img">
                  <img :src="e.image">
                  <span><svg-icon name="ui/plus"/></span>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swipernav">
              <button class="prev_screen b" type="button">
                <svg-icon name="ui/swiper_prev"/>
              </button>
              <button class="next_screen b" type="button">
                <svg-icon name="ui/swiper_next"/>
              </button>
            </div>
          </div>
        </div>
        <div v-html="game.description" class="desc"></div>
      </perfect-scrollbar>
      <div class="bottom-btns">
        <div class="item">
          <button @click="goGame()" type="button" class="btn st2"><svg-icon name="ui/play"/><span>{{ $t('Button_play') }}</span></button>
        </div>
        <div class="item" v-if="false">
          <button @click="shareOpen = !shareOpen" type="button" class="btn st3 toggleshare">
            <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
            share</button>
          <div :class="{open: shareOpen}" class="dropdown">
            <ul class="menu">
              <li>
                <a href="">
                  <div class="ico">
                    <svg-icon name="ui/facebook"/>
                  </div>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="">
                  <div class="ico">
                    <svg-icon name="ui/twitter"/>
                  </div>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="">
                  <div class="ico">
                    <svg-icon name="ui/vk"/>
                  </div>
                  <span>VK</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <CoolLightBox :items="gallery" :index="index" :effect="'fade'" @close="index = null"/>
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
    copyText: 'Copy to clipboard',
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
    screenshot: [],
    index: null
  }),
  created() {
    if (this.gamesData[this.modal.game]) {
      this.game = this.gamesData[this.modal.game]
      this.gallery = this.game.media.filter(e => {
        if (e.type === 'screenshot') {
          return e.image
        }
      }).map(e => e.image)
      this.screenshot = this.game.media.filter(e => e.type === 'screenshot')
      this.loaded = true
    } else {
      this.loadGame(this.modal.game)
    }
  },
  mounted() {
    // document.addEventListener('click', (e) => {
    //   if (!e.target.closest('.dropdown') && !e.target.closest('.toggleshare')) {
    //     this.shareOpen = false
    //   }
    // })
  },
  methods: {
    async loadGame() {
      await this.$store.dispatch('games/setGamesData', {
        id: this.modal.game
      })

      if (this.gamesData[this.modal.game]) {
        this.game = this.gamesData[this.modal.game]
        this.gallery = this.game.media.filter(e => {
          if (e.type === 'screenshot') {
            return e.image
          }
        }).map(e => e.image)
        this.screenshot = this.game.media.filter(e => e.type === 'screenshot')
        this.loaded = true
        let interval = setInterval(() => {
          if (this.$refs.scroll) {
            clearInterval(interval)
            this.$refs.scroll.$el.scrollBy(0, 0)
            this.$refs.scroll.update()
          }
        }, 100)
      }
    },
    goGame() {
      if (localStorage.token) {
        this.$router.push('/game/' + this.game.gid)
        this.$root.$emit('toggleModal', {})
      } else {
        this.$root.$emit('toggleModal', {target: 'logInTemp', game_id: this.game.gid})
      }
    },
    copyPath(){
     let pathToCopy = window.location.origin + this.$router.resolve({ path: '/game/' + this.game.gid }).href
      navigator.clipboard.writeText(pathToCopy)
        .then(() => {
          this.copyText = 'Copied: '+pathToCopy
          console.log('Path copied to clipboard:', pathToCopy);
          // Optionally, show a success message to the user
        })
        .catch(err => {
          this.copyText ='Unable to copy path:'
          console.error('Unable to copy path: ', err);
          // Optionally, show an error message to the user
        });
     setTimeout(()=>{
       this.copyText = 'Copy to clipboard'
     },5000)
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
