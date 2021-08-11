<template>
<div class="index_page">
  <div v-html="pageTitle" class="pagetitle"></div>
  <GamesSwiper :slides="pageData.recent" between="24" title="Recent Games"/>
  <GamesSwiper :slides="pageData.reccomends" between="24" title="Recommended <i>games</i>" target="reccomends"/>
  <div class="categoriesbox">
    <div class="wrap">
      <div class="boxtitle">Categories</div>
      <Filters :filters="filters"/>
    </div>
    <ul class="category">
      <li v-for="(e, i) in pageData.my" :key="i" class="gamecard f">
        <div class="box">
          <div class="img">
            <img :src="e.img" :alt="e.title">
            <nuxt-link :to="e.link">
              <svg-icon name="ui/play" />
              <span>play</span>
            </nuxt-link>
          </div>
          <div class="info">
            <div v-html="e.title" class="title"></div>
            <div v-html="e.desc" class="desc"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'MyGamesPageComponent',
  data() {
    return {
      filters: [{
        text: 'ALL',
        value: null,
        badge: null
      }, {
        text: 'strategy',
        value: null,
        badge: null
      }, {
        text: 'economic',
        value: null,
        badge: null
      }, {
        text: 'arcade',
        value: null,
        badge: null
      }, {
        text: 'rpg',
        value: null,
        badge: null
      }, {
        text: 'three in a row',
        value: null,
        badge: null
      }, {
        text: 'card games',
        value: null,
        badge: null
      }]
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('scroll').dispatchEvent(new Event('scroll'))
    }, 100)
  },
  methods: {
    setPage(e) {
      this.$store.dispatch('mainPage/setPageConfigs', e)
    }
  },
  computed: {
    pageTitle() {
      return this.$store.getters['mainPage/pageTitle']
    },
    pageData() {
      return this.$store.getters['mainPage/pageData']
    }
  }
}
</script>
