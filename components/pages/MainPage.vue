<template>
<div class="index_page">
  <MainSwiper :slides="pageData.main"/>
  <GamesSwiper :slides="pageData.new" between="24" title="New Games" target="new"/>
  <GamesSwiper :slides="pageData.reccomends" between="24" title="Recommended <i>games</i>" target="reccomends"/>
  <GamesSwiper :slides="pageData.categories" :filters="filters" between="24" title="Categories" target="categories"/>
</div>
</template>

<script>
export default {
  name: 'MainPageComponent',
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
  computed: {
    pageData() {
      return this.$store.getters['mainPage/pageData']
    }
  }
}
</script>
