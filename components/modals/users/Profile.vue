<template>
<div class="modalinfo usersmodal bigger">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/back" class="mobile"/>
    <svg-icon name="ui/close" />
  </button>
  <div v-if="profile" class="modalcontent">
    <perfect-scrollbar class="mainscroll" ref="mainscroll">
      <aside class="info">
        <div class="topinfo">
          <div class="userphoto"><img :src="profile.user.avatar_urls.x100" :alt="profile.user.user_name"></div>
          <div class="username">
            <div v-html="profile.user.user_name" class="name"></div>
            <div v-if="profile.blacklist_status === 1" class="online">blacklisted</div>
            <div v-else :class="{on: profile.user.online}" v-html="(profile.user.online ? 'Online' : 'Offline')" class="online"></div>
          </div>
        </div>
        <div v-if="profile.blacklist_status !== 2" class="total">
          <div class="item">
            <svg-icon name="sidebar/all_games" />
            <span><i v-html="profile.games_count"></i> games</span>
          </div>
          <div class="item">
            <svg-icon name="sidebar/friends" />
            <span><i v-html="profile.friends_count"></i> friends</span>
          </div>
        </div>
        <div v-if="profile.blacklist_status !== 2" class="btns">
          <div class="btnbox">
            <button v-if="profile.friendship_status === 0 && !request" @click="addFriends(profile.user.uid)" class="toggleparams2 btn st2" type="button">add to friends</button>
            <button v-else-if="request || profile.friendship_status === 1 || profile.friendship_status === 2" class="toggleparams2 btn st3" type="button">request...</button>
            <button v-else @click="toggleParams('openParams2')" class="toggleparams2 btn st3" type="button">your friend</button>
            <button v-if="!profile.blacklist_status" @click="$root.$emit('toggleModal', {target: 'messagesChat', user: profile.user.uid})" class="icon btn st2" type="button"><svg-icon name="ui/pencil" /></button>
            <button v-else class="icon btn st3" type="button"><svg-icon name="ui/pencil" /></button>
          </div>
          <div :class="{open: openParams2}" class="dropdown params2">
            <ul class="menu">
              <li class="mobile">
                <span v-html="profile.user.user_name"></span>
                <button @click="toggleParams('openParams2')" class="close" area-label="close">
                  <svg-icon name="ui/close" />
                </button>
              </li>
              <li>
                <button @click="$root.$emit('toggleModal', {target: 'friendsRemove', user: profile.user})" type="button">
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
        <ul v-if="profile.blacklist_status !== 2" class="more">
          <li>
            <div class="label">Age</div>
            <div v-html="getAge().age + ' years old'" class="desc"></div>
          </li>
          <li>
            <div class="label">Date of Birth</div>
            <div v-html="getAge().birthday" class="desc"></div>
          </li>
          <li>
            <div class="label">Location</div>
            <div class="desc">
              {{ profile.user.location.country }}
              {{ (profile.user.location.city) ? (', ' + profile.user.location.city) : ''}}
            </div>
          </li>
        </ul>
        <div v-if="profile.blacklist_status !== 2" class="floatparams">
          <button @click="toggleParams('openParams1')" type="button" class="toggleparams1"><svg-icon name="ui/dotted" /></button>
          <div :class="{open: openParams1}" class="dropdown params1">
            <ul class="menu">
              <li class="mobile">
                <span v-html="profile.user.user_name"></span>
                <button @click="toggleParams('openParams1')" class="close" area-label="close">
                  <svg-icon name="ui/close" />
                </button>
              </li>
              <li>
                <button @click="$root.$emit('toggleModal', {target: 'userBlock', user: profile.user})" type="button">
                  <div class="ico"><svg-icon name="ui/blacklist" /></div>
                  <span>Block User</span>
                </button>
              </li>
              <li>
                <button @click="$root.$emit('toggleModal', {target: 'userReport', user: profile.user})" type="button">
                  <div class="ico"><svg-icon name="ui/report" /></div>
                  <span>Report</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div class="interest">
        <perfect-scrollbar v-if="profile.blacklist_status !== 2" ref="scroll">
          <div v-if="profile && (profile.games.games.length || profile.friends.users.length || profile.mutual_friends.users.length)" class="swipers">
            <GamesSwiper v-if="profile && profile.games.games.length" slides="user_profile_games" between="16" title="Games" tab="userProfileGames" slideClass="m"/>
            <UsersSwiper v-if="profile && profile.friends.users.length" slides="user_profile_friends" between="8" title="Friends" tab="userProfileFriends"/>
            <UsersSwiper v-if="profile && profile.mutual_friends.users.length" slides="user_profile_mutual_friends" between="8" title="Mutual friends" tab="userProfileMutualFriends"/>
          </div>
          <div v-else class="notdata">
            <div class="img">
              <img v-if="theme" src="~/assets/illustration/signin_inverse.svg" />
              <img v-else src="~/assets/illustration/signin.svg" />
            </div>
            <div class="desc">You don't have friends and games yet. Use the search bar to find them.</div>
          </div>
        </perfect-scrollbar>
        <div v-else class="blocked">
          Пользователь добавил Вас в черный список
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>
/*
0 - не друзья,
1 - получен запрос,
2 - отправлен запрос,
3 - взаимная дружба
*/
export default {
  name: 'ProfileModal',
  data: () => ({
    openParams1: false,
    openParams2: false,
    request: false
  }),
  created() {
    this.loadProfile()
    this.$root.$on('updateUserProfile', (e) => {
      this.reloadProfile(e)
    })
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
  },
  methods: {
    async loadProfile() {
      this.$store.dispatch('users/load', {uid: this.modal.user})
    },
    async reloadProfile(e) {
      this.$store.dispatch('users/load', { uid: e })
    },
    async addFriends(e) {
      await this.$store.dispatch('friends/add', {uid: this.modal.user})
      this.request = true
    },
    toggleParams(target) {
      this[target] = !this[target]
    },
    getAge() {
      let date = new Date(),
          today = new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          birthDate = new Date(this.profile.user.age.year, this.profile.user.age.month, this.profile.user.age.day),
          birthDateNow = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()),
          out = {
            birthday: this.profile.user.age.day + '.' + this.profile.user.age.month + '.' + this.profile.user.age.year,
            age: today.getFullYear() - birthDate.getFullYear()
          }
      if (today < birthDateNow) {
        out.age = out.age - 1
      }
      return out
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    },
    profile() {
      let profile = this.$store.getters['users/profile']
      if(profile) {
        profile = Object.assign({}, profile)
        let age = profile.user.birth_date.match(/(\d{4})(\d{2})(\d{2})/)
        profile.user.age = {
          year: age[1],
          month: age[2],
          day: age[3]
        }
        let interval = setInterval(() => {
          if(this.$refs.scroll) {
            clearInterval(interval)
            this.$refs.scroll.update()
          }
        }, 100)
        profile.user.id = profile.user.uid
      }
      return profile
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
