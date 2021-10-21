<template>
<div class="index_page">
  <div class="pagetitle">My games</div>
  <GamesSwiper v-if="user.recent_games.length" slides="recent_games" between="24" title="Recent Games"/>
  <GamesSwiper slides="recommended" between="24" title="Recommended <i>games</i>"/>
  <div class="categoriesbox">
    <div class="wrap"><div class="boxtitle">Categories</div></div>
    <Filters type="userCategoriesFilters"/>
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
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'MyGamesPageComponent',
  head() {
    return {
      title: 'My games',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'My games'
      }]
    }
  },
  data: () => ({
    games: []
  }),
  mounted() {
    setTimeout(() => {
      this.$root.$emit('resize')
    }, 100)
    this.games = this.user.user_games
  },
  methods: {
    changeCategory(e) {
      this.games = (e == 0) ? this.user.user_games : []
      if(e > 0) {
        for(let i = 0; i < this.user.user_games.length; i++) {
          if(this.user.user_games[i].type.cid == e) {
            this.games.push(this.user.user_games[i])
          }
        }
      }
    },
    openGame(e) {
      this.$root.$emit('toggleModal', {
        open: true,
        target: 'gameInfo',
        game: e
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
