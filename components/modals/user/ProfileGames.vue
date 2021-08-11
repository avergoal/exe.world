<template>
<div class="modalinfo usersmodal games bigger">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent gamesbox">
    <div class="usermodaltop">
      <button @click="$parent.openModal('userProfile')" type="button"><svg-icon name="ui/back" /></button>
      <div class="userphoto"><img :src="friendProfile.photo" alt=""></div>
      <div class="info">
        <div v-html="friendProfile.name" class="name"></div>
        <div :class="{active: friendProfile.online}" class="online"><span></span> Online</div>
      </div>
    </div>
    <div class="games">
      <div class="titlelist">Games <strong v-html="'• '+friendProfile.games"></strong></div>
      <perfect-scrollbar ref="scroll">
        <ul class="list">
          <li v-for="(e, i) in friendProfile.gamesList" :key="i" class="gamecard s">
            <div class="box">
              <div class="img">
                <img :src="e.img" :alt="e.title">
                <nuxt-link :to="e.link"><svg-icon name="ui/play" /><span>play</span></nuxt-link>
              </div>
              <div class="info">
                <div v-html="e.title" class="title"></div>
                <div v-html="e.desc" class="desc"></div>
              </div>
            </div>
          </li>
        </ul>
      </perfect-scrollbar>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProfileGamesModal',
  computed: {
    friendProfile() {
      return this.$store.getters['app/friendProfile']
    }
  }
}
</script>
