<template>
  <div class="modalinfo usersmodal bigger">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/back" class="mobile"/>
      <svg-icon name="ui/close"/>
    </button>
    <div v-if="profile" class="modalcontent">
      <perfect-scrollbar class="mainscroll" ref="mainscroll">
        <aside class="info">
          <div class="topinfo">
            <div class="userphoto"><img :src="profile.user.avatar_urls.x100" :alt="profile.user.user_name"></div>
            <div class="username">
              <div v-html="profile.user.user_name" class="name"></div>
              <div v-if="profile.blacklist_status === 1" class="online">blacklisted</div>
              <div v-else :class="{on: profile.user.online}" v-html="(profile.user.online ? 'Online' : 'Offline')"
                   class="online"></div>
            </div>
          </div>
          <div v-if="profile.blacklist_status !== 2" class="total">
            <div class="item">
              <svg-icon name="sidebar/all_games"/>
              <span>{{ $tc('Userpage_text_games', profile.games_count) }}</span>
            </div>
            <div class="item">
              <svg-icon name="sidebar/friends"/>
              <span>{{ $tc('Userpage_text_friends',profile.friends_count) }}</span>
            </div>
          </div>
          <div v-if="profile.blacklist_status !== 2" class="btns">
            <div class="btnbox">
              <button v-if="profile.friendship_status === 0 && !request" @click="addFriends(profile.user.uid)"
                      class="toggleparams2 btn st2" type="button">{{ $t('Button_add_friend') }}
              </button>
              <button v-else-if="request || profile.friendship_status === 1 || profile.friendship_status === 2"
                      class="toggleparams2 btn st3" type="button">{{ $t('Button_request_friend') }}
              </button>
              <button v-else @click="toggleParams('openParams2')" class="toggleparams2 btn st3" type="button">your
                friend
              </button>
              <button v-if="!profile.blacklist_status"
                      @click="$root.$emit('toggleModal', {target: 'messagesChat', user: profile.user.uid})"
                      class="icon btn st2" type="button">
                <svg-icon name="ui/pencil"/>
              </button>
              <button v-else class="icon btn st3" type="button">
                <svg-icon name="ui/pencil"/>
              </button>
            </div>
            <div :class="{open: openParams2}" class="dropdown params2">
              <ul class="menu">
                <li class="mobile">
                  <span v-html="profile.user.user_name"></span>
                  <button @click="toggleParams('openParams2')" class="close" area-label="close">
                    <svg-icon name="ui/close"/>
                  </button>
                </li>
                <li>
                  <button @click="$root.$emit('toggleModal', {target: 'friendsRemove', user:{uid: profile.user.uid, name: profile.user.user_name}})"
                          type="button">
                    <div class="ico">
                      <svg-icon name="ui/user_remove"/>
                    </div>
                    <span>{{$t('Friends_user_dropdown_menu_remove')}}</span>
                  </button>
                </li>
                <li>
                  <button type="button">
                    <div class="ico">
                      <svg-icon name="ui/news_hide"/>
                    </div>
                    <span>{{$t('Button_hidenews_dropdown')}}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <ul v-if="profile.blacklist_status !== 2" class="more">
            <li>
              <div class="label">{{ $t('Userpage_text_age') }}</div>
              <div v-if="profile.user.age.day !=='00' && profile.user.age.month !=='00' && profile.user.age.year !=='00'" v-html="getAge().age + ' years old'" class="desc"></div>
            </li>
            <li>
              <div class="label">{{ $t('Userpage_text_dateofbirth') }}</div>
              <div v-if="profile.user.age.day !=='00' && profile.user.age.month !=='00' && profile.user.age.year !=='00'" v-html="getAge().birthday" class="desc"></div>
            </li>
            <li>
              <div class="label">{{ $t('Userpage_text_location') }}</div>
              <div class="desc">
                {{ profile.user.location.country }}
                {{ (profile.user.location.city) ? (', ' + profile.user.location.city) : '' }}
              </div>
            </li>
          </ul>
          <div v-if="profile.blacklist_status !== 2" class="floatparams">
            <button @click="toggleParams('openParams1')" type="button" class="toggleparams1">
              <svg-icon name="ui/dotted"/>
            </button>
            <div :class="{open: openParams1}" class="dropdown params1">
              <ul class="menu">
                <li class="mobile">
                  <span v-html="profile.user.user_name"></span>
                  <button @click="toggleParams('openParams1')" class="close" area-label="close">
                    <svg-icon name="ui/close"/>
                  </button>
                </li>
                <li>
                  <button @click="$root.$emit('toggleModal', {target: 'userBlock', user:{uid: profile.user.uid, name: profile.user.user_name}})" type="button">
                    <div class="ico">
                      <svg-icon name="ui/blacklist"/>
                    </div>
                    <span>{{ $t('Userpage_dropdown_menu_block') }}</span>
                  </button>
                </li>
                <li>
                  <button @click="$root.$emit('toggleModal', {target: 'userReport', user: profile.user})" type="button">
                    <div class="ico">
                      <svg-icon name="ui/report"/>
                    </div>
                    <span>{{ $t('Userpage_dropdown_menu_report') }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <div class="interest">
          <perfect-scrollbar v-if="profile.blacklist_status !== 2" ref="scroll">
            <div
              v-if="profile && (profile.games.games.length || profile.friends.users.length || profile.mutual_friends.users.length)"
              class="swipers">
              <GamesSwiper v-if="profile && profile.games.games.length" slides="user_profile_games" between="16"
                           title="Games" tab="userProfileGames" slideClass="m"/>
              <UsersSwiper v-if="profile && profile.friends.users" slides="user_profile_friends" between="8"
                           title="Friends" tab="userProfileFriends"/>
              <UsersSwiper v-if="profile && profile.mutual_friends.users.length" slides="user_profile_mutual_friends"
                           between="8" title="Mutual friends" tab="userProfileMutualFriends"/>
            </div>
            <div v-else class="notdata">
              <div class="img">
                <img v-if="theme" src="~/assets/illustration/signin_inverse.svg"/>
                <img v-else src="~/assets/illustration/signin.svg"/>
              </div>
              <div class="desc">{{ $t('Userpage_empty_text') }}</div>
            </div>
          </perfect-scrollbar>
          <div v-else class="blocked">
            {{ $t('Userpage_blacklisted_text') }}
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
    if (!this.listeners.updateUserProfileFromProfile) {
      this.$store.commit('app/registerListener', {event: 'updateUserProfileFromProfile', handler: true});
      this.$root.$on('updateUserProfile', (e) => {
        this.reloadProfile(e)
      })
      this.loadProfile()


    }
    this.$root.$emit('toggleModal', {target: 'userProfile', updateUserProfileRegistered: true})
  },
  destroyed() {
    if(this.$route.path.includes('/user')){
      window.history.pushState(null, null, '/')
    }else {
      window.history.pushState(null, null, this.$route.path)
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.params1') && !e.target.closest('.toggleparams1')) {
        this.openParams1 = false
      }
      if (!e.target.closest('.params2') && !e.target.closest('.toggleparams2')) {
        this.openParams2 = false
      }
    })
  },
  methods: {
    async loadProfile() {
      window.history.pushState(null, null, `/user/${this.modal.user}`)
      await this.$store.dispatch('users/load', {uid: this.modal.user})
    },
    async reloadProfile(e) {
      window.history.pushState(null, null, `/user/${e}`)
      await this.$store.dispatch('users/load', {uid: e})
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
    listeners() {
      return this.$store.getters['app/listeners']
    },
    profile() {
      let profile = this.$store.getters['users/profile']
      if (profile) {
        profile = JSON.parse(JSON.stringify(profile))
        let age = profile.user.birth_date.match(/(\d{4})(\d{2})(\d{2})/)
        profile.user.age = {
          year: age[1],
          month: age[2],
          day: age[3]
        }
        let interval = setInterval(() => {
          if (this.$refs.scroll) {
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
