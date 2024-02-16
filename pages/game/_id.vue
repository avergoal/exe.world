<template>
<div v-if="profile && game && isExist" class="gamepagebox">
<!--  <div v-html="pageTitle" class="pagetitle"></div>-->
  <GuestSave :poster="game.poster"
    v-if="isGuest && !hideGuestSave"
    @closeGuestSave="hideGuestSave = true"
  ></GuestSave>
  <div class="framebox" :style="`height:${viewportHeight}px` ">
    <iframe :src="frame.url" id="gameFrame" frameborder="0" allowfullscreen allow="fullscreen"></iframe>
  </div>
  <div class="info">
    <ul>
      <li><button type="button">Terms of use</button></li>
      <li><button type="button">{{ $t('Game_modal_developer') }}</button></li>
      <li><button @click="$root.$emit('toggleModal', {target: 'gameRemove', game: game.gid})" type="button">Delete from my games</button></li>
    </ul>
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
    <button @click="$root.$emit('toggleModal', {target: 'gameMenu', game: game})" type="button"><svg-icon name="ui/menu" /></button>
<!--    <nuxt-link to="/"><svg-icon name="ui/close" /></nuxt-link>-->
  </div>
</div>
<div v-else-if="!isExist" class="no-game">
  <img src="~/assets/illustration/game_not_found.svg"  alt="game_not_found"/>
  <h2>Oops...game not found</h2>
  <p>go to the games catalog or use the search bar</p>
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
    viewportHeight:0,
    pageTitle: 'EXE.world',
    hideGuestSave: false,
    showButton: false,
  }),
  head() {
		return {
      title: this.pageTitle,
      meta: [{hid: 'description', name: 'description', content: 'description category'}]
    }
  },
  async mounted() {
    this.viewportHeight = this.getViewportHeight(); // Calculate initial viewport height
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
    if(!localStorage.token){
      await this.$store.dispatch('auth/regGuest')
    }
    if(!this.profile){
      await this.$store.dispatch('auth/auth', localStorage.token)
    }
    await this.loadGame()
    // setTimeout(()=>{
    //   this.orientationCheck()
    //   window.addEventListener("orientationchange",this.orientationCheck)
    //   window.addEventListener("resize",this.orientationCheck)
    // })
    this.iframeListener()
    setTimeout(()=>{
      this.showButton = true
    },3000)
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.handleResize); // Remove resize event listener
    window.removeEventListener('orientationchange', this.handleResize); // Remove resize event listener
    document.getElementById('content').classList.remove('game');
    // window.removeEventListener("orientationchange",this.orientationCheck)
    // window.removeEventListener("resize",this.orientationCheck)
  },
  methods: {
    // isMobileDevice() {
    //   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // },
    // orientationCheck(){
    //   setTimeout(()=>{
    //   if (this.isMobileDevice() ) {
    //     let box = document.getElementsByClassName('framebox')[0]
    //
    //     if(window.matchMedia("(orientation: portrait)") && window.innerWidth<921) {
    //       box.style.height = window.innerHeight + 'px'
    //     }else if( window.innerWidth<921){
    //       box.style.height ='100vh'
    //     }else{
    //       box.style.height ='unset'
    //     }
    //   }
    //   },500)
    // },
    async loadGame() {
      console.log(this.gamesData)
      if(!this.gamesData[this.$route.params.id]) {
        const game = await this.$store.dispatch('games/setGamesData', {
          id: this.$route.params.id
        })

      }

      if(this.gamesData[this.$route.params.id]) {
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
      if(item.success){
        this.$root.$emit('toggleModal', { target: 'gameBuySuccess'})
      }
    },
    orderBoxShow(item) {
      this.$root.$emit('toggleModal', { target: 'gameBuy', item})
    },
    async runGame() {
      console.log(this.game)
      if(!this.game.installed) {
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
      if(data.response) {
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
    handleResize(){
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
    }
  }
}
</script>
