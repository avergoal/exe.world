<template>
<div class="index_page">
  <div class="pagetitle">My games</div>
  <div class="categoriesbox">
    <ul class="category">
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
  mounted() {
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
    }
  }
}
</script>
