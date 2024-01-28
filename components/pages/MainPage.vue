<template>
<div class="index_page">
  <MainSwiper :slides="carousel.list"/>
  <GamesSwiper slides="newgames" between="24" title="New Games" target="new"/>
  <GamesSwiper slides="recommended" between="24" title="Recommended <i>games</i>" target="reccomends"/>
  <GamesSwiper slides="categories" filters="allCategoriesFilters" between="24" title="Categories" target="categories"/>
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
