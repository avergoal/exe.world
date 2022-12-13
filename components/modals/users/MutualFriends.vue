<template>
<div class="modalinfo usersmodal friends bigger">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent friendsbox">
    <div class="usermodaltop">
      <button @click="$root.$emit('toggleModal', {target: 'userProfile', user: profile.user.uid})" type="button"><svg-icon name="ui/back" /></button>
      <div class="userphoto"><img :src="profile.user.avatar_urls.x250" alt=""></div>
      <div class="info">
        <div v-html="profile.user.user_name" class="name"></div>
        <div :class="{active: profile.user.online}" class="online"><span></span> {{ (profile.user.online) ? 'Online' : 'Offline' }}</div>
      </div>
    </div>
    <div class="friends">
      <div class="titlelist">Mutual friends <strong v-html="'• '+profile.mutual_friends_count"></strong></div>
      <perfect-scrollbar ref="scroll">
        <ul class="list">
          <li v-for="(e, i) in profile.mutual_friends.users" :key="i">
            <button @click="openUser(e.uid)" type="button">
              <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
              <div class="name" v-html="e.user_name"></div>
            </button>
          </li>
        </ul>
      </perfect-scrollbar>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProfileMutualFriendsModal',
  created() {
    this.$root.$on('updateUserProfile', (e) => {
      this.$root.$emit('toggleModal', { target: 'userProfile', user: e })
    })
  },
  methods: {
    openUser(e) {
      if(this.user.profile.uid === e) {
        this.$root.$emit('toggleModal', {target: 'personalData', tab: 'personal'})
      } else {
        this.$root.$emit('updateUserProfile', e)
      }
    }
  },
  computed: {
    profile() {
      console.log(this.$store.getters['users/profile'])
      return this.$store.getters['users/profile']
    },
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
