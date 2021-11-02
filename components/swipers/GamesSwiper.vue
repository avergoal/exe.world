<template>
<div class="category_slider">
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
      </swiper-slide>
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
  props: ['slides', 'between', 'filters', 'title', 'target', 'tab', 'slideClass', 'navClass'],
  data: () => ({
    config: null,
    data: []
  }),
  mounted() {
    if(this.slides == 'categories') {
      this.data = this[this.slides][this.filter.current].list
      this.$root.$on('changeCategory', (e) => {
        this.changeCategory(e)
      })
    } else {
      this.data = this[this.slides]
    }
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
  },
  methods: {
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
          offset: 0
        })
        this.data = this[this.slides][e].list
      } else {
        this.data = this[this.slides][e].list
      }
    },
    toggleModal(target, e) {
      this.$root.$emit('toggleModal', {
        target: target,
        game: e
      })
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
    recent_games() {
      return this.$store.getters['profile/user'].recent_games
    },
    newgames() {
      return this.$store.getters['games/newgames']
    },
    recommended() {
      return this.$store.getters['games/recommended']
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
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
