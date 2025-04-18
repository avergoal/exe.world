<template>
<div :class="boxClass" class="category_slider">
  <div class="boxtitle">
    <span v-html="title"></span>
    <button v-if="target" @click="setRoute(target)" type="button"><svg-icon name="ui/more"/></button>
    <button v-if="tab" @click="setTab(tab)" type="button"><svg-icon name="ui/more"/></button>
  </div>
  <Filters v-if="filters" :type="filters"/>
  <div v-if="config" class="swiperbox">
    <swiper :options="config">
      <swiper-slide v-for="(e, i) in data" :key="i" :class="(slideClass ? slideClass : 'b')" class="gamecard">
        <div class="box">
          <div class="img">
            <!-- <img src="/theme/img/loader.gif" alt="" class="lazyloader"> -->
            <img v-lazy="e?.poster?.default" :alt="e?.title">
            <!-- <button v-if="!profile" @click="$root.$emit('toggleModal', {target: 'signIn'})" type="button"><svg-icon name="ui/play"/><span>play</span></button> -->
            <button v-if="!e?.installed && profile && !profile?.is_guest" @click="$root.$emit('toggleModal', {target: 'gameInfo', game: e?.gid})" type="button"><svg-icon name="ui/play"/><span>{{ $t('Button_play') }}</span></button>
            <button v-else @click="openGame(e?.gid)" ><svg-icon name="ui/play"/><span>{{ $t('Button_play') }}</span></button>
          </div>
          <div class="info">
            <div v-html="e?.title" class="title"></div>
            <div v-html="e?.type?.title" class="desc" :style="'color:#' + e?.type?.color"></div>
          </div>
        </div>
      </swiper-slide>
      <Observer @intersect="intersected"/>
    </swiper>
    <div :class="navClass" class="swipernav">
      <button :class="'prev_'+_uid" class="prev b" type="button"><svg-icon name="ui/swiper_prev"/></button>
      <button :class="'next_'+_uid" class="next b" type="button"><svg-icon name="ui/swiper_next"/></button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GamesSwiperTemplate',
  props: ['slides', 'between', 'filters', 'title', 'target', 'tab', 'slideClass', 'navClass', 'boxClass'],
  data: () => ({
    config: null,
    data: [],
    current: 0
  }),
  mounted() {
    this.config = {
      slidesPerView: 'auto',
      navigation: {
        prevEl: '.prev_'+this._uid,
        nextEl: '.next_'+this._uid
      },
      breakpoints: {
        0: {spaceBetween: 8},
        577: {spaceBetween: 16},
        1025: {spaceBetween: Number(this.between)}
      }
    }
    this.loadSlides()
    this.$watch(vm => [vm[this.slides]], () => {
      this.loadSlides()
    }, {
      immediate: true,
      deep: true
    })
  },
  methods: {
    openGame(id) {
      this.$root.$emit('toggleModal', {})
      this.$router.push({
        path: '/game/' + id
      })
    },
    async loadSlides() {
      if(this.slides == 'categories') {
        /* await this.$store.dispatch('games/setAllGames') */
        if (this.slides === 'user_profile_games') {
          this.data = this[this.slides]
        } else {
          this.data = this[this.slides][this.filter.current]?.list
        }
        this.$root.$on('changeCategory', (e) => {
          this.current = e
          this.changeCategory(e)
        })
      } else {
        if (this[this.slides][0]?.gid) {
          this.data = this[this.slides]
        } else {
          this.data = []
        }
      }
    },
    setRoute(target) {
      this.$root.$emit('changeTemplate', target)
      this.closeSearch()
    },
    setTab(target) {
      this.$root.$emit('toggleModal', {target: target})
    },
    closeSearch() {
      this.$root.$emit('closeSearch')
    },
    async changeCategory(e) {
      if(!this[this.slides][e].length) {
        await this.$store.dispatch('games/setCategories', {
          type: e,
          offset: 0,
          filters: true
        })
        this.data = this[this.slides][e].list
      } else {
        this.data = this[this.slides][e].list
      }
    },
    async intersected() {
      if(this.slides === 'categories') {
        await this.$store.dispatch('games/setCategories', {
          type: this.current
        })
      }
      if (this.slides === 'user_profile_games') {
        await this.$store.dispatch('users/loadGames')
      }
    }
  },
  computed: {
    filter() {
      return this.$store.getters['filters/allCategories']
    },
    search_popular() {
      return this.$store.getters['search/popular']
    },
    search_games() {
      return this.$store.getters['search/results'].games
    },
    newgames() {
      return this.$store.getters['games/newgames'].list
    },
    recommended() {
      return this.$store.getters['games/recommended'].list
    },
    categoriescarousel() {
      return this.$store.getters['games/categoriescarousel']
    },
    categories() {
      return this.$store.getters['games/categories']
    },
    user_profile_games() {
      return this.$store.getters['users/profile'].games.games
    },
    profile() {
      return this.$store.getters['profile/data']
    }
  }
}
</script>
