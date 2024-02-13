<template>
<aside class="sidebar">
  <ul class="menu">
    <li v-for="(e, i) in menu" :key="i">
      <a v-if="e.type == 'link'" @click.prevent="clickLink(e.target)" :href="e.link" :class="{active: e.target == page}">
        <div class="ico"><svg-icon :name="e.ico" /></div>
        <span v-html="e.title"></span>
      </a>
      <button v-else type="button" @click="clickBtn(e.target)" :class="{active: e.target == page}" class="togglemodal">
        <div class="ico"><svg-icon :name="e.ico" /></div>
        <span v-html="e.title"></span>
        <span v-if="e.target == 'messages' && notifications.chats" v-html="notifications.chats" class="label"></span>
        <span v-if="e.target == 'friends' && notifications.friends" v-html="notifications.friends" class="label"></span>
        <span v-if="e.target == 'news' && notifications.news" v-html="notifications.news" class="label"></span>
      </button>
    </li>
  </ul>
  <ul class="games">
    <li v-for="(e, i) in recent" :key="i">
      <nuxt-link v-if="e.installed" :to="'/game/' + e.gid"><img :src="e.icon.default" :alt="e.title"></nuxt-link>
      <button v-else @click="$root.$emit('toggleModal', {target: 'gameInfo', game: e.gid})" type="button"><img :src="e.icon.default" :alt="e.title"></button>
    </li>
  </ul>
</aside>
</template>
<script>
export default {
	name: 'SidebarComponent',
  data: () => ({
    menu: [
      {title: this.$t('MENU_allgames'), target: 'index', link: '/', ico: 'sidebar/all_games', type: 'link'},
      {title: this.$t('MENU_mygames'), target: 'myGames', link: '/', ico: 'sidebar/my_games', type: 'link'},
      {title: this.$t('MENU_messages'), target: 'messages', ico: 'sidebar/messages', type: 'button'},
      {title: this.$t('MENU_friends'), target: 'friends', ico: 'sidebar/friends', type: 'button'},
      {title: this.$t('MENU_news'), target: 'news', ico: 'sidebar/news', type: 'button'}
    ]
  }),
  methods: {
    setRoute(target) {
      this.$root.$emit('changeTemplate', target)
    },
    clickLink(target) {
      this.setRoute(target)
    },
    clickBtn(target) {
      if(this.isGuest) {
        this.$root.$emit('toggleModal', { target: 'signIn' })
      } else{
        this.$root.$emit('toggleModal', { target: target })
      }
    }
  },
  computed: {
    page() {
      return this.$store.getters['app/page']
    },
    recent() {
      return this.$store.getters['games/userRecent']
    },
    notifications() {
      return this.$store.getters['notifications/sidebar']
    },
    isGuest() {
      return this.$store.getters['profile/isGuest']
    }
  }
}
</script>
