<template>
<div class="modalinfo usersmodal friends bigger">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent friendsbox">
    <div class="usermodaltop">
      <button @click="$parent.openModal('userProfile')" type="button"><svg-icon name="ui/back" /></button>
      <div class="userphoto"><img :src="friendProfile.photo" alt=""></div>
      <div class="info">
        <div v-html="friendProfile.name" class="name"></div>
        <div :class="{active: friendProfile.online}" class="online"><span></span> Online</div>
      </div>
    </div>
    <div class="friends">
      <div class="titlelist">Friends <strong v-html="'• '+friendProfile.games"></strong></div>
      <perfect-scrollbar ref="scroll">
        <ul class="list">
          <li v-for="(e, i) in friendProfile.friendsList" :key="i">
            <button type="button">
              <div class="userphoto"><img :src="e.img" :alt="e.name"></div>
              <div class="name" v-html="e.name"></div>
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
  name: 'ProfileFriendsModal',
  computed: {
    friendProfile() {
      return this.$store.getters['app/friendProfile']
    }
  }
}
</script>
