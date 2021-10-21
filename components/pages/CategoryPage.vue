<template>
<div class="index_page">
  <div class="categoriesbox">
    <div v-html="title" class="pagetitle"></div>
    <!--Filters v-if="page == 'categories'" type="categories"/-->
    <ul class="category">
      <li v-for="(e, i) in games" :key="i" class="gamecard f">
        <div class="box">
          <div class="img">
            <img v-lazy="e.poster.default" :alt="e.title">
            <button v-if="!user" @click="toggleModal('gameSignIn', e.poster.default)" type="button"><svg-icon name="ui/play"/><span>play</span></button>
            <nuxt-link v-if="e.installed" :to="'/g/' + e.gid"><svg-icon name="ui/play"/><span>play</span></nuxt-link>
            <button v-else @click="toggleModal('gameInfo', e.gid)" type="button"><svg-icon name="ui/play"/><span>play</span></button>
          </div>
          <div class="info">
            <div v-html="e.title" class="title"></div>
            <div v-html="e.type.title" class="desc" :style="'color:#' + e.type.color"></div>
          </div>
        </div>
      </li>
      <Observer @intersect="intersected"/>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'CategoryPageComponent',
  data: () => ({
    games: [],
    title: 'Exe world',
    decsription: 'Exe world'
  }),
  head() {
    return {
      title: this.title,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.description
      }]
    }
  },
  created() {
    switch(this.page) {
      case 'new':
        this.title = 'New games'
        this.decsription = 'New games'
        break
      case 'reccomends':
        this.title = 'Reccomends games'
        this.decsription = 'Reccomends games'
        break
      case 'categories':
        this.title = 'Categories games'
        this.decsription = 'Categories games'
        break
    }
  },
  mounted() {
    this.loadPage()
    this.$root.$on('changeCategory', (e) => {
      this.changeCategory(e)
    })
  },
  methods: {
    loadPage() {
      switch(this.page) {
        case 'new':
          this.games = this.newgames
          break
        case 'reccomends':
          this.games = this.recommended
          break
        case 'categories':
          if(!this.categories[this.filter].list.length) {
            this.loadGames(this.filter, 0)
          } else {
            this.games = this.categories[this.filter].list
          }
          break
      }
    },
    changeCategory(e) {
      if(!this.categories[e].list.length) {
        this.loadGames(e, 0)
      } else {
        this.games = this.categories[e].list
      }
    },
    async loadGames(t, o) {
      await this.$store.dispatch('games/setCategories', {
        type: t,
        offset: o
      })
      this.games = this.categories[this.filter].list
    },
    async intersected() {
      return
      if(!this.categories[this.filter].loaded) {
        this.loadGames(this.filter, this.categories[this.filter].offset)
      }
    },
    toggleModal(target, e) {
      this.$root.$emit('toggleModal', {
        open: true,
        target: target,
        game: e
      })
    }
  },
  computed: {
    page() {
      return this.$store.getters['app/page']
    },
    newgames() {
      return this.$store.getters['games/newgames']
    },
    categories() {
      return this.$store.getters['games/categories']
    },
    recommended() {
      return this.$store.getters['games/recommended']
    },
    filter() {
      return this.$store.getters['filters/category']
    },
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
