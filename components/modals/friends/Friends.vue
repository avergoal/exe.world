<template>
<div class="modalinfo friendsmodal big">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Friends</div>
    <form class="search" action="">
      <fieldset>
        <svg-icon name="ui/search" />
        <input v-model="search" type="text" name="" value="" placeholder="Search friends">
      </fieldset>
    </form>
    <perfect-scrollbar ref="scroll" class="filters">
      <ul>
        <li v-for="(e, i) in filters.list" :key="i">
          <button @click="setFilter(i)" :class="{active: filters.current == i}" type="button">
            <span v-html="e"></span>
            <span v-if="i == 0 && friends.total" v-html="friends.total" class="badge"></span>
            <span v-if="i == 1 && friendsRequestIn.total" v-html="friendsRequestIn.total" class="badge"></span>
            <span v-if="i == 2 && friendsRequestOut.total" v-html="friendsRequestOut.total" class="badge"></span>
          </button>
        </li>
      </ul>
    </perfect-scrollbar>
    <perfect-scrollbar ref="scroll" class="friendsscroll">
      <div class="tabs">
        <ul v-if="friends.total" :class="{active: filters.current == 0}" class="tab">
          <li v-for="(e, i) in friends.list" :key="i" :class="{hidden: searchValues(e.user_name)}">
            <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
            <div v-html="e.user_name" class="name"></div>
            <FriendsActions :user="{id: e.uid, name: e.user_name}" />
          </li>
        </ul>
        <ul v-else :class="{active: filters.current == 0}" class="tab">
          <li class="empty">
            <div class="img">
              <img src="~/assets/illustration/friends.svg" alt="empty" class="illustration day">
              <img src="~/assets/illustration/friends_inverse.svg" alt="empty" class="illustration night">
            </div>
            <div class="text">
              <b>You don't have friends yet</b>
              <p>Use the search bar to find them</p>
            </div>
          </li>
        </ul>
        <ul v-if="friendsRequestIn.total" :class="{active: filters.current == 1}" class="tab st2">
          <li v-for="(e, i) in friendsRequestIn.list" :key="i" :class="{hidden: searchValues(e.user_name)}">
            <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
            <div v-html="e.user_name" class="name"></div>
            <div class="nav">
              <div class="item btn"><button @click="acceptRequest(e.uid)" type="button" class="btn st2">accept</button></div>
              <div class="item btn"><button @click="rejectRequest(e.uid)" type="button" class="btn st3">Reject</button></div>
            </div>
          </li>
        </ul>
        <ul v-else :class="{active: filters.current == 1}" class="tab">
          <li class="empty">
            <div class="img">
              <img src="~/assets/illustration/friends.svg" alt="empty" class="illustration day">
              <img src="~/assets/illustration/friends_inverse.svg" alt="empty" class="illustration night">
            </div>
            <div class="text">
              <b>You don't have friends yet</b>
              <p>Use the search bar to find them</p>
            </div>
          </li>
        </ul>
        <ul v-if="friendsRequestOut.total" :class="{active: filters.current == 2}" class="tab st2">
          <li v-for="(e, i) in friendsRequestOut.list" :key="i" :class="{hidden: searchValues(e.user_name)}">
            <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
            <div v-html="e.user_name" class="name"></div>
            <div class="nav">
              <div class="item"><button @click="rejectRequest(e.uid)" type="button" class="btn st3">cancel request</button></div>
            </div>
          </li>
        </ul>
        <ul v-else :class="{active: filters.current == 2}" class="tab">
          <li class="empty">
            <div class="img">
              <img src="~/assets/illustration/friends.svg" alt="empty" class="illustration day">
              <img src="~/assets/illustration/friends_inverse.svg" alt="empty" class="illustration night">
            </div>
            <div class="text">
              <b>You don't have friends yet</b>
              <p>Use the search bar to find them</p>
            </div>
          </li>
        </ul>
      </div>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>
import FriendsActions from './actions/FriendsActions'
export default {
	name: 'FriendsModalComponent',
  components: {
    FriendsActions
  },
  data: () => ({
    filters: {
      current: 0,
      list: ['All Friends', 'Friend Requests', 'My Requests']
    },
    search: null
  }),
  mounted() {
    this.loadFriends()
    this.loadFriendsRequestIn()
    this.loadFriendsRequestOut()
    this.$root.$on('rejectRequest', (e) => {
      this.rejectRequest(e)
    })
  },
  methods: {
    setFilter(e) {
      this.filters.current = e
      this.$refs.scroll.update()
    },
    searchValues(e) {
      if(e && this.search) {
        let str = e.toString().toLowerCase(),
            val = this.search.toString().toLowerCase()
        return !(str.indexOf(val) === 0)
      } else {
        return false
      }
    },
    async loadFriends() {
      this.$store.dispatch('profile/setFriends', {
        offset: 0
      })
    },
    async loadFriendsRequestIn() {
      this.$store.dispatch('profile/setFriendsRequest', {
        key: 'friendsRequestIn',
        type: 0,
        offset: 0
      })
    },
    async loadFriendsRequestOut() {
      this.$store.dispatch('profile/setFriendsRequest', {
        key: 'friendsRequestOut',
        type: 1,
        offset: 0
      })
    },
    async acceptRequest(e) {
      await this.$store.dispatch('profile/acceptRequest', {
        uid: e
      })
      this.$refs.scroll.update()
    },
    async rejectRequest(e) {
      await this.$store.dispatch('profile/rejectRequest', {
        uid: e
      })
      this.$refs.scroll.update()
    }
  },
  computed: {
    friends() {
      return this.$store.getters['profile/friends']
    },
    friendsRequestIn() {
      return this.$store.getters['profile/friendsRequestIn']
    },
    friendsRequestOut() {
      return this.$store.getters['profile/friendsRequestOut']
    }
  }
}
</script>
