<template>
<header :class="{clear: !userAuth}" class="main">
  <a @click.prevent="setRoute()" href="/" class="logo">
    <svg-icon name="logo_small" class="small"/>
    <svg-icon name="logo" />
  </a>
  <nav>
    <div class="item search"><button @click="openSearch" class="opensearch btn st1" type="button"><svg-icon name="ui/search" /></button></div>
    <div v-if="userAuth" class="item wallet">
      <button type="button" class="btn st1">
        <svg-icon name="ui/wallet" />
        <span v-html="account.balance"></span>
        <div class="plus"><svg-icon name="ui/plus" /></div>
      </button>
    </div>
    <div v-if="userAuth" class="item notifications">
      <button @click="toggleMenu('notify')" type="button" class="togglemenu btn st1">
        <div class="ico"><svg-icon name="ui/bell" /></div>
        <span v-html="notify.total" class="badge">5</span>
      </button>
      <div v-if="notify.total" :class="{open: notify.open}" class="dropdown">
        <div class="subtitle">
          <span>Notifications</span>
          <svg-icon name="ui/list" />
        </div>
        <ul class="notify">
          <li v-for="(e, i) in notify.list" :key="i">
            <button :class="{active: i === 0}" type="button">
              <div class="img"><img :src="e.img" :alt="e.title"></div>
              <div class="info">
                <span v-html="e.title"></span>
                <span v-html="e.type"></span>
              </div>
            </button>
          </li>
        </ul>
        <div class="notifyempty">
          <div class="img">
            <img src="~/assets/illustration/notifications.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/notifications_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">There are no notifications here yet</div>
        </div>
      </div>
    </div>
    <div v-if="userAuth" class="item account">
      <button @click="toggleMenu('account')" type="button" class="togglemenu btn st1">
        <div class="photo"><img :src="account.photo" :alt="account.username"></div>
        <span v-html="account.username"></span>
        <svg-icon name="ui/user_settings" />
      </button>
      <div :class="{open: account.open}" class="dropdown">
        <ul class="menu">
          <li v-for="(e, i) in account.list" :key="i">
            <button @click="openModal('personalData', e.tab)" type="button">
              <div class="ico"><svg-icon :name="e.ico" /></div>
              <span v-html="e.title"></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!userAuth" class="item signin">
      <button @click="openModal('signIn', null)" type="button" class="btn st1">
        <svg-icon name="ui/personal_data" />
        <span>Sign in</span>
      </button>
    </div>
  </nav>
  <Search :class="{open: searchOpen}"/>
</header>
</template>
<script>
export default {
	name: 'HeaderComponent',
  data() {
    return {
      notify: {
        title: 'Notifications',
        total: 5,
        open: false,
        list: [{
          img: require('../assets/img/header/1.jpg?webp'),
          title: 'A new game "Perfect Fantasy" has been released.',
          type: 'Join us.'
        }, {
          img: require('../assets/img/header/2.jpg?webp'),
          title: 'Update in the game "Homeland"',
          type: 'Added new levels.'
        }, {
          img: require('../assets/img/header/3.jpg?webp'),
          title: 'Update in the game "Music Wars"',
          type: 'Added new tracks.'
        }, {
          img: require('../assets/img/header/4.jpg?webp'),
          title: 'Update in the game "Imperial Hero II"',
          type: 'Added new levels.'
        }, {
          img: require('../assets/img/header/5.jpg?webp'),
          title: 'A new game "Knigt’s Wars" has been released.',
          type: 'Join us.'
        }]
      },
      account: {
        username: 'Alex Smith',
        balance: '$150',
        photo: require('../assets/img/header/user.png'),
        open: false,
        list: [{
          tab: 'personal',
          ico: 'ui/personal_data',
          title: 'Personal Data'
        }, {
          tab: 'access',
          ico: 'ui/access',
          title: 'Access Settings'
        }, {
          tab: 'notifications',
          ico: 'ui/bell',
          title: 'Notifications'
        }, {
          tab: 'blacklist',
          ico: 'ui/blacklist',
          title: 'Blacklist'
        }, {
          tab: 'wallet',
          ico: 'ui/wallet',
          title: 'Balance'
        }, {
          tab: 'logOut',
          ico: 'ui/logout',
          title: 'Log Out'
        }]
      }
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.dropdown') && !e.target.closest('.togglemenu')) {
        this.notify.open = false
        this.account.open = false
      }
      if(this.searchOpen && !e.target.closest('.searchbox') && !e.target.closest('.opensearch')) {
        this.$store.dispatch('search/setSearchOpen', false)
      }
    })
  },
  methods: {
    toggleMenu(e) {
      this[((e == 'notify') ? 'account' : 'notify')].open = false
      this[e].open = !this[e].open
    },
    setRoute() {
      this.$store.dispatch('mainPage/setPageConfigs', 'main')
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    openSearch() {
      this.$store.dispatch('search/setSearchOpen', true)
    },
    openModal(target, tab) {
      this.account.open = false
      if(tab == 'logOut') {
        this.toggleAuth(tab)
      } else {
        this.$store.dispatch('modals/setModalOpen', {
          open: true,
          target: target,
          tab: tab
        })
      }
    },
    toggleAuth(target) {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: target
      })
    }
  },
  computed: {
    appTheme() {
      return this.$store.getters['app/appTheme']
    },
    searchOpen() {
      return this.$store.getters['search/searchOpen']
    },
    userAuth() {
      return this.$store.getters['app/userAuth']
    },
    profile() {
      return this.$store.getters['app/profile']
    }
  }
}
</script>
