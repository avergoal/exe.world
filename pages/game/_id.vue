<template>
  <div v-if="profile && game && isExist" class="gamepagebox">
    <!--  <div v-html="pageTitle" class="pagetitle"></div>-->
    <GuestSave :poster="game.poster"
               v-if="isGuest && !hideGuestSave "
               @closeGuestSave="hideGuestSave = true"
    ></GuestSave>
    <div class="framebox" :style="`height:${viewportHeight}px` ">
      <iframe :src="frame.url" id="gameFrame" frameborder="0" allowfullscreen allow="fullscreen"></iframe>
    </div>
    <div class="mobilebtns" v-if="showButton" :class="{
    'top-left':game.position==='top-left',
    'top-right':game.position==='top-right',
    'top-center':game.position==='top-center',
    'bottom-left':game.position==='bottom-left',
    'bottom-right':game.position==='bottom-right',
    'bottom-center':game.position==='bottom-center',
    'left-center':game.position==='left-center',
    'right-center':game.position==='right-center',
  }">
      <button class="dropdown-button" @click="openMenu" type="button">
        <svg-icon name="ui/menu"/>
      </button>
      <!--    <nuxt-link to="/"><svg-icon name="ui/close" /></nuxt-link>-->
      <div class="game-dropdown-menu" v-if="menuOpen">
        <div class="dropdown-info">
          <div class="img"><img :src="game.icon.hires?game.icon.hires:game.icon.default" alt=""></div>
          <div v-html="game.title" class="name"></div>
        </div>
        <ul class="menu">
          <li v-if="!isIOS">
            <button type="button" @click="toggleFullscreen">
              <svg-icon name="ui/fullscreen" v-if="!fullscreen"/>
              <svg-icon name="ui/exit-fullscreen" v-else/>
              {{ fullscreen ? $t('Game_modal_exit_fullscreen') : $t('Game_modal_fullscreen') }}
            </button>
          </li>
          <li>
            <button type="button" @click="closeGame">
              <svg-icon name="ui/exit"/>
              {{ $t('Game_modal_exit') }}
            </button>
          </li>
          <li>
            <button type="button" @click="$root.$emit('toggleModal', {target: 'developer',developer:game.developer})">
              <svg-icon name="ui/about-circle"/>
              {{ $t('Game_modal_developer') }}
            </button>
          </li>
        </ul>
      </div>
      <div class="menu-layout"  v-if="menuOpen"></div>
    </div>
  </div>
  <div v-else-if="!isExist" class="no-game">
    <img src="~/assets/illustration/game_not_found.svg" alt="game_not_found"/>
    <h2>{{ $t('Gamepage_nogame_text_1') }}</h2>
    <p>{{ $t('Gamepage_nogame_text_2') }}</p>
  </div>

</template>

<script>
import GuestSave from '~/components/guest/GuestSave'

export default {
  name: 'GamePage',
  components: {
    GuestSave
  },
  data: () => ({
    game: null,
    frame: {
      height: 0,
      url: null
    },
    viewportHeight: 0,
    pageTitle: 'EXE.world',
    hideGuestSave: true,
    showButton: false,
    mouseOut: false,
    fullscreen: false,
    menuOpen: false,
    timer:null
  }),
  head() {
    return {
      title: this.pageTitle,
      meta: [{hid: 'description', name: 'description', content: 'description category'}]
    }
  },
  async mounted() {
    setTimeout(() => {
      this.hideGuestSave = false
    }, 300000)
    this.viewportHeight = this.getViewportHeight();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
    if (!localStorage.token) {
      await this.$store.dispatch('auth/regGuest')
    }
    if (!this.profile) {
      await this.$store.dispatch('auth/auth', localStorage.token)
    }
    await this.loadGame()
    this.iframeListener()
    setTimeout(() => {
      this.showButton = true
      window.addEventListener('mouseout', this.handleMouseOut)
    }, 3000)
this.timer = setTimeout(() => {
  window.ym(95926948,'reachGoal',`10min/game/${this.$route.params.id}`)
},600000)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
    window.removeEventListener('mouseout', this.handleMouseOut);
    window.removeEventListener('click', this.closeMenu)
    document.getElementById('content').classList.remove('game');
    clearTimeout(this.timer);
  },
  methods: {
    openMenu() {
      if (window.innerWidth < 577) {
        this.$root.$emit('toggleModal', {target: 'gameMenu', game: this.game})
      } else {
        if(!this.menuOpen) {
          this.menuOpen = true
          setTimeout(() => {
            window.addEventListener('click', this.closeMenu)
          })
        }
      }
    },
    closeMenu() {
        this.menuOpen = false
        window.removeEventListener('click', this.closeMenu)
    },
    closeGame() {
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen(); // Standard
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Webkit browsers
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE11
        }
      }
      this.$router.push('/')
    },
    toggleFullscreen() {
      const elem = document.documentElement; // Get the root element (HTML)

      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen(); // Standard
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(); // Webkit browsers
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen(); // IE11
        }
        this.fullscreen = true
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen(); // Standard
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Webkit browsers
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE11
        }
        this.fullscreen = false

      }
    },
    handleMouseOut() {
      if (!this.mouseOut) {
        this.mouseOut = true
        this.hideGuestSave = false
      }
    },
    async loadGame() {
      console.log(this.gamesData)
      if (!this.gamesData[this.$route.params.id]) {
        const game = await this.$store.dispatch('games/setGamesData', {
          id: this.$route.params.id
        })

      }

      if (this.gamesData[this.$route.params.id]) {
        this.game = this.gamesData[this.$route.params.id]
        this.pageTitle = this.game.title
        await this.runGame()

      }
    },
    iframeListener() {
      // let that = this
      // window.addEventListener("message", function (e) {
      //   if (e.data.type == 'showOrderBox') {
      //     that.showOrderBox(e.data.data.item)
      //   }
      // },
      // false)
      window.ExeWorldApi.setCallbacks({
        'orderBoxShow': this.orderBoxShow, // функция для отображения модального окна покупки
        'orderBoxResult': this.orderBoxResult, // функция для получения результатов покупки
      })
    },
    orderBoxResult(item) {
      if (item.success) {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
          "ecommerce": {
            "purchase": {
              "actionField": {
                "id" : 'game-id'+ Date.now()
              },
              "products": [
                {
                  "name": "Пополнение баланса",
                  "data": JSON.stringify(item)
                }
              ]
            }
          }
        });
        window.ym(95926948,'reachGoal','exeworld_purchase')
        this.$root.$emit('toggleModal', {target: 'gameBuySuccess'})
      }
    },
    orderBoxShow(item) {
      this.$root.$emit('toggleModal', {target: 'gameBuy', item})
    },
    async runGame() {
      console.log(this.game)
      if (!this.game.installed) {
        await this.$store.dispatch('games/installGame', {
          gid: this.game.gid
        })
        await this.$store.dispatch('games/setGamesData', {
          id: this.$route.params.id
        })
      }
      let data = await this.$store.dispatch('games/runGame', {
        gid: this.game.gid
      })
      if (data.response) {
        this.frame = {
          height: data.response.game_height,
          url: data.response.game_url
        }
        document.getElementById('content').classList.add('game');
        this.$root.$emit('resize')
      } else {
        alert(data.error)
      }
    },
    handleResize() {
      this.viewportHeight = this.getViewportHeight();
    },
    getViewportHeight() {
      const isMobile = window.matchMedia('(max-width: 767px)').matches; // Check if it's a mobile device

      let height = window.innerHeight; // Get the initial height

      if (isMobile) {
        // For mobile devices, consider URL bar height (if it's present)
        const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');

        if (isSafari) {
          // For Safari on iOS, consider additional space for the URL bar
          height = document.documentElement.clientHeight;
        } else {
          // For other mobile browsers, attempt to determine the URL bar's presence
          const maxPossibleHeight = screen.availHeight; // Maximum possible height without URL bar
          height = Math.max(maxPossibleHeight, height); // Choose the maximum height
        }
      } else {
        // For desktop or larger screens, use the window height directly
        height = window.innerHeight;
      }

      return height;
    }
  },
  computed: {
    profile() {
      return this.$store.getters['profile/data']
    },
    isGuest() {
      return this.$store.getters['profile/isGuest']
    },
    gamesData() {
      return this.$store.getters['games/gamesData']
    },
    isExist() {
      return this.$store.getters['games/isExist']
    },
    isIOS() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent) || window.navigator.userAgent.match(/Mac/) && window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 2;
    },
  }
}
</script>
