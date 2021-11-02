<template>
<div v-if="user && game" class="gamepagebox">
  <div v-html="pageTitle" class="pagetitle"></div>
  <div class="framebox">
    <div v-if="!frame.url" @click="runGame()" class="imgbox"><img :src="game.poster.hires" alt=""></div>
    <iframe v-else :src="frame.url" frameborder="0"></iframe>
  </div>
  <div class="info">
    <ul>
      <li><button @click="toggleModal('gameInfo')" type="button">Terms of use</button></li>
      <li><button type="button">About the developer</button></li>
      <li v-if="game.installed"><button @click="toggleModal('gameRemove')" type="button">Delete from my games</button></li>
    </ul>
    <div class="checkbox">
      <input type="checkbox" name="" value="1" id="notifications">
      <label for="notifications">
        <span>Send game notifications</span>
        <svg-icon name="ui/checkbox" />
      </label>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GamePage',
  head() {
		return {
      title: this.pageTitle,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'description category'
      }]
    }
  },
  data: () => ({
    game: null,
    frame: {
      height: 0,
      url: null
    },
    pageTitle: 'EXE.world'
  }),
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
      }
    },
    async runGame() {
      if(!this.gamesData[this.$route.params.id].installed) {
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
    },
    toggleModal(target) {
      this.$root.$emit('toggleModal', (target) ? {
        target: target,
        game: this.game.gid,
        name: this.game.title
      } : {})
    }
  },
  computed: {
    user() {
      let user = this.$store.getters['profile/user']
      if(user) {
        this.loadGame()
      }
      return user
    },
    gamesData() {
      return this.$store.getters['games/gamesData']
    }
  }
}
</script>
