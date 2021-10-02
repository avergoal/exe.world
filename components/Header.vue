<template>
<header :class="{clear: !user}" class="main">
  <a @click.prevent="setRoute()" href="/" class="logo">
    <svg-icon name="logo_small" class="small"/>
    <svg-icon name="logo" />
  </a>
  <nav>
    <div class="item search"><button @click="openSearch" class="opensearch btn st1" type="button"><svg-icon name="ui/search" /></button></div>
    <div v-if="user" class="item wallet">
      <button @click="openModal('personalData', 'wallet')" type="button" class="btn st1">
        <svg-icon name="ui/wallet" />
        <span v-html="user.balance"></span>
        <div class="plus"><svg-icon name="ui/plus" /></div>
      </button>
    </div>
    <div v-if="user" class="item notifications">
      <button @click="toggleMenu('notify')" type="button" class="togglemenu btn st1">
        <div class="ico"><svg-icon name="ui/bell" /></div>
        <span v-if="user.notifications.news" v-html="user.notifications.news" class="badge">5</span>
      </button>
      <div :class="{open: dropdown.notify}" class="dropdown">
        <div class="subtitle">
          <span>Notifications</span>
          <svg-icon v-if="user.notifications.news" name="ui/list" />
        </div>
        <ul v-if="user.notifications.news" class="notify">
          <li v-for="(e, i) in notify" :key="i">
            <button :class="{active: i === 0}" type="button">
              <div class="img"><img :src="e.img" :alt="e.title"></div>
              <div class="info">
                <span v-html="e.title"></span>
                <span v-html="e.type"></span>
              </div>
            </button>
          </li>
        </ul>
        <div v-else class="notifyempty">
          <div class="img">
            <img src="~/assets/illustration/notifications.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/notifications_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">There are no notifications here yet</div>
        </div>
      </div>
    </div>
    <div v-if="user" class="item account">
      <button @click="toggleMenu('profile')" type="button" class="togglemenu btn st1">
        <div class="photo"><img :src="user.profile.avatar_urls.x100" :alt="user.profile.user_name"></div>
        <span v-html="user.profile.username"></span>
        <svg-icon name="ui/user_settings" />
      </button>
      <div :class="{open: dropdown.profile}" class="dropdown">
        <ul class="menu">
          <li v-for="(e, i) in userMenu" :key="i">
            <button @click="openModal('personalData', e.tab)" type="button">
              <div class="ico"><svg-icon :name="e.ico" /></div>
              <span v-html="e.title"></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!user" class="item signin">
      <button @click="openModal('signIn', null)" type="button" class="btn st1">
        <svg-icon name="ui/personal_data" />
        <span>Sign in</span>
      </button>
    </div>
  </nav>
  <Search :class="{open: sOpen}"/>
</header>
</template>
<script>
export default {
	name: 'HeaderComponent',
  data: () => ({
    dropdown: {
      notify: false,
      profile: false
    },
    userMenu: [
      {title: 'Personal Data', tab: 'personal', ico: 'ui/personal_data'}, 
      {title: 'Access Settings', tab: 'access', ico: 'ui/access'}, 
      {title: 'Notifications', tab: 'notifications', ico: 'ui/bell'}, 
      {title: 'Blacklist', tab: 'blacklist', ico: 'ui/blacklist'}, 
      {title: 'Balance', tab: 'wallet', ico: 'ui/wallet'}, 
      {title: 'Log Out', tab: 'logOut', ico: 'ui/logout'}
    ]
  }),
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.dropdown') && !e.target.closest('.togglemenu')) {
        this.dropdown = {
          notify: false,
          profile: false
        }
      }
      if(this.sOpen && !e.target.closest('.searchbox') && !e.target.closest('.opensearch')) {
        this.$store.dispatch('search/setOpen', false)
      }
    })
  },
  methods: {
    toggleMenu(e) {
      this.dropdown = {
        notify: false,
        profile: false
      }
      this.dropdown[e] = true
    },
    setRoute() {
      this.$store.dispatch('app/setPage', 'index')
      this.$route.path == '/' || this.$router.push('/')
    },
    openSearch() {
      this.$store.dispatch('search/setOpen', true)
    },
    openModal(target, tab) {
      this.dropdown.profile = false
      let data = {}
      if(tab == 'logOut') {
        data = {
          open: true,
          target: tab,
          message: null,
          status: false,
          tab: null
        }
      } else {
        data = {
          open: true,
          target: target,
          message: null,
          status: false,
          tab: tab
        }
      }
      this.$root.$emit('modalOpen', data)
    }
  },
  computed: {
    sOpen() {
      return this.$store.getters['search/open']
    },
    user() {
      return this.$store.getters['user/user']
    },
    notify() {
      return this.$store.getters['user/notify']
    }
  }
}
</script>
