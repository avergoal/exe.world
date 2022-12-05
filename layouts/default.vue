<template>
  <div :class="{night: theme, gamepage: gamepage}" class="app" :page="page">
    <Header />
    <div class="ps appscroll" :class="{clear: !profile}">
      <main class="content">
        <Nuxt />
        <Footer />
      </main>
    </div>
    <Sidebar v-if="profile" />
    <Modals />
    <transition v-if="!loaded" name="loader">
      <LoaderAnimation />
    </transition>
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
    /* this.$Lazyload.$on('loaded', () => {
      this.$refs.scroll.update()
    }) */
    this.$nextTick(function () {
      const perf = () => {
        const duration = performance.getEntriesByType("navigation")[0].duration
        if (!duration) setTimeout(perf, 0)
        else console.log('%c Page load time ',
          'color: white; background-color: #95B46A',
          `${Math.trunc(duration) / 1000 } s`)
      }
      window.addEventListener('DOMContentLoaded', perf)
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
        case 'chat_read':
        case 'new_message':
        case 'new_friend':
        case 'new_news':
          this.$store.dispatch('notifications/set', {
            type: 'sidebar'
          })
          if(e.event === 'new_message') this.$root.$emit('getNewMessage')
          if(e.event === 'new_friend') this.$root.$emit('getNewFriendRequest')
          break
        case 'new_notification':
          this.$store.dispatch('notifications/set', {
            type: 'header'
          })
        case 'balance_changed':
          this.$store.dispatch('profile/getBalance', {
            type: 'header'
          })
          this.$root.$emit('toggleModal', { target: 'paymentSuccesfull' })
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
