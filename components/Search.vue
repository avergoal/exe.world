<template>
<div class="searchbox">
  <div class="top">
    <a @click.prevent="setRoute()" href="/" class="logo"><svg-icon name="logo" /></a>
    <form action="">
      <fieldset>
        <svg-icon class="search" name="ui/search" />
        <input v-model="query" type="text" name="" value="" placeholder="Search games and users">
        <button @click="query = null" type="button"><svg-icon class="close" name="ui/close" /></button>
      </fieldset>
      <button @click="closeSearch()" type="button" class="btn st1"><svg-icon name="ui/close" /></button>
    </form>
  </div>
  <perfect-scrollbar class="searchscroll" ref="scrollSearch">
    <div class="results">
      <GamesSwiper :slides="searchData.popular" between="24" title="Popular Searches"/>
      <GamesSwiper :slides="searchData.games" between="16" title="Games" target="searchCategories" slideClass="s" navClass="s"/>
      <div class="empty">
        <div class="img">
          <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
          <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
        </div>
        <div class="text">
          <b>We did not find any games for your request</b>
          <p>Try changing your search text</p>
        </div>
      </div>
      <UsersSwiper :slides="searchData.peoples" between="8" title="People" target="searchPeoples"/>
      <div class="empty">
        <div class="img">
          <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
          <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
        </div>
        <div class="text">
          <b>We did not find people for your request</b>
          <p>Try changing your search text</p>
        </div>
      </div>
      <div class="empty noresults">
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
  data(){
    return{
      query: null
    }
  },
  methods: {
    closeSearch() {
      this.$store.dispatch('search/setSearchOpen', false)
    }
  },
  computed: {
    searchData() {
      return this.$store.getters['search/searchData']
    }
  }
}
</script>
