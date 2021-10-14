<template>
<div class="index_page">
  <div class="pagetitle">My games</div>
  <GamesSwiper v-if="user.recent_games.length" slides="recent_games" between="24" title="Recent Games"/>
  <GamesSwiper slides="recommended" between="24" title="Recommended <i>games</i>"/>
  <div class="categoriesbox">
    <div class="wrap"><div class="boxtitle">Categories</div></div>
    <ul class="category">
      <li v-for="(e, i) in user.user_games" :key="i" class="gamecard f">
        <div class="box">
          <div class="img">
            <img v-lazy="e.poster.default" :alt="e.title">
            <nuxt-link v-if="e.installed" :to="'/g/' + e.gid"><svg-icon name="ui/play"/><span>play</span></nuxt-link>
            <button v-else @click="openGame(e.gid)" type="button"><svg-icon name="ui/play"/><span>play</span></button>
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
</template>//gamesShow

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
  mounted() {
    setTimeout(() => {
      document.getElementById('scroll').dispatchEvent(new Event('scroll'))
    }, 100)
    console.log(this.user)
  },
  methods: {
    setPage(e) {
      this.$store.dispatch('mainPage/setPageConfigs', e)
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  }
}
</script>
