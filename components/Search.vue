<template>
  <div class="searchbox">
    <div class="top">
      <div class="logo">
        <button @click="$emit('toggle', 'info')" class="small" type="button">
          <svg-icon name="logo_small"/>
        </button>
        <button @click="goHome()" type="button">
          <svg-icon name="logo"/>
        </button>
      </div>
      <form @submit.prevent action="">
        <fieldset>
          <svg-icon class="search" name="ui/search"/>
          <input v-model="query" @input="goSearch()" type="text" name="" value="" :placeholder="$t('Search_input_text')">
          <button @click="resetSearch()" type="button">
            <svg-icon class="close" name="ui/close"/>
          </button>
        </fieldset>
        <div class="close">
          <button @click="closeSearch()" type="button" class="btn st1">
            <svg-icon name="ui/close"/>
          </button>
          <span class="mobile">{{ $t('Header_search') }}</span>
        </div>
      </form>
    </div>
    <client-only>
      <perfect-scrollbar class="searchscroll" ref="scrollSearch">
        <div class="results">
          <GamesSwiper v-if="query === null" slides="search_popular" between="24" :title="$t('Search_popular_text')"
                       boxClass="popular_search"/>
          <GamesSwiper v-if="query !== null && loaded && results.games.length" :key="JSON.stringify(results.games)"
                       slides="search_games" between="16" :title="results.games.length && results.games.length>1?results.games.length + ' ' + $t('Search_result_game_inside_many'):results.games.length + ' ' + $t('Search_result_game_inside_once')" target="searchCategories" slideClass="s"
                       navClass="s"/>
          <div v-else-if="query !== null && loaded && results.peoples.length" class="empty">
            <div class="boxtitle"><span>{{ $t('Search_games') }}</span></div>
            <div class="img">
              <img v-if="theme" src="~/assets/illustration/notfound_inverse.svg"/>
              <img v-else src="~/assets/illustration/notfound.svg"/>
            </div>
            <div class="text">
              <b>{{ $t('Search_noresult_text_1') }}</b>
              <p>{{ $t('Search_noresult_text_2') }}</p>
            </div>
          </div>
          <UsersSwiper v-if="query !== null && loaded && results.peoples.length" :key="JSON.stringify(results.peoples)"
                       slides="search_peoples" between="8" :title="results.peoples.length && results.peoples.length>1?results.peoples.length + ' ' + $t('Search_result_users_many'):results.peoples.length + ' ' + $t('Search_result_users_once')" target="searchPeoples"/>
          <div v-else-if="query !== null && loaded && results.games.length" class="empty">
            <div class="boxtitle"><span>{{ $t('Search_result') }}</span></div>
            <div class="img">
              <img v-if="theme" src="~/assets/illustration/notfound_inverse.svg"/>
              <img v-else src="~/assets/illustration/notfound.svg"/>
            </div>
            <div class="text">
              <b>{{ $t('Search_noresult_text_1') }}</b>
              <p>{{ $t('Search_noresult_text_2') }}</p>
            </div>
          </div>
          <div v-if="query !== null && loaded && !results.peoples.length && !results.games.length"
               class="empty noresults">
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
      </perfect-scrollbar>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  props: {
    toggleMenu: Function
  },
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
    this.$root.$on('scrollUpdate', () => {
      if (this.$refs.scrollSearch) {
        setTimeout(() => {
          this.$refs.scrollSearch.update()
        }, 100)
      }
    })
    this.$root.$on('updateUserProfile', (e) => {
      this.$root.$emit('toggleModal', {target: 'userProfile', user: e})
    })
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
          this.$store.dispatch('stat/sendStat', {
            event_type: "search",
            data: JSON.stringify(this.query)
          })
          this.loaded = true
        }, 350)
      } else if (this.query.length === 0) {
        this.query = null
      }
    },
    goHome() {
      this.$parent.goHome()
      this.closeSearch()
    },
    closeSearch() {
      this.$store.dispatch('search/toggleSearch', false)
      this.resetSearch()
    },
    resetSearch() {
      this.loaded = false
      this.query = null
    }
  },
  computed: {
    popular() {
      return this.$store.getters['search/popular']
    },
    results() {
      return this.$store.getters['search/results']
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
