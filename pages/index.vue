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
      this.$root.$emit('resize')
      return this.$store.getters['app/page']
    }
  },
  methods: {
    getReferringSite() {
      const referringSite = document.referrer;
      console.log('Referring website:', referringSite);
      // Use referringSite as needed in your code
    }
  },
  mounted() {
    setTimeout(()=>{
      this.getReferringSite(); // Call the method when the component is mounted
    },5000)
  }
}
</script>
