<template>
<div v-if="profile && game" class="gamepagebox">
  <div v-html="pageTitle" class="pagetitle"></div>
  <GuestSave
    v-if="isGuest && !hideGuestSave"
    @closeGuestSave="hideGuestSave = true"
  ></GuestSave>
  <div class="framebox">
    <iframe :src="frame.url" frameborder="0"></iframe>
  </div>
  <div class="info">
    <ul>
      <li><button type="button">Terms of use</button></li>
      <li><button type="button">About the developer</button></li>
      <li><button @click="$root.$emit('toggleModal', {target: 'gameRemove', game: game.gid})" type="button">Delete from my games</button></li>
    </ul>
  </div>
  <div class="mobilebtns">
    <button @click="$root.$emit('toggleModal', {target: 'gameMenu', game: game})" type="button"><svg-icon name="ui/menu" /></button>
    <nuxt-link to="/"><svg-icon name="ui/close" /></nuxt-link>
  </div>
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
    hideGuestSave: false
  }),
  head() {
		return {
      title: this.pageTitle,
      meta: [{hid: 'description', name: 'description', content: 'description category'}]
    }
  },
  created() {
    this.loadGame()
  },
  mounted() {
    this.iframeListener()
  },
  methods: {
    async loadGame() {
      if(!this.gamesData[this.$route.params.id]) {
        await this.$store.dispatch('games/setGamesData', {
          id: this.$route.params.id
        })
      }
      if(this.gamesData[this.$route.params.id]) {
        this.game = this.gamesData[this.$route.params.id]
        this.pageTitle = this.game.title
        this.runGame()
      }
    },
    iframeListener() {
      let that = this
      window.addEventListener("message", function (e) {
        if (e.data.type == 'showOrderBox') {
          that.showOrderBox(e.data.data.item)
        }
      },
      false)
    },
    showOrderBox(item) {
      this.$root.$emit('toggleModal', { target: 'gameBuy', item})
    },
    async runGame() {
      console.log(this.game.installed)
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
      let profile = this.$store.getters['profile/data']
      if(!profile) {
        this.$router.push('/')
      }
      return profile
    },
    isGuest() {
      return this.$store.getters['profile/isGuest']
    },
    gamesData() {
      return this.$store.getters['games/gamesData']
    }
  }
}
</script>
