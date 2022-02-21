<template>
<div :class="{night: theme, gamepage: gamepage}" class="app" :page="page">
  <Header />
  <perfect-scrollbar ref="scroll" :class="{clear: !profile}" class="appscroll" id="scroll">
    <main class="content">
      <Nuxt />
      <Footer />
      <!--Sidebar class="mobile" v-if="profile"/>-->
    </main>
  </perfect-scrollbar>
  <Sidebar v-if="profile"/>
  <Modals />
  <div :class="{loaded: loaded}" class="loader"><img src="/theme/img/loader.gif" alt=""></div>
</div>
</template>

<script>
export default {
	name: 'DefaultLayout',
  data: () => ({
    loaded: false,
    gamepage: false
  }),
  created() {
    (typeof window == 'undefined') || this.loadUser()
    this.setGamePage()
  },
  mounted() {
    this.$root.$on('changeTemplate', (e) => {
      this.changeTemplate(e)
    })
    this.$root.$on('resize', () => {
      this.scrollUpdate()
    })
    this.$root.$on('setLoader', (e) => {
      this.loaded = e
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
        await this.$store.dispatch('auth/auth', localStorage.token)
        let connection = new WebSocket('wss://ws.exe.world')
        connection.onopen = () => {
          connection.send(JSON.stringify({
            method: 'auth',
            sid: this.profile.wssid
          }))
        }
        connection.onmessage = (e) => {
          this.updateData(JSON.parse(e.data))
        }
      }
      this.loaded = true
    },
    updateData(e) {
      switch(e.event) {
        case 'new_message':
        case 'new_friend':
        case 'new_news':
          this.$store.dispatch('notifications/set', {
            type: 'sidebar'
          })
          break
        case 'new_notification':
          this.$store.dispatch('notifications/set', {
            type: 'header'
          })
        case 'balance_changed':
          this.$store.dispatch('profile/getBalance', {
            type: 'header'
          })
          break
      }
    },
    changeTemplate(e) {
      this.$store.dispatch('app/setPage', e)
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    scrollUpdate() {
      this.$root.$emit('scrollUpdate')
      if(this.$refs.scroll) {
        this.$refs.scroll.$el.scrollBy(0, 0)
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    },
    setGamePage() {
      this.gamepage = (this.$route.name == 'g-id') ? true : false
    }
  },
  computed: {
    theme() {
      return this.$store.getters['app/theme']
    },
    page() {
      if(this.$refs.scroll) {
        this.$refs.scroll.$el.scrollBy(0, 0)
      }
      return this.$store.getters['app/page']
    },
    profile() {
      return this.$store.getters['profile/data']
    }
  },
  watch: {
    $route(e) {
      this.scrollUpdate()
      this.$store.dispatch('search/toggleSearch', false)
      this.setGamePage()
      if(e.path != '/') {
        this.$store.dispatch('app/setPage', null)
      } else if(!this.page) {
        this.$store.dispatch('app/setPage', 'index')
      }
    }
  }
}
</script>
