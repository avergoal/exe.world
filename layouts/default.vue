<template>
<div :class="appTheme" class="app" :pageType="pageType">
  <Header />
  <perfect-scrollbar ref="scroll" :class="{clear: !userAuth}" class="appscroll" id="scroll">
    <main class="content">
      <Nuxt />
      <Footer />
      <Sidebar class="mobile" v-if="userAuth"/>
    </main>
  </perfect-scrollbar>
  <Sidebar v-if="userAuth"/>
  <Modals />
</div>
</template>

<script>
export default {
	name: 'DefaultLayout',
  mounted() {
    window.addEventListener('resize', (e) => {
      this.$refs.scroll.update()
    }, true)
    this.$root.$on('changeMainPageTemplate', (target) => {
      this.$store.dispatch('mainPage/setPageConfigs', target)
      this.$store.dispatch('search/setSearchOpen', false)
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    })
  },
  computed: {
    appTheme() {
      return this.$store.getters['app/appTheme']
    },
    pageType() {
      if(typeof this.$refs.scroll != 'undefined') {
        this.$refs.scroll.$el.scrollTop = 0
      }
      return this.$store.getters['mainPage/pageType']
    },
    userAuth() {
      return this.$store.getters['app/userAuth']
    }
  },
  watch: {
    $route() {
      this.$refs.scroll.$el.scrollTop = 0
      setTimeout(() => {
        this.$refs.scroll.update()
      }, 100)
      this.$store.dispatch('search/setSearchOpen', false)
    }
  }
}
</script>
