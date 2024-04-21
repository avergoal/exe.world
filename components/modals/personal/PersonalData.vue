<template>
<div :class="modal.tab + '_tab'" class="modalinfo personalmodal bigger">
  <button @click="toggleModal" class="close" area-label="close">
    <svg-icon name="ui/back" class="mobile"/>
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <aside class="info">
      <div class="profile">
        <div class="userphoto"><img :src="profile.avatar_urls.x100" alt=""></div>
        <div class="data">
          <div v-html="profile.user_name" class="name"></div>
          <div v-if="!isGuest" class="text">ID: {{profile.uid}}</div>
        </div>
        <button v-if="!isGuest" @click="$root.$emit('toggleModal', {target: 'myPhoto'})" type="button" class="edit"><svg-icon name="ui/pencil" /></button>
      </div>
      <div class="theme">
        <div class="label">
          <svg-icon name="ui/moon" />
          <span>{{ $t('Profile_dark') }}</span>
        </div>
        <div class="switcher">
          <input v-model="darkTheme" @change="switchTheme()" type="checkbox" name="" value="" id="switcher" :checked="theme">
          <label for="switcher"></label>
        </div>
      </div>
      <ul class="menu">
        <li v-if="!isGuest">
          <button @click="$root.$emit('toggleModalTab', 'personal')" :class="{active: modal.tab == 'personal'}" type="button">
            <div class="ico"><svg-icon name="ui/personal_data" /></div>
            <span>{{ $t('Header_profile_dropdown_menu_data') }}</span>
          </button>
        </li>
        <li v-if="!isGuest">
          <button @click="$root.$emit('toggleModalTab', 'access')" :class="{active: modal.tab == 'access'}" type="button">
            <div class="ico"><svg-icon name="ui/access" /></div>
            <span>{{ $t('Header_profile_dropdown_menu_access') }}</span>
          </button>
        </li>
        <li v-if="!isGuest">
          <button @click="$root.$emit('toggleModalTab', 'notifications')" :class="{active: modal.tab == 'notifications'}" type="button">
            <div class="ico"><svg-icon name="ui/bell" /></div>
            <span>{{ $t('Header_profile_dropdown_menu_notification') }}</span>
          </button>
        </li>
        <li v-if="!isGuest">
          <button @click="$root.$emit('toggleModalTab', 'blacklist')" :class="{active: modal.tab == 'blacklist'}" type="button">
            <div class="ico"><svg-icon name="ui/blacklist" /></div>
            <span>{{ $t('Header_profile_dropdown_menu_blacklist') }}</span>
          </button>
        </li>
        <li>
          <button @click="$root.$emit('toggleModalTab', 'wallet')" :class="{active: modal.tab == 'wallet' || modal.tab == 'addfunds'}" type="button">
            <div class="ico"><svg-icon name="ui/wallet" /></div>
            <span>{{ $t('Header_profile_dropdown_menu_balance') }}</span>
          </button>
        </li>
        <li class="li-logout">
          <button @click="$root.$emit('toggleModal', {target: 'logOut'})" type="button">
            <div class="ico"><svg-icon name="ui/logout" /></div>
            <span>{{ $t('Header_profile_dropdown_menu_logout') }}</span>
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
import PersonalTab from './tabs/Personal'
import AccessTab from './tabs/Access'
import NotificationsTab from './tabs/Notifications'
import BlacklistTab from './tabs/Blacklist'
import BalanceTab from './tabs/Balance'
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
      this.$store.dispatch('app/setTheme', {
        update: true,
        theme: (this.darkTheme ? 1 : 0)
      })
    },
    toggleModal() {
      this.$root.$emit('toggleModal', {})
      this.$root.$emit('setLoader', true)
    }
  },
  computed: {
    theme() {
      return this.$store.getters['app/theme']
    },
    profile() {
      return this.$store.getters['profile/data']
    },
    modal() {
      return this.$store.getters['app/modal']
    },
    isGuest() {
      return this.$store.getters['profile/isGuest']
    }
  }
}
</script>

<style scoped>
@media screen and (min-width:768px){
  .li-logout{
    margin: 148px 0 0!important;
  }
}

</style>
