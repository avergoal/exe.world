<template>
<div class="modalinfo personalmodal bigger">
  <button @click="closeModal()" class="close" area-label="close">
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
          <input v-model="theme" type="checkbox" name="" value="" id="switcher" :checked="darkTheme">
          <label for="switcher"></label>
        </div>
      </div>
      <ul class="menu">
        <li>
          <button @click="setTab('personal')" :class="{active: modalTab == 'personal'}" type="button">
            <div class="ico"><svg-icon name="ui/personal_data" /></div>
            <span>Personal Data</span>
          </button>
        </li>
        <li>
          <button @click="setTab('access')" :class="{active: modalTab == 'access'}" type="button">
            <div class="ico"><svg-icon name="ui/access" /></div>
            <span>Access Settings</span>
          </button>
        </li>
        <li>
          <button @click="setTab('notifications')" :class="{active: modalTab == 'notifications'}" type="button">
            <div class="ico"><svg-icon name="ui/bell" /></div>
            <span>Notifications</span>
          </button>
        </li>
        <li>
          <button @click="setTab('blacklist')" :class="{active: modalTab == 'blacklist'}" type="button">
            <div class="ico"><svg-icon name="ui/blacklist" /></div>
            <span>Blacklist</span>
          </button>
        </li>
        <li>
          <button @click="setTab('wallet')" :class="{active: modalTab == 'wallet' || modalTab == 'addfunds'}" type="button">
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
      <PersonalTab v-if="modalTab == 'personal'"/>
      <AccessTab v-if="modalTab == 'access'"/>
      <NotificationsTab v-if="modalTab == 'notifications'"/>
      <BlacklistTab v-if="modalTab == 'blacklist'"/>
      <BalanceTab v-if="modalTab == 'wallet'"/>
      <AddFunds v-if="modalTab == 'addfunds'"/>
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
    theme: null
  }),
  mounted() {
    this.theme = this.darkTheme
  },
  methods: {
    setTab(target) {
      this.$store.dispatch('modals/setTab', target)
    },
    openModal(target) {
      this.$root.$emit('modalOpen', {
        open: true,
        target: target,
        message: null,
        status: null,
        tab: null
      })
    },
    closeModal() {
      this.$root.$emit('modalOpen', {
        open: false,
        target: null,
        message: null,
        status: null,
        tab: null
      })
    }
  },
  watch: {
    theme(e) {
      let formData = new FormData()
      formData.append('api_token', this.token)
      formData.append('theme', ((e) ? 1 : 0))
      this.$store.dispatch('user/setTheme', {
        data: formData,
        theme: ((e) ? true : false)
      })
    }
  },
  computed: {
    darkTheme() {
      return this.$store.getters['user/darkTheme']
    },
    user() {
      return this.$store.getters['user/user']
    },
    modalTab() {
      return this.$store.getters['modals/tab']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
