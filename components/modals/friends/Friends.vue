<template>
<div class="modalinfo friendsmodal big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Friends</div>
    <form @submit.prevent class="search" action="">
      <fieldset>
        <svg-icon name="ui/search" />
        <input v-model="search" type="text" name="" value="" placeholder="Search friends">
      </fieldset>
    </form>
    <perfect-scrollbar ref="scroll" class="filters">
      <ul>
        <li v-for="(e, i) in filters" :key="i">
          <button @click="setFilter(i)" :class="{active: currentFilter == i}" type="button">
            <span v-html="e"></span>
            <span v-if="i == 1 && requests.total.subscribers" v-html="requests.total.subscribers" class="badge"></span>
            <span v-if="i == 2 && requests.total.subscriptions" v-html="requests.total.subscriptions" class="badge"></span>
          </button>
        </li>
      </ul>
    </perfect-scrollbar>
    <perfect-scrollbar ref="scroll_list" class="friendsscroll">
      <div class="tabs">
        <ul v-if="friends.length" :class="{active: currentFilter == 0}" class="tab">
          <li v-for="(e, i) in friends" :key="i" :class="{hidden: searchValues(e.user_name)}">
            <button @click="toggleModal('userProfile', e.uid)" type="button" class="userphoto">
              <img :src="e.avatar_urls.x100" :alt="e.user_name">
            </button>
            <div v-html="e.user_name" class="name"></div>
            <FriendsActions :user="{id: e.uid, name: e.user_name}" />
          </li>
          <Observer @intersect="intersected"/>
        </ul>
        <ul v-else :class="{active: currentFilter == 0}" class="tab">
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
        <ul v-if="requests.total.subscribers" :class="{active: currentFilter == 1}" class="tab st2">
          <li v-for="(e, i) in requests.list.subscribers" :key="i" :class="{hidden: searchValues(e.user_name)}">
            <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
            <div v-html="e.user_name" class="name"></div>
            <div class="nav">
              <div class="item btn"><button @click="add(e.uid)" type="button" class="btn st2">accept</button></div>
              <div class="item btn"><button @click="remove(e.uid)" type="button" class="btn st3">Reject</button></div>
            </div>
          </li>
          <Observer @intersect="intersected"/>
        </ul>
        <ul v-else :class="{active: currentFilter == 1}" class="tab">
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
        <ul v-if="requests.total.subscriptions" :class="{active: currentFilter == 2}" class="tab st2">
          <li v-for="(e, i) in requests.list.subscriptions" :key="i" :class="{hidden: searchValues(e.user_name)}">
            <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
            <div v-html="e.user_name" class="name"></div>
            <div class="nav">
              <div class="item"><button @click="remove(e.uid)" type="button" class="btn st3">cancel request</button></div>
            </div>
          </li>
          <Observer @intersect="intersected"/>
        </ul>
        <ul v-else :class="{active: currentFilter == 2}" class="tab">
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
  components: {FriendsActions},
  data: () => ({
    currentFilter: 0,
    loaded: {0: false, 1: false},
    search: null
  }),
  created() {
    this.$store.dispatch('friends/load', {offset: 0})
  },
  methods: {
    async setFilter(e) {
      this.currentFilter = e
      if(this.currentFilter && !this.loaded[this.currentFilter - 1]) {
        await this.$store.dispatch('friends/requests', {
          type: this.currentFilter - 1,
          offset: 0
        })
        this.loaded[this.currentFilter - 1] = true
      }
      this.$refs.scroll_list.$el.scrollTop = 0
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
    async add(e) {
      await this.$store.dispatch('friends/add', {uid: e})
      await this.$store.dispatch('friends/update', {uid: e})
      this.$refs.scroll_list.$el.scrollTop = 0
    },
    async remove(e) {
      await this.$store.dispatch('friends/remove', {uid: e})
      await this.$store.dispatch('friends/update', {uid: e})
      this.$refs.scroll_list.$el.scrollTop = 0
    },
    async intersected() {
      console.log('Friends intersected')
    },
    toggleModal(target, e) {
      this.$root.$emit('toggleModal', {
        target: target,
        game: e,
        user: e
      })
    }
  },
  computed: {
    friends() {
      return this.$store.getters['friends/list']
    },
    filters() {
      return this.$store.getters['friends/filters']
    },
    requests() {
      return this.$store.getters['friends/requests']
    }
  }
}
</script>
