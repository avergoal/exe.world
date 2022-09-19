<template>
<div class="modalinfo friendsmodal big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">
      <span>Friends</span>
      <button @click="openSearch = (activeSearch) ? !openSearch : false" :class="{disabled: !activeSearch}" type="button"><svg-icon name="ui/search" /></button>
    </div>
    <div :class="{open: openSearch, hidden: !activeSearch}" class="searchchat">
      <form @submit.prevent class="search" action="">
        <fieldset>
          <svg-icon name="ui/search" />
          <input v-model="query" @input="search()" :disabled="!activeSearch" type="text" name="" value="" placeholder="Search friends">
        </fieldset>
        <button @click="openSearch = false" type="button"><svg-icon name="ui/close" /></button>
      </form>
    </div>
    <perfect-scrollbar ref="scroll" class="filters">
      <ul>
        <li v-for="(e, i) in filters" :key="i">
          <button @click="setFilter(i)" :class="{active: currentFilter == i}" type="button">
            <span v-html="e"></span>
            <span v-if="i == 0 && friendsTotal" v-html="friendsTotal" class="badge"></span>
            <span v-if="i == 1 && requests.total.subscribers" v-html="requests.total.subscribers" class="badge"></span>
            <span v-if="i == 2 && requests.total.subscriptions" v-html="requests.total.subscriptions" class="badge"></span>
          </button>
        </li>
      </ul>
    </perfect-scrollbar>
    <perfect-scrollbar ref="scroll_list" :class="{small: openSearch}" class="friendsscroll">
      <div class="tabs">
        <ul v-if="friendsList.length" :class="{active: currentFilter == 0}" class="tab">
          <li v-for="(e, i) in friendsList" :key="i">
            <button @click="$root.$emit('toggleModal', {target: 'userProfile', user: e.uid})" type="button" class="userphoto">
              <img :src="e.avatar_urls.x100" :alt="e.user_name">
            </button>
            <div v-html="e.user_name" class="name"></div>
            <FriendsActions :user="{uid: e.uid, name: e.user_name}" />
          </li>
          <Observer @intersect="intersected"/>
          <li :class="{loaded: !loader}" class="loader"><img src="/theme/img/loader.gif" alt=""></li>
        </ul>
        <ul v-else :class="{active: currentFilter == 0}" class="tab">
          <li class="empty">
            <div class="img">
              <img v-if="theme" src="~/assets/illustration/friends_inverse.svg" />
              <img v-else src="~/assets/illustration/friends.svg" />
            </div>
            <div class="text">
              <b>You don't have friends yet</b>
              <p>Use the search bar to find them</p>
            </div>
          </li>
        </ul>
        <ul v-if="requests.total.subscribers" :class="{active: currentFilter == 1}" class="tab st2">
          <li v-for="(e, i) in requests.list.subscribers" :key="i">
            <button @click="$root.$emit('toggleModal', {target: 'userProfile', user: e.uid})" type="button" class="userphoto">
              <img :src="e.avatar_urls.x100" :alt="e.user_name">
            </button>
            <div v-html="e.user_name" class="name"></div>
            <div class="nav">
              <div class="item btn"><button @click="add(e.uid)" type="button" class="btn st2">accept</button></div>
              <div class="item btn"><button @click="remove(e.uid)" type="button" class="btn st3">Reject</button></div>
            </div>
          </li>
          <Observer @intersect="intersected"/>
          <li :class="{loaded: !loader}" class="loader"><img src="/theme/img/loader.gif" alt=""></li>
        </ul>
        <ul v-else :class="{active: currentFilter == 1}" class="tab">
          <li class="empty">
            <div class="img">
              <img v-if="theme" src="~/assets/illustration/friends_inverse.svg" />
              <img v-else src="~/assets/illustration/friends.svg" />
            </div>
            <div class="text">
              <b>You don't have friend requests yet</b>
              <p>Use the search bar to find them</p>
            </div>
          </li>
        </ul>
        <ul v-if="requests.total.subscriptions" :class="{active: currentFilter == 2}" class="tab st2">
          <li v-for="(e, i) in requests.list.subscriptions" :key="i">
            <button @click="$root.$emit('toggleModal', {target: 'userProfile', user: e.uid})" type="button" class="userphoto">
              <img :src="e.avatar_urls.x100" :alt="e.user_name">
            </button>
            <div v-html="e.user_name" class="name"></div>
            <div class="nav">
              <div class="item"><button @click="remove(e.uid)" type="button" class="btn st3">cancel request</button></div>
            </div>
          </li>
          <Observer @intersect="intersected"/>
          <li :class="{loaded: !loader}" class="loader"><img src="/theme/img/loader.gif" alt=""></li>
        </ul>
        <ul v-else :class="{active: currentFilter == 2}" class="tab">
          <li class="empty">
            <div class="img">
              <img v-if="theme" src="~/assets/illustration/friends_inverse.svg" />
              <img v-else src="~/assets/illustration/friends.svg" />
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
import FriendsActions from './Actions'
export default {
	name: 'FriendsModalComponent',
  components: {FriendsActions},
  data: () => ({
    openSearch: false,
    activeSearch: true,
    currentFilter: 0,
    loaded: {0: false, 1: false},
    query: null,
    loader: false,
    offset: 0
  }),
  created() {
    this.$store.dispatch('friends/load', {offset: this.offset})
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll_list) {
        setTimeout(() => {
          this.$refs.scroll_list.update()
        }, 100)
      }
    })
    this.$root.$on('getNewFriendRequest', () => {
      this.offset = 0
      this.$store.dispatch('friends/load', {offset: this.offset})
      this.$store.dispatch('friends/requests', {
        type: this.currentFilter - 1,
        offset: this.offset
      })
    })
  },
  methods: {
    async setFilter(e) {
      if(!this.loader) {
        this.currentFilter = e
        if(this.currentFilter && !this.loaded[this.currentFilter - 1]) {
          this.offset = 0
          await this.$store.dispatch('friends/requests', {
            type: this.currentFilter - 1,
            offset: this.offset
          })
          this.loaded[this.currentFilter - 1] = true
        }
        this.$refs.scroll_list.$el.scrollTop = 0
      }
    },
    async search() {
      this.loader = true
      this.offset = 0
      if(this.query) {
        await this.$store.dispatch('friends/search', {
          type: 'friends',
          query: this.query,
          offset: this.offset
        })
      } else {
        await this.$store.dispatch('friends/load', {offset: this.offset})
      }
      this.loader = false
    },
    async add(e) {
      this.loader = true
      this.offset = 0
      await this.$store.dispatch('friends/add', {uid: e})
      await this.$store.dispatch('friends/update', {offset: this.offset})
      this.$refs.scroll_list.$el.scrollTop = 0
      this.$store.dispatch('notifications/set', {
        type: 'sidebar'
      })
      this.loader = false
    },
    async remove(e) {
      this.loader = true
      await this.$store.dispatch('friends/remove', {uid: e})
      await this.$store.dispatch('friends/update', {uid: e})
      this.$refs.scroll_list.$el.scrollTop = 0
      this.$store.dispatch('notifications/set', {
        type: 'sidebar'
      })
      this.loader = false
    },
    async intersected() {
      this.offset += 20
      if(this.currentFilter) {
        let check = false
        if(this.currentFilter === 1 && this.requests.total.subscribers > this.offset) {
          check = true
        } else if(this.requests.total.subscriptions > this.offset) {
          check = true
        }
        if(check) {
          this.$store.dispatch('friends/requests', {
            type: this.currentFilter - 1,
            offset: this.offset
          })
        }
      } else if(this.openSearch && this.query) {
        this.$store.dispatch('friends/search', {
          type: 'friends',
          query: this.query,
          offset: this.offset
        })
      } else if(this.friendsTotal > this.offset) {
        this.$store.dispatch('friends/load', {offset: this.offset})
      }
    }
  },
  computed: {
    friendsList() {
      return this.$store.getters['friends/list']
    },
    friendsTotal() {
      return this.$store.getters['friends/total']
    },
    filters() {
      return this.$store.getters['friends/filters']
    },
    requests() {
      return this.$store.getters['friends/requests']
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  },
  watch: {
    openSearch(e) {
      if(!e) {
        this.query = null
        this.offset = 0
        this.$store.dispatch('friends/load', {offset: this.offset})
      }
      this.$refs.scroll_list.$el.scrollTop = 0
    }/* ,
    currentFilter(e) {
      this.activeSearch = (e > 0) ? false : true
    } */
  }
}
</script>
