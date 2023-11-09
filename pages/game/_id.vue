<template>
<div v-if="profile && game && isExist" class="gamepagebox">
<!--  <div v-html="pageTitle" class="pagetitle"></div>-->
  <GuestSave
    v-if="isGuest && !hideGuestSave"
    @closeGuestSave="hideGuestSave = true"
  ></GuestSave>
  <div class="framebox">
    <iframe :src="frame.url" id="gameFrame" frameborder="0"></iframe>
  </div>
  <div class="info">
    <ul>
      <li><button type="button">Terms of use</button></li>
      <li><button type="button">About the developer</button></li>
      <li><button @click="$root.$emit('toggleModal', {target: 'gameRemove', game: game.gid})" type="button">Delete from my games</button></li>
    </ul>
  </div>
  <div class="mobilebtns" v-if="showButton">
    <button @click="$root.$emit('toggleModal', {target: 'gameMenu', game: game})" type="button"><svg-icon name="ui/menu" /></button>
    <nuxt-link to="/"><svg-icon name="ui/close" /></nuxt-link>
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
    document.getElementById('content').classList.add('game');
    if(!localStorage.token){
      await this.$store.dispatch('auth/regGuest')
    }
    if(!this.profile){
      await this.$store.dispatch('auth/auth', localStorage.token)
    }
    await this.loadGame()
    setTimeout(()=>{
      this.orientationCheck()
      window.addEventListener("orientationchange",this.orientationCheck)
      window.addEventListener("resize",this.orientationCheck)
    })
    this.iframeListener()
    setTimeout(()=>{
      this.showButton = true
    },3000)
  },
  beforeDestroy(){
    document.getElementById('content').classList.remove('game');
    window.removeEventListener("orientationchange",this.orientationCheck)
    window.removeEventListener("resize",this.orientationCheck)
  },
  methods: {
    isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    orientationCheck(){
      setTimeout(()=>{
      if (this.isMobileDevice() ) {
        let box = document.getElementsByClassName('framebox')[0]

        if(window.matchMedia("(orientation: portrait)") && window.innerWidth<921) {
          box.style.height = window.innerHeight + 'px'
        }else if( window.innerWidth<921){
          box.style.height ='100vh'
        }else{
          box.style.height ='unset'
        }
      }
      },500)
    },
    async loadGame() {
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
        this.$root.$emit('resize')
      } else {
        alert(data.error)
      }
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
