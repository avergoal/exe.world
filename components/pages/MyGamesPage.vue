<template>
<div class="index_page">
  <div class="pagetitle">My games</div>
  <div class="categoriesbox">
    <ul v-if="games.length" class="category">
      <li v-for="(e, i) in games" :key="i" class="gamecard f">
        <div class="box">
          <div class="img">
            <img v-lazy="e.poster.default" :alt="e.title">
            <nuxt-link v-if="e.installed" :to="'/g/' + e.gid"><svg-icon name="ui/play"/><span>play</span></nuxt-link>
          </div>
          <div class="info">
            <div v-html="e.title" class="title"></div>
            <div v-html="e.type.title" class="desc" :style="'color:#' + e.type.color"></div>
          </div>
        </div>
      </li>
      <Observer @intersect="loadGames"/>
    </ul>
    <div v-else class="notgames">
      <div class="img">
        <img v-if="theme" src="~/assets/illustration/pad_inverse.svg" />
        <img v-else src="~/assets/illustration/pad.svg" />
      </div>
      <div class="desc">You don't have games yet. Use the search bar to find them.</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'MyGamesPageComponent',
  data: () => ({
    observer: false
  }),
  head() {
    return {
      title: 'My games',
      meta: [{hid: 'description', name: 'description', content: 'My games'}]
    }
  },
  async mounted() {
    await this.$store.dispatch('games/loadUserGames', {
      uid: this.profile.uid,
      type: 'load'
    })
    this.observer = true
  },
  methods: {
    async loadGames() {
      if(this.observer) {
        this.observer = await this.$store.dispatch('games/loadUserGames', {
          uid: this.profile.uid
        })
      }
    },
    openGame(e) {
      this.$root.$emit('toggleModal', {
        target: 'gameInfo',
        game: e
      })
    }
  },
  computed: {
    profile() {
      return this.$store.getters['profile/data']
    }, 
    games() {
      return this.$store.getters['games/userAll'].list
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
