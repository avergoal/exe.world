<template>
<div class="modalinfo usersmodal bigger">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <aside class="info">
      <div v-if="profile" class="topinfo">
        <div class="userphoto"><img :src="profile.user.avatar_urls.x100" :alt="profile.user.user_name"></div>
        <div class="username">
          <div v-html="profile.user.user_name" class="name"></div>
          <div :class="{on: profile.user.online}" v-html="(profile.user.online ? 'Online' : 'Offline')" class="online"></div>
        </div>
      </div>
      <div v-if="profile" class="total">
        <div class="item">
          <svg-icon name="sidebar/all_games" />
          <span><i v-html="profile.games_count"></i> games</span>
        </div>
        <div class="item">
          <svg-icon name="sidebar/friends" />
          <span><i v-html="profile.friends_count"></i> friends</span>
        </div>
      </div>
      <div v-if="profile" class="btns">
        <div v-if="profile.friendship_status" class="btnbox">
          <button class="toggleparams2 btn st3" @click="toggleParams('openParams2')" type="button">your friend</button>
          <button class="icon btn st2" type="button"><svg-icon name="ui/pencil" /></button>
        </div>        
        <button v-else @click="addFriends(profile.user.uid)" class="toggleparams2 btn st2" type="button">add to friends</button>
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
      <ul v-if="profile" class="more">
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
      <div v-if="profile" class="floatparams">
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
          <GamesSwiper v-if="profile && profile.games.games.length" slides="user_profile_games" between="16" title="Games" target="userProfileGames" slideClass="m"/>
          <UsersSwiper v-if="profile && profile.friends.users.length" slides="user_profile_friends" between="8" title="Friends" target="userProfileFriends"/>
          <UsersSwiper v-if="profile && profile.mutual_friends.users.length" slides="user_profile_mutual_friends" between="8" title="Mutual friends" target="userProfileFriends"/>
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
      openParams2: false,
      friendProfile: {}
    }
  },
  created() {
    let formData = new FormData()
    formData.append('api_token', this.token)
    formData.append('uid', this.userId)
    this.$store.dispatch('users/getProfile', formData)
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
    async addFriends(e) {
      let formData = new FormData()
      formData.append('api_token', this.token)
      formData.append('uid', this.userId)
      await this.$store.dispatch('users/addFriends', formData)
    },
    toggleParams(target) {
      this[target] = !this[target]
    }
  },
  computed: {
    userId() {
      return this.$store.getters['modals/tab']
    },
    profile() {
      console.log(this.$store.getters['users/profile'])
      return this.$store.getters['users/profile']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
