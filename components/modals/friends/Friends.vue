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
        <input type="text" name="" value="" placeholder="Search friends">
      </fieldset>
    </form>
    <Filters v-if="filters" :filters="filters"/>
    <perfect-scrollbar ref="scroll" class="friendsscroll">
      <div class="tabs">
        <ul :class="{active: filter == 0}" class="tab">
          <li v-for="(e, i) in userFriends" :key="i">
            <div class="userphoto"><img :src="e.photo" :alt="e.name"></div>
            <div v-html="e.name" class="name"></div>
            <FriendsActions />
          </li>
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
        <ul :class="{active: filter == 1}" class="tab st2">
          <li v-for="(e, i) in userFriendsRequests" :key="i">
            <div class="userphoto"><img :src="e.photo" :alt="e.name"></div>
            <div v-html="e.name" class="name"></div>
            <div class="nav">
              <div class="item btn"><button type="button" class="btn st2">accept</button></div>
              <div class="item btn"><button type="button" class="btn st3">Reject</button></div>
            </div>
          </li>
        </ul>
        <ul :class="{active: filter == 2}" class="tab st2">
          <li v-for="(e, i) in userFriendsMyRequests" :key="i">
            <div class="userphoto"><img :src="e.photo" :alt="e.name"></div>
            <div v-html="e.name" class="name"></div>
            <div class="nav">
              <div class="item"><button type="button" class="btn st3">cancel request</button></div>
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
	name: 'FriendsModal',
  components: {
    FriendsActions
  },
  data() {
    return{
      filters: [{
        text: 'All Friends',
        value: null,
        badge: null
      }, {
        text: 'Friend Requests',
        value: null,
        badge: 2
      }, {
        text: 'My Requests',
        value: null,
        badge: null
      }],
      filter: 0
    }
  },
  mounted() {
    this.$root.$on('toggleFilters', (target) => {
      this.filter = target
    })
    this.$root.$on('openFriendsModal', (target) => {
      this.$parent.openModal(target)
    })
  },
  computed: {
    userFriends() {
      let friends = this.$store.getters['app/userFriends']
      for(let e in friends) {
        if(typeof friends[e] == 'object') {
          friends[e].paramsOpen = false
        }
      }
      return friends
    },
    userFriendsRequests() {
      return this.$store.getters['app/userFriendsRequests']
    },
    userFriendsMyRequests() {
      return this.$store.getters['app/userFriendsMyRequests']
    }
  }
}
</script>
