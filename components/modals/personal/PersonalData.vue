<template>
<div class="modalinfo personalmodal bigger">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <aside class="info">
      <div class="profile">
        <div class="userphoto"><img :src="profile.photo" alt=""></div>
        <div class="data">
          <div v-html="profile.name" class="name"></div>
          <div class="text">My profile</div>
        </div>
        <button @click="$parent.openModal('myPhoto')" type="button" class="edit"><svg-icon name="ui/pencil" /></button>
      </div>
      <div class="theme">
        <div class="label">
          <svg-icon name="ui/moon" />
          <span>Dark Theme</span>
        </div>
        <div class="switcher">
          <input v-model="theme" type="checkbox" name="" value="" id="switcher">
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
          <button @click="$parent.openModal('logOut')" type="button">
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
  data() {
    return {
      theme: this.appTheme
    }
  },
  methods: {
    setTab(target) {
      this.$store.dispatch('modals/setTab', target)
    }
  },
  watch: {
    theme(e) {
      this.$store.dispatch('app/setAppTheme', ((e) ? 'night' : 'day'))
    }
  },
  computed: {
    appTheme() {
      return this.$store.getters['app/appTheme']
    },
    profile() {
      return this.$store.getters['app/profile']
    },
    modalTab() {
      return this.$store.getters['modals/modalTab']
    }
  }
}
</script>
