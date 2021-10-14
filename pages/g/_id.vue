<template>
<div class="gamepagebox">
  <div v-html="''" class="pagetitle"></div>
  <div class="framebox">
    <iframe :src="''" frameborder="0"></iframe>
    <div class="overlay" area-label="overlay"></div>
  </div>
  <div class="info">
    <ul>
      <li><button @click="openModal('gameInfo')" type="button">Terms of use</button></li>
      <li><button type="button">About the developer</button></li>
      <li><button @click="removeGame()" type="button">Delete from my games</button></li>
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
    game: null
  }),
  created() {
    if(!this.gamesData[this.$route.params.id]) {
      this.loadGame()
    } else {
      this.game = this.gamesData[this.$route.params.id]
    }
    console.log(this.token, this.gamesData)
  },
  methods: {
    async loadGame() {
      let formData = new FormData()
      formData.append('api_token', this.token)
      formData.append('id', this.$route.params.id)
      await this.$store.dispatch('games/setGamesData', formData)
      if(this.gamesData[this.$route.params.id]) {
        this.game = this.gamesData[this.$route.params.id]
      }
    },
    openModal(target) {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: target
      })
    },
    removeGame() {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: 'gameRemove'
      })
    }
  },
  computed: {
    gamesData() {
      return this.$store.getters['games/gamesData']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
