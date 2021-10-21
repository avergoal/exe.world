<template>
<div class="modalinfo personalmodal bigger">
  <button @click="toggleModal(null)" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <aside class="info">
      <div class="profile">
        <div class="userphoto"><img :src="user.profile.avatar_urls.x100" alt=""></div>
        <div class="data">
          <div v-html="user.profile.user_name" class="name"></div>
          <div class="text">My profile</div>
        </div>
        <button @click="openModal('myPhoto')" type="button" class="edit"><svg-icon name="ui/pencil" /></button>
      </div>
      <div class="theme">
        <div class="label">
          <svg-icon name="ui/moon" />
          <span>Dark Theme</span>
        </div>
        <div class="switcher">
          <input v-model="darkTheme" @change="switchTheme()" type="checkbox" name="" value="" id="switcher" :checked="theme">
          <label for="switcher"></label>
        </div>
      </div>
      <ul class="menu">
        <li>
          <button @click="setTab('personal')" :class="{active: modal.tab == 'personal'}" type="button">
            <div class="ico"><svg-icon name="ui/personal_data" /></div>
            <span>Personal Data</span>
          </button>
        </li>
        <li>
          <button @click="setTab('access')" :class="{active: modal.tab == 'access'}" type="button">
            <div class="ico"><svg-icon name="ui/access" /></div>
            <span>Access Settings</span>
          </button>
        </li>
        <li>
          <button @click="setTab('notifications')" :class="{active: modal.tab == 'notifications'}" type="button">
            <div class="ico"><svg-icon name="ui/bell" /></div>
            <span>Notifications</span>
          </button>
        </li>
        <li>
          <button @click="setTab('blacklist')" :class="{active: modal.tab == 'blacklist'}" type="button">
            <div class="ico"><svg-icon name="ui/blacklist" /></div>
            <span>Blacklist</span>
          </button>
        </li>
        <li>
          <button @click="setTab('wallet')" :class="{active: modal.tab == 'wallet' || modal.tab == 'addfunds'}" type="button">
            <div class="ico"><svg-icon name="ui/wallet" /></div>
            <span>Balance</span>
          </button>
        </li>
        <li>
          <button @click="openModal('logOut')" type="button">
            <div class="ico"><svg-icon name="ui/logout" /></div>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </aside>
    <div class="tabs">
      <PersonalTab v-if="modal.tab == 'personal'"/>
      <AccessTab v-if="modal.tab == 'access'"/>
      <NotificationsTab v-if="modal.tab == 'notifications'"/>
      <BlacklistTab v-if="modal.tab == 'blacklist'"/>
      <BalanceTab v-if="modal.tab == 'wallet'"/>
      <AddFunds v-if="modal.tab == 'addfunds'"/>
    </div>
  </div>
</div>
</template>

<script>
import PersonalTab from './tabs/PersonalTab'
import AccessTab from './tabs/AccessTab'
import NotificationsTab from './tabs/NotificationsTab'
import BlacklistTab from './tabs/BlacklistTab'
import BalanceTab from './tabs/BalanceTab'
import AddFunds from './tabs/AddFunds'
export default {
	name: 'PersonalDataModal',
  components: {
    PersonalTab,
    AccessTab,
    NotificationsTab,
    BlacklistTab,
    BalanceTab,
    AddFunds
  },
  data: () => ({
    darkTheme: null
  }),
  mounted() {
    this.darkTheme = this.theme
  },
  methods: {
    switchTheme() {
      this.$store.dispatch('profile/setTheme', (this.darkTheme ? 1 : 0))
    },
    setTab(target) {
      this.$store.dispatch('app/toggleModalTab', target)
    },
    toggleModal(target) {
      this.$root.$emit('toggleModal', (target) ? {
        open: true,
        target: target
      } : {})
    }
  },
  computed: {
    theme() {
      return this.$store.getters['profile/theme']
    },
    user() {
      return this.$store.getters['profile/user']
    },
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
