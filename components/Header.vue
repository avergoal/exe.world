<template>
  <header
    :class="{clear: !profile, 'is_guest': guestClass}"
    class="main"
  >
    <div class="logo">
      <button @click="toggleMenu('info')" class="small togglemenu" type="button">
        <svg-icon name="logo_small" />
      </button>
      <button @click="goHome()" type="button">
        <svg-icon name="logo" />
      </button>
      <div :class="{open: dropdown.info}" class="dropdown">
        <ul>
          <li class="close-cell">
            <button @click="closeDropDown()" class="close" area-label="close">
              <svg-icon name="ui/close" />
            </button>
          </li>
          <li class="title-cell"><svg-icon name="logo" /><span>© {{ getYear }} {{ $t('Footer_TEXT_copyright') }}</span></li>
          <li class="list-cell">
            <nuxt-link to="/about">{{ $t('Footer_about') }}</nuxt-link>
          </li>
          <li class="list-cell">
            <button @click="$root.$emit('toggleModal', {target: 'help'})" type="button">{{ $t('Footer_help') }}</button>
          </li>
          <li class="list-cell">
            <a href="https://dev.exe.world" target="_blank">{{ $t('Footer_developers') }}</a>
          </li>
        </ul>
      </div>
    </div>
    <nav>
      <div class="item search"><button @click="openSearch" class="opensearch btn st1" type="button">
          <svg-icon name="ui/search" />
        </button></div>
      <div v-if="profile" class="item wallet">
        <button v-if="isGuest" @click="toggleModal('signIn', null)" type="button" class="btn st1">
          <svg-icon name="ui/wallet" />
          <span v-html="profile.balance"></span>
          <div class="plus">
            <svg-icon name="ui/plus" />
          </div>
        </button>
        <button v-else @click="toggleModal('personalData', 'addfunds')" type="button" class="btn st1">
          <svg-icon name="ui/wallet" />
          <span v-html="profile.balance"></span>
          <div class="plus">
            <svg-icon name="ui/plus" />
          </div>
        </button>
      </div>
      <div v-if="profile" class="item notifications">
        <button v-if="isGuest" @click="toggleModal('signIn', null)" type="button" class="togglemenu btn st1">
          <div class="ico">
            <svg-icon name="ui/bell" />
          </div>
        </button>
        <button v-else @click="toggleMenu('notify')" type="button" class="togglemenu btn st1">
          <div class="ico">
            <svg-icon name="ui/bell" />
          </div>
          <span v-if="unreadNotifications.notifications" v-html="unreadNotifications.notifications" class="badge"></span>
        </button>
        <div :class="{open: dropdown.notify}" class="dropdown">
          <div class="subtitle">
            <span>{{ $t('Header_notifications') }}</span>
<!--            <button v-if="notifications.total" @click="clearNotifications()" type="button">-->
<!--              <svg-icon name="ui/list" />-->
<!--            </button>-->
          </div>
          <ul v-if="notifications.total" class="notify">
            <li v-for="(e, i) in notifications.list" :key="i">
              <nuxt-link v-if="e.game && e.game.installed" :to="'/game/' + e.game.gid" :class="{active: e.unread}">
                <div class="img"><img :src="e.icon.default" alt=""></div>
                <div class="info"><span v-html="e.text"></span></div>
              </nuxt-link>
              <button v-else-if="e.game" @click="toggleModal('gameInfo', e.game.gid)" :class="{active: e.unread}"
                type="button">
                <div class="img"><img :src="e.icon.default" alt=""></div>
                <div class="info"><span v-html="e.text"></span></div>
              </button>
              <button v-else :class="{active: e.unread}" type="button">
                <div class="img"><img :src="e.icon.default" alt=""></div>
                <div class="info"><span v-html="e.text"></span></div>
              </button>
            </li>
          </ul>
          <div v-else class="notifyempty">
            <div class="img">
              <img v-if="theme" src="~/assets/illustration/notifications_inverse.svg" alt="" class="illustration">
              <img v-else src="~/assets/illustration/notifications.svg" alt="" class="illustration">
            </div>
            <div class="text">{{ $t('Header_notifications_text') }}</div>
          </div>
        </div>
      </div>
      <div v-if="profile" class="item account">
        <button v-if="isGuest" @click="toggleModal('signIn', null)" type="button" class="togglemenu_guest_desk btn st1">
          <div class="photo">
            <img :src="profile.avatar_urls?.x100" :alt="profile.user_name">
          </div>
          <span v-html="profile.user_name"></span>
        </button>
        <button v-else @click="toggleMenu('profile')" type="button" class="togglemenu btn st1">
          <div class="photo"><img :src="profile.avatar_urls?.x100" :alt="profile.user_name"></div>
          <span v-html="profile.user_name"></span>
          <svg-icon name="ui/user_settings" />
        </button>
        <div :class="{open: dropdown.profile}" class="dropdown">
          <ul class="menu">
            <li v-for="(e, i) in userMenu" :key="i">
              <button @click="toggleModal('personalData', e.tab)" type="button">
                <div class="ico">
                  <svg-icon :name="e.ico" />
                </div>
                <span v-html="$t(e.title)"></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="item signin">
        <button @click="toggleModal('signIn', null)" type="button" class="btn st3">
          <span>Log in</span>
          <svg-icon name="ui/personal_data" />
        </button>
        <button @click="toggleModal('signUp', null)" type="button" class="btn st2">
          <span>Sign up</span>
          <svg-icon name="ui/access" />
        </button>
      </div>
    </nav>
    <Search :class="{open: search}" @toggle="toggleMenu" />
  </header>
</template>
<script>
export default {
	name: 'HeaderComponent',
  data: () => ({
    dropdown: {
      info: false,
      notify: false,
      profile: false
    },
    userMenu: [
      {title: 'Header_profile_dropdown_menu_data', tab: 'personal', ico: 'ui/personal_data'},
      {title: 'Header_profile_dropdown_menu_access', tab: 'access', ico: 'ui/access'},
      {title: 'Header_profile_dropdown_menu_notification', tab: 'notifications', ico: 'ui/bell'},
      {title: 'Header_profile_dropdown_menu_blacklist', tab: 'blacklist', ico: 'ui/blacklist'},
      {title: 'Header_profile_dropdown_menu_balance', tab: 'wallet', ico: 'ui/wallet'},
      {title: 'Header_profile_dropdown_menu_logout', tab: 'logOut', ico: 'ui/logout'}
    ],
    guestClass: false
  }),
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.dropdown') && !e.target.closest('.togglemenu')) {
        this.closeDropDown()
      }
    })
  },
  methods: {
    toggleMenu(e) {
      this.$store.dispatch('search/toggleSearch', false)
      if(window.matchMedia('(max-width: 768px)').matches && e == 'profile') {
        this.toggleModal('personalData', 'mobile')
      } else if(this.dropdown[e]) {
        this.dropdown[e] = false
      } else {
        this.closeDropDown()
        this.dropdown[e] = true
        if(e === 'notify'){
          this.$store.dispatch('notifications/set', {type:'header'})
        }
      }
    },
    goHome() {
      this.$store.dispatch('app/setPage', 'index')
      this.$route.path == '/' || this.$router.push('/')
    },
    openSearch() {
      this.$store.dispatch('search/toggleSearch', true)
    },
    toggleModal(target, tab) {
      this.closeDropDown()
      this.$root.$emit('toggleModal', (tab == 'logOut') ? {
        target: tab
      } : {
        target: target,
        tab: tab,
        game: tab
      })
    },
    async clearNotifications() {
      await this.$store.dispatch('notifications/clear')
    },
    async closeDropDown() {
      if(this.dropdown.notify && this.unreadNotifications.notifications){
        await this.clearNotifications()
        await this.$store.dispatch('notifications/set', {type:'sidebar'})
      }
      this.dropdown = {
        info: false,
        notify: false,
        profile: false
      }
    }
  },
  computed: {
    search() {
      return this.$store.getters['search/open']
    },
    profile() {
      return this.$store.getters['profile/data']
    },
    notifications() {
      return this.$store.getters['notifications/header']
    },
    unreadNotifications() {
      return this.$store.getters['notifications/sidebar']
    },
    theme() {
      return this.$store.getters['app/theme']
    },
    isGuest() {
      this.guestClass = this.$store.getters['profile/isGuest']
      return this.guestClass
    },
    getYear() {
      return new Date().getFullYear();
    }
  },
  watch: {
    $route() {
      this.closeDropDown()
    }
  }
}
</script>
