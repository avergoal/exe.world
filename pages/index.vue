<template>
  <transition v-if="pageType == 'index'" name="page">
    <MainPage />
  </transition>
  <transition v-else-if="pageType == 'myGames'" name="page">
    <MyGames />
  </transition>
  <transition v-else-if="pageType == 'searchCategories'" name="page">
    <SearchCategories />
  </transition>
  <transition v-else-if="pageType == 'searchPeoples'" name="page">
    <SearchPeoples />
  </transition>
  <transition v-else name="page">
    <CategoryPage />
  </transition>
</template>

<script>
import MainPage from '../components/pages/MainPage'
import CategoryPage from '../components/pages/CategoryPage'
import MyGames from '../components/pages/MyGamesPage'
import SearchCategories from '../components/pages/SearchCategoryPage'
import SearchPeoples from '../components/pages/SearchPeoplesPage'

export default {
  name: 'IndexPage',
  components: {
    MainPage,
    MyGames,
    CategoryPage,
    SearchCategories,
    SearchPeoples
  },
  head() {
		return {
      title: this.pageTitle,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'description category'
      }]
    }
  },
  computed: {
    pageType() {
      setTimeout(() => {
        if(typeof document != 'undefined') {
          document.getElementById('scroll').dispatchEvent(new Event('scroll'))
        }
      }, 100)
      return this.$store.getters['mainPage/pageType']
    },
    pageTitle() {
      return this.$store.getters['mainPage/pageTitle']
    }
  }
}
</script>
