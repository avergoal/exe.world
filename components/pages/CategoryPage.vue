<template>
<div class="index_page">
  <div class="categoriesbox">
    <div v-html="title" class="pagetitle"></div>
    <Filters v-if="page == 'categories'" type="categories"/>
    <ul class="category">
      <li v-for="(e, i) in games" :key="i" class="gamecard f">
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
      if(!this.categories[this.filter].list.length) {
        this.loadGames(this.filter, 0)
      } else {
        this.games = this.categories[this.filter].list
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
      let formData = new FormData()
      formData.append('type', t)
      formData.append('offset', o)
      formData.append('api_token', this.token)
      await this.$store.dispatch('games/setCategories', formData)
      this.games = this.categories[this.filter].list
    },
    async intersected() {
      if(!this.categories[this.filter].loaded) {
        this.loadGames(this.filter, this.categories[this.filter].offset)
      }
    }
  },
  computed: {
    page() {
      return this.$store.getters['app/page']
    },
    categories() {
      return this.$store.getters['games/categories']
    },
    filter() {
      return this.$store.getters['filters/category']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
