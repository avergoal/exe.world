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
        <input v-model="query" @input="goSearch()" type="text" name="" value="" placeholder="Search games and users">
        <button @click="resetSearch()" type="button"><svg-icon class="close" name="ui/close" /></button>
      </fieldset>
      <button @click="closeSearch()" type="button" class="btn st1"><svg-icon name="ui/close" /></button>
    </form>
  </div>
  <client-only>
    <perfect-scrollbar class="searchscroll" ref="scrollSearch">
      <div class="results">
        <GamesSwiper slides="search_popular" between="24" title="Popular Searches"/>
        <GamesSwiper v-if="loaded && results.games.length" :key="JSON.stringify(results.games)" slides="search_games" between="16" title="Games" target="searchCategories" slideClass="s" navClass="s"/>
        <div v-else-if="loaded && results.peoples.length" class="empty">
          <div class="img">
            <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">
            <b>We did not find any games for your request</b>
            <p>Try changing your search text</p>
          </div>
        </div>
        <UsersSwiper v-if="loaded && results.peoples.length" :key="JSON.stringify(results.peoples)" slides="search_peoples" between="8" title="People" target="searchPeoples"/>
        <div v-else-if="loaded && results.games.length" class="empty">
          <div class="img">
            <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">
            <b>We did not find people for your request</b>
            <p>Try changing your search text</p>
          </div>
        </div>
        <div v-if="loaded && !results.peoples.length && !results.games.length" class="empty noresults">
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
  </client-only>
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
  created() {
    this.$root.$on('toggleModal', () => {
      this.closeSearch()
    })
    this.$root.$on('closeSearch', () => {
      this.closeSearch()
    })
  },
  methods: {
    goSearch() {
      if(this.query.length >= 3) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(async () => {
          await this.$store.dispatch('search/goSearch', {
            query: this.query,
            offset: 0,
            limit: 24
          })
          this.loaded = true
        }, 350)
      }
    },
    setRoute() {
      this.$parent.setRoute()
      this.closeSearch()
    },
    closeSearch() {
      this.$store.dispatch('search/toggleSearch', false)
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
    results() {
      return this.$store.getters['search/results']
    }
  }
}
</script>
