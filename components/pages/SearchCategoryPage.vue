<template>
<div class="index_page">
  <div class="categoriesbox">
    <div class="searchform">
      <fieldset>
        <svg-icon class="search" name="ui/search" />
        <input v-model="query" @input="goSearch()" type="text" name="" value="" placeholder="Search games">
      </fieldset>
      <div class="btns">
        <button class="active" type="button">games</button>
        <button @click="$root.$emit('changeTemplate', 'searchPeoples')" type="button">people</button>
      </div>
    </div>
    <div v-html="pagetitle" class="pagetitle"></div>
    <ul v-if="results.games.length" class="category">
      <li v-for="(e, i) in results.games" :key="i" class="gamecard f">
        <div class="box">
          <div class="img">
            <img v-lazy="e.poster.default" :alt="e.title">
            <button v-if="!user" @click="toggleModal('gameSignIn', e.poster.default)" type="button"><svg-icon name="ui/play"/><span>play</span></button>
            <nuxt-link v-else-if="e.installed" :to="'/g/' + e.gid"><svg-icon name="ui/play"/><span>play</span></nuxt-link>
            <button v-else @click="toggleModal('gameInfo', e.gid)" type="button"><svg-icon name="ui/play"/><span>play</span></button>
          </div>
          <div class="info">
            <div v-html="e.title" class="title"></div>
            <div v-html="e.type.title" class="desc" :style="'color:#' + e.type.color"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="!results.games.length" class="noresults page">
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
</template>

<script>
export default {
  name: 'SearchCategoryPageComponent',
  data: () => ({
    pagetitle: '',
    query: ''
  }),
  mounted() {
    this.pagetitle = this.results.games.length + ' games found'
    this.query = this.results.query
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
          this.pagetitle = this.results.games.length + ' games found'
        }, 350)
      }
    }
  },
  computed: {
    results() {
      return this.$store.getters['search/results']
    },
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
