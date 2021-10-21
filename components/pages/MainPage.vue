<template>
<div class="index_page">
  <MainSwiper :slides="carousel" :key="JSON.stringify(carousel)"/>
  <GamesSwiper slides="newgames" between="24" title="New Games" target="new" :key="JSON.stringify(carousel) + 'newgames'"/>
  <GamesSwiper slides="recommended" between="24" title="Recommended <i>games</i>" target="reccomends" :key="JSON.stringify(carousel) + 'recommended'"/>
  <GamesSwiper slides="categories" filters="allCategoriesFilters" between="24" title="Categories" target="categories" :key="JSON.stringify(carousel) + 'categories'"/>
</div>
</template>

<script>
export default {
  name: 'MainPageComponent',
  head: () => ({
    title: 'Exe world',
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'Exe world'
    }]
  }),
  computed: {
    carousel() {
      return this.$store.getters['games/carousel']
    }
  }
}
</script>
