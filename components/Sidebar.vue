<template>
<aside class="sidebar">
  <ul class="menu">
    <li v-for="(e, i) in menu" :key="i">
      <a v-if="e.type == 'link'" @click.prevent="setRoute(e.target)" :href="e.link">
        <div class="ico"><svg-icon :name="e.ico" /></div>
        <span v-html="e.title"></span>
      </a>
      <button v-else type="button" @click="$root.$emit('toggleModal', {target: e.target})" class="togglemodal">
        <div class="ico"><svg-icon :name="e.ico" /></div>
        <span v-html="e.title"></span>
      </button>
    </li>
  </ul>
  <ul class="games">
    <li v-for="(e, i) in user.recent_games" :key="i">
      <nuxt-link :to="'/g/' + e.gid">
        <img :src="e.icon.default" :alt="e.title">
      </nuxt-link>
    </li>
  </ul>
</aside>
</template>
<script>
export default {
	name: 'SidebarComponent',
  data: () => ({
    menu: [
      {title: '<i>All</i> Games', target: 'index', link: '/', ico: 'sidebar/all_games', type: 'link'},
      {title: 'My Games', target: 'myGames', link: '/', ico: 'sidebar/my_games', type: 'link'},
      {title: 'Messages', target: 'messages', ico: 'sidebar/messages', type: 'button'}, 
      {title: 'Friends', target: 'friends', ico: 'sidebar/friends', type: 'button'}, 
      {title: 'News', target: 'news', ico: 'sidebar/news', type: 'button'}
    ]
  }),
  methods: {
    setRoute(target) {
      this.$root.$emit('changeTemplate', target) 
    }
  },
  computed: {
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
