<template>
<div class="modalinfo usersmodal games bigger">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent gamesbox">
    <div class="usermodaltop">
      <button @click="$root.$emit('toggleModal', {target: 'userProfile', user: profile.user.uid})" type="button"><svg-icon name="ui/back" /></button>
      <div class="userphoto"><img :src="profile.user.avatar_urls.x250" alt=""></div>
      <div class="info">
        <div v-html="profile.user.user_name" class="name"></div>
        <div :class="{active: profile.user.online}" class="online"><span></span> {{ (profile.user.online) ? 'Online' : 'Offline' }}</div>
      </div>
    </div>
    <div class="games">
      <div class="titlelist">{{ $t('Userpage_games_inside') }} <strong v-html="'• '+profile.games_count"></strong></div>
      <perfect-scrollbar ref="scroll">
        <ul class="list">
          <li v-for="(e, i) in profile.games.games" :key="i" class="gamecard s">
            <div class="box">
              <div class="img">
                <img v-lazy="e.poster.default" :alt="e.title">
<!--                <button v-if="!user" @click="$root.$emit('toggleModal', {target: 'signIn'})" type="button"><svg-icon name="ui/play"/><span>play</span></button>-->
                <button v-if="e.installed" @click="openGame(e.gid)"><svg-icon name="ui/play"/><span>play</span></button>
                <button v-else @click="$root.$emit('toggleModal', {target: 'gameInfo', game: e.gid})" type="button"><svg-icon name="ui/play"/><span>play</span></button>
              </div>
              <div class="info">
                <div v-html="e.title" class="title"></div>
                <div v-html="e.type.title" class="desc" :style="'color:#' + e.type.color"></div>
              </div>
            </div>
          </li>
          <Observer @intersect="intersected"/>
        </ul>
      </perfect-scrollbar>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProfileGamesModal',
  methods:{
    async intersected() {
      await this.$store.dispatch('users/loadGames')
    },
    openGame(id) {
      this.$root.$emit('toggleModal', {})
      this.$router.push({
        path: '/game/' + id
      })
    },
  },
  computed: {
    profile() {
      return this.$store.getters['users/profile']
    },
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
