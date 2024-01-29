<template>

  <div :class="{night: theme, gamepage: gamepage}" class="app" :page="page">
    <Header/>
    <!--    <div class="ps appscroll" :class="{clear: !profile}">-->
    <perfect-scrollbar ref="scroll" class=" appscroll" :class="{clear: !profile}" v-if="!isMobile">

      <main class="content" id="content" ref="content">
        <Nuxt/>
        <Footer/>
      </main>
    </perfect-scrollbar>
    <div v-else ref="scroll">
      <main class="content" id="content" ref="content" >
        <Nuxt/>
        <Footer/>
      </main>
    </div>

    <!--    </div>-->

    <Sidebar v-if="profile"/>
    <Modals/>
    <transition v-if="!loaded" name="loader">
      <LoaderAnimation :modal="modalLoader"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    loaded: false,
    gamepage: false,
    modalLoader: false
  }),
  created() {
    this.setGamePage()
    this.$root.$on('scrollUpdate', () => {
      this.$refs.scroll.$el.scrollBy(0, -280)
      if (this.$refs.scroll) {
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    })
  },
  mounted() {
    if (this.$route.name === 'game-id' && window.innerWidth < 921) {
      this.$refs.content.style.position = 'fixed'
    }
    (typeof window == 'undefined') || this.loadUser()
    this.$root.$on('changeTemplate', (e) => {
      this.changeTemplate(e)
    })
    this.$root.$on('resize', () => {
      this.scrollUpdate()
    })
    this.$root.$on('setLoader', (e, modal = false) => {
      this.loaded = e
      this.modalLoader = modal
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
        if (!duration) {
          setTimeout(perf, 0)
        } else {
          console.log('%c Page load time ',
            'color: white; background-color: #95B46A',
            `${Math.trunc(duration) / 1000} s`)
        }
      }
      window.addEventListener('DOMContentLoaded', perf)
    })
  },
  methods: {
    slidePath(str) {
      return str.substring(6)
    },
    async loadUser() {
      if (localStorage.token) {
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
      if (this.$route.path.includes('/user')) {
        let userId = this.slidePath(this.$route.path)
        setTimeout(() => {
          this.$router.push('/')
          if (this.profile) {
            this.$root.$emit('toggleModal', {target: 'userProfile', user: userId})
            setTimeout(() => {
              window.history.pushState(null, null, `/user/${userId}`)
            })
          }
        }, 250)
      }

      this.loaded = true
    },
    updateData(e) {
      switch (e.event) {
        case 'chat_read':
        case 'new_message':
        case 'new_friend':
        case 'new_news':
          this.$store.dispatch('notifications/set', {
            type: 'sidebar'
          })
          if (e.event === 'new_message') this.$root.$emit('getNewMessage')
          if (e.event === 'new_friend') this.$root.$emit('getNewFriendRequest')
          break
        case 'new_notification':
          this.$store.dispatch('notifications/set', {
            type: 'header'
          })
          break
        case 'balance_changed':
          this.$store.dispatch('profile/getBalance', {
            type: 'header'
          })
          this.$root.$emit('setLoader', true)
          if (!this.modal.fromGame) {
            this.$root.$emit('toggleModal', {target: 'paymentSuccesfull'})
          }
          break
      }
    },
    changeTemplate(e) {
      this.$store.dispatch('app/setPage', e)
      if (this.$route.path != '/') {
        this.$router.push('/')
      }
      this.$refs.scroll.$el.scrollTop = 0;
    },
    scrollUpdate() {
      this.$root.$emit('scrollUpdate')
      if (this.$refs.scroll) {
        this.$refs.scroll.$el.scrollBy(0, -280)
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    },
    setGamePage() {
      this.gamepage = (this.$route.name == 'game-id') ? true : false
    }
  },
  computed: {
    isMobile() {
      if (process.client) {
        // Check if it's a mobile device
        return window?.matchMedia('(max-width: 576px)').matches;
      } else {
        return false;
      }
    },
    theme() {
      return this.$store.getters['app/theme']
    },
    page() {
      if (this.$refs.scroll) {
        this.$refs.scroll.$el.scrollBy(0, 0)
      }
      return this.$store.getters['app/page']
    },
    profile() {
      return this.$store.getters['profile/data']
    },
    modal() {
      return this.$store.getters['app/modal']
    },
  },
  watch: {
    $route(e) {
      // if(this.$route.name === 'game-id' && window.innerWidth<921){
      //   this.$refs.content.style.position = 'fixed'
      // }else {
      //   this.$refs.content.style.position = 'relative'
      // }
      this.scrollUpdate()
      this.$store.dispatch('search/toggleSearch', false)
      this.setGamePage()
      if (e.path != '/') {
        this.$store.dispatch('app/setPage', null)
      } else if (!this.page) {
        this.$store.dispatch('app/setPage', 'index')
      }
    }
  }
}
</script>
