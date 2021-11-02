<template>
<div :class="{night: theme}" class="app" :page="page">
  <Header />
  <perfect-scrollbar ref="scroll" :class="{clear: !user}" class="appscroll" id="scroll">
    <main class="content">
      <Nuxt />
      <Footer />
      <Sidebar class="mobile" v-if="user"/>
    </main>
  </perfect-scrollbar>
  <Sidebar v-if="user"/>
  <Modals />
  <div :class="{loaded: loaded}" class="loader"><img src="/theme/img/loader.gif" alt=""></div>
</div>
</template>

<script>
export default {
	name: 'DefaultLayout',
  data: () => ({
    loaded: false
  }),
  created() {
    (typeof window == 'undefined') || this.loadUser()
  },
  mounted() {
    this.$root.$on('changeTemplate', (e) => {
      this.changeTemplate(e)
    })
    this.$root.$on('resize', () => {
      this.scrollUpdate()
    })
    window.addEventListener('resize', () => {
      this.scrollUpdate()
    }, true)
    this.$Lazyload.$on('loaded', () => {
      this.$refs.scroll.update()
    })
  },
  methods: {
    async loadUser() {
      if(localStorage.token) {
        await this.$store.dispatch('auth/auth', {api_token: localStorage.token})
      }
      this.loaded = true
    },
    changeTemplate(e) {
      this.$store.dispatch('app/setPage', e)
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    scrollUpdate() {
      if(this.$refs.scroll) {
        this.$refs.scroll.$el.scrollTop = 0
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    }
  },
  computed: {
    theme() {
      return Number(this.$store.getters['app/theme'])
    },
    page() {
      if(this.$refs.scroll) {
        this.$refs.scroll.$el.scrollTop = 0
      }
      return this.$store.getters['app/page']
    },
    user() {
      return this.$store.getters['profile/user']
    }
  },
  watch: {
    $route() {
      this.scrollUpdate()
      this.$store.dispatch('search/toggleSearch', false)
    }
  }
}
</script>
