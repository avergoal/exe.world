<template>

  <div :class="{night: theme, gamepage: gamepage}" class="app" :page="page">
    <Header />
    <!--    <div class="ps appscroll" :class="{clear: !profile}">-->
    <perfect-scrollbar ref="scroll" class="appscroll" :class="{clear: !profile}">

      <main class="content" id="content" ref="content">
        <Nuxt />
        <Footer />
      </main>
    </perfect-scrollbar>

    <!--    </div>-->

    <Sidebar v-if="profile" />
    <Modals />
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

    const noscript = document.createElement('noscript');
    const div = document.createElement('div');
    const img = document.createElement('img');

    // Set attributes for the img element
    img.setAttribute('src', 'https://mc.yandex.ru/watch/95926948');
    img.setAttribute('style', 'position:absolute; left:-9999px;');
    img.setAttribute('alt', '');

    // Append the img element to the div
    div.appendChild(img);

    // Append the div to the noscript element
    noscript.appendChild(div);

    // Append the noscript element to the document body
    document.body.appendChild(noscript);
  },
  methods: {
    slidePath(str) {
      return str.substring(6)
    },
    async loadUser() {
      if (localStorage.token) {
        await this.$store.dispatch('auth/auth', localStorage.token)
        await this.setLange()
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
    },
    async setLange(){
      if(this.$i18n.locale != this.settings.locale) {
        const response = await this.$store.dispatch('app/getTranslation',{lang:this.settings.locale});
        const translations = response.response;
        this.$i18n.setLocaleMessage(this.settings.locale,translations)
        this.$i18n.setLocale(this.settings.locale)
      }
    }
  },
  computed: {
    theme() {
      return this.$store.getters['app/theme']
    },
    settings() {
      return this.$store.getters['settings/main']
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
    },
    settings(){
      this.setLange()
    }
  }
}
</script>
