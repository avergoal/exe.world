<template>
<div class="modalinfo usersmodal bigger">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <aside class="info">
      <div class="topinfo">
        <div class="userphoto"><img :src="friendProfile.photo" alt=""></div>
        <div class="username">
          <div v-html="friendProfile.name" class="name"></div>
          <div :class="{on: friendProfile.online}" v-html="(friendProfile.online ? 'Online' : 'Offline')" class="online"></div>
        </div>
      </div>
      <div class="total">
        <div class="item">
          <svg-icon name="sidebar/all_games" />
          <span><i v-html="friendProfile.games"></i> games</span>
        </div>
        <div class="item">
          <svg-icon name="sidebar/friends" />
          <span><i v-html="friendProfile.friends"></i> friends</span>
        </div>
      </div>
      <div class="btns">
        <button @click="toggleParams('openParams2')" class="toggleparams2 btn st2" type="button">add to friends</button>
        <button class="icon btn st2" type="button"><svg-icon name="ui/pencil" /></button>
        <div :class="{open: openParams2}" class="dropdown params2">
          <ul class="menu">
            <li>
              <button type="button">
                <div class="ico"><svg-icon name="ui/user_remove" /></div>
                <span>Remove from friends</span>
              </button>
            </li>
            <li>
              <button type="button">
                <div class="ico"><svg-icon name="ui/news_hide" /></div>
                <span>Hide news</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ul class="more">
        <li>
          <div class="label">Age</div>
          <div v-html="friendProfile.age" class="desc"></div>
        </li>
        <li>
          <div class="label">Date of Birth</div>
          <div v-html="friendProfile.birth" class="desc"></div>
        </li>
        <li>
          <div class="label">Location</div>
          <div v-html="friendProfile.location" class="desc"></div>
        </li>
      </ul>
      <div class="floatparams">
        <button @click="toggleParams('openParams1')" type="button" class="toggleparams1"><svg-icon name="ui/dotted" /></button>
        <div :class="{open: openParams1}" class="dropdown params1">
          <ul class="menu">
            <li>
              <button @click="$parent.openModal('friendsBlock')" type="button">
                <div class="ico"><svg-icon name="ui/blacklist" /></div>
                <span>Block User</span>
              </button>
            </li>
            <li>
              <button @click="$parent.openModal('friendsReport')" type="button">
                <div class="ico"><svg-icon name="ui/report" /></div>
                <span>Report</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="interest">
      <perfect-scrollbar ref="scroll" :options="{suppressScrollX: true}">
        <div class="swipers">
          <GamesSwiper :slides="friendProfile.gamesList" between="16" title="Games" target="userProfileGames" slideClass="m"/>
          <UsersSwiper :slides="friendProfile.friendsList" between="8" title="Friends" target="userProfileFriends"/>
          <UsersSwiper :slides="friendProfile.mutualList" between="8" title="Mutual friends" target="userProfileFriends"/>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProfileModal',
  data() {
    return{
      openParams1: false,
      openParams2: false
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.params1') && !e.target.closest('.toggleparams1')) {
        this.openParams1 = false
      }
      if(!e.target.closest('.params2') && !e.target.closest('.toggleparams2')) {
        this.openParams2 = false
      }
    })
    this.$root.$on('changeProfileModals', (target) => {
      this.$parent.openModal(target)
    })
  },
  methods: {
    toggleParams(target) {
      this[target] = !this[target]
    }
  },
  computed: {
    friendProfile() {
      return this.$store.getters['app/friendProfile']
    }
  }
}
</script>
