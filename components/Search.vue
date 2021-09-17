<template>
<div class="searchbox">
  <div class="top">
    <a @click.prevent="setRoute()" href="/" class="logo">
      <svg-icon name="logo_small" class="small"/>
      <svg-icon name="logo" />
    </a>
    <form action="">
      <fieldset>
        <svg-icon class="search" name="ui/search" />
        <input v-model="query" @input="goSearch" type="text" name="" value="" placeholder="Search games and users">
        <button @click="resetSearch()" type="button"><svg-icon class="close" name="ui/close" /></button>
      </fieldset>
      <button @click="closeSearch()" type="button" class="btn st1"><svg-icon name="ui/close" /></button>
    </form>
  </div>
  <perfect-scrollbar class="searchscroll" ref="scrollSearch">
    <div class="results">
      <GamesSwiper v-if="popular.length" slides="search_popular" between="24" title="Popular Searches"/>
      <GamesSwiper v-if="loaded && games.length" slides="search_games" between="16" title="Games" target="searchCategories" slideClass="s" navClass="s"/>
      <div v-else-if="loaded && peoples.length" class="empty">
        <div class="img">
          <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
          <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
        </div>
        <div class="text">
          <b>We did not find any games for your request</b>
          <p>Try changing your search text</p>
        </div>
      </div>
      <UsersSwiper v-if="loaded && peoples.length" :key="JSON.stringify(peoples)" slides="search_peoples" between="8" title="People" target="searchPeoples"/>
      <div v-else-if="loaded && games.length" class="empty">
        <div class="img">
          <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
          <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
        </div>
        <div class="text">
          <b>We did not find people for your request</b>
          <p>Try changing your search text</p>
        </div>
      </div>
      <div v-if="loaded && !peoples.length && !games.length" class="empty noresults">
        <div class="img">
          <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
          <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
        </div>
        <div class="text">
          <b>We did not find anything for your request</b>
          <p>Try changing your search text</p>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</div>
</template>

<script>
export default {
	name: 'SearchComponent',
  data: () => ({
    query: null,
    loaded: false,
    timeOut: null
  }),
  methods: {
    setRoute() {
      this.closeSearch()
      this.$parent.setRoute()
    },
    goSearch() {
      if(this.query.length >= 3) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(async () => {
          let formData = new FormData()
          formData.append('query', this.query)
          formData.append('offset', 0)
          formData.append('limit', 24)
          formData.append('api_token', this.token)
          await this.$store.dispatch('search/goSearch', formData)
          this.loaded = true
        }, 350)
      }
    },
    closeSearch() {
      this.$store.dispatch('search/setOpen', false)
      this.resetSearch()
    },
    resetSearch() {
      this.loaded = false
      this.query = ''
    }
  },
  computed: {
    popular() {
      return this.$store.getters['search/popular']
    },
    games() {
      return this.$store.getters['search/games']
    },
    peoples() {
      return this.$store.getters['search/peoples']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
