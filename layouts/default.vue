<template>
<div :class="{night: darkTheme}" class="app" :page="page">
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
</div>
</template>

<script>
export default {
	name: 'DefaultLayout',
  mounted() {
    this.loadUser()
    //this.loadSocket()
    this.$root.$on('closeModal', () => {
      this.closeModal()
    }),
    this.$root.$on('openModal', (e) => {
      this.closeModal(e)
    }),
    this.$root.$on('changeTemplate', (e) => {
      this.changeTemplate(e)
    }),
    window.addEventListener('resize', (e) => {
      this.$refs.scroll.update()
    }, true)
  },
  methods: {
    async loadUser() {
      let token = localStorage.getItem('token')
      if(token) {
        let formData = new FormData()
        formData.append('api_token', token)
        const { data } = await this.$store.dispatch('user/auth', formData)
        console.log(data)
        if(typeof data.error != 'undefined') {
          localStorage.removeItem('token')
        }
      }
    },
    loadSocket() {
      var socket = new WebSocket("wss://ws.exe.world/")
      socket.onopen = function() {
        console.log("Socket - cоединение установлено.");
      }
    },
    closeModal() {
      this.$store.dispatch('modals/setModalOpen', {
        open: false,
        target: null,
        null: null
      })
    },
    openModal(e) {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: e.target,
        data: e.data
      })
    },
    changeTemplate(e) {
      this.$store.dispatch('app/setPage', e)
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    }
  },
  computed: {
    darkTheme() {
      return this.$store.getters['user/darkTheme']
    },
    page() {
      if(typeof this.$refs.scroll != 'undefined') {
        this.$refs.scroll.$el.scrollTop = 0
      }
      return this.$store.getters['app/page']
    },
    user() {
      return this.$store.getters['user/user']
    }
  },
  watch: {
    $route() {
      this.$refs.scroll.$el.scrollTop = 0
      setTimeout(() => {
        this.$refs.scroll.update()
      }, 100)
      this.$store.dispatch('search/setOpen', false)
    }
  }
}
</script>
