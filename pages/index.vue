<template>
  <transition v-if="page == 'index'" name="page">
    <MainPage />
  </transition>
  <transition v-else-if="page == 'myGames'" name="page">
    <MyGames />
  </transition>
  <transition v-else-if="page == 'searchCategories'" name="page">
    <SearchCategories />
  </transition>
  <transition v-else-if="page == 'searchPeoples'" name="page">
    <SearchPeoples />
  </transition>
  <transition v-else name="page">
    <CategoryPage />
  </transition>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    page() {
      if(typeof document != 'undefined') {
        document.getElementById('scroll').dispatchEvent(new Event('scroll'))
      }
      return this.$store.getters['app/page']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
