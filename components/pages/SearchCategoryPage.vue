<template>
  <div class="index_page">
    <div class="categoriesbox">
      <div class="searchform">
        <fieldset>
          <svg-icon class="search" name="ui/search"/>
          <input v-model="query" @input="goSearch()" type="text" name="" value=""
                 :placeholder="$t('Search_placeholder_text')">
        </fieldset>
        <div class="btns">
          <button class="active" type="button">{{ $t('Search_games') }}</button>
          <button @click="$root.$emit('changeTemplate', 'searchPeoples')" type="button">{{
              $t('Search_result')
            }}
          </button>
        </div>
      </div>
      <div
        v-html="results.games.length && results.games.length>1?results.games.length + ' ' + $t('Search_result_game_inside_many'):results.games.length + ' ' + $t('Search_result_game_inside_once')"
        class="pagetitle small"></div>
      <ul v-if="results.games.length" class="category">
        <li v-for="(e, i) in results.games" :key="i" class="gamecard f">
          <div class="box">
            <div class="img">
              <img v-lazy="e.poster.default" :alt="e.title">
              <!--            <button v-if="!user" @click="$root.$emit('toggleModal', {target: 'signIn'})" type="button"><svg-icon name="ui/play"/><span>play</span></button>-->
              <nuxt-link v-if="e.installed" :to="'/game/' + e.gid">
                <svg-icon name="ui/play"/>
                <span>{{ $t('Button_play') }}</span></nuxt-link>
              <button v-else @click="$root.$emit('toggleModal', {target: 'gameInfo', game: e.gid})" type="button">
                <svg-icon name="ui/play"/>
                <span>{{ $t('Button_play') }}</span></button>
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
        <img v-if="theme" src="~/assets/illustration/notfound_inverse.svg"/>
        <img v-else src="~/assets/illustration/notfound.svg"/>
      </div>
      <div class="text">
        <b>{{ $t('Search_noresult_text_1') }}</b>
        <p>{{ $t('Search_noresult_text_2') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchCategoryPageComponent',
  data: () => ({
    query: ''
  }),
  mounted() {
    this.query = this.results.query
  },
  methods: {
    goSearch() {
      if (this.query.length >= 3) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(async () => {
          await this.$store.dispatch('search/goSearch', {
            query: this.query,
            offset: 0,
            limit: 24
          })
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
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
