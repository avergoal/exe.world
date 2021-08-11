<template>
<aside class="sidebar">
  <ul class="menu">
    <li v-for="(e, i) in menu" :key="i">
      <a v-if="e.type == 'link'" @click.prevent="setRoute(e.target)" :href="e.link">
        <div class="ico"><svg-icon :name="e.ico" /></div>
        <span v-html="e.title"></span>
      </a>
      <button v-else type="button" @click="openModal(e.target)" class="togglemodal">
        <div class="ico"><svg-icon :name="e.ico" /></div>
        <span v-html="e.title"></span>
      </button>
    </li>
  </ul>
  <ul class="games">
    <li v-for="(e, i) in myGames" :key="i">
      <nuxt-link :to="e.link"><img :src="e.img" :alt="e.alt"></nuxt-link>
    </li>
  </ul>
</aside>
</template>
<script>
export default {
	name: 'SidebarComponent',
  data() {
    return {
      menu: [{
        link: '/',
        target: '/',
        ico: 'sidebar/all_games',
        title: '<i>All</i> Games',
        type: 'link'
      }, {
        link: '/',
        target: '/mygames',
        ico: 'sidebar/my_games',
        title: 'My Games',
        type: 'link'
      }, {
        target: 'messages',
        ico: 'sidebar/messages',
        title: 'Messages',
        type: 'button'
      }, {
        target: 'friends',
        ico: 'sidebar/friends',
        title: 'Friends',
        type: 'button'
      }, {
        target: 'news',
        ico: 'sidebar/news',
        title: 'News',
        type: 'button'
      }],
      myGames: [{
        link: '/g/1',
        img: require('../assets/img/sidebar/1.jpg?webp'),
        alt: ''
      }, {
        link: '/g/1',
        img: require('../assets/img/sidebar/2.jpg?webp'),
        alt: ''
      }, {
        link: '/g/1',
        img: require('../assets/img/sidebar/3.jpg?webp'),
        alt: ''
      }, {
        link: '/g/1',
        img: require('../assets/img/sidebar/4.jpg?webp'),
        alt: ''
      }, {
        link: '/g/1',
        img: require('../assets/img/sidebar/5.jpg?webp'),
        alt: ''
      }, {
        link: '/g/1',
        img: require('../assets/img/sidebar/6.jpg?webp'),
        alt: ''
      }]
    }
  },
  methods: {
    setRoute(target) {
      if(target == '/mygames') {
        this.$store.dispatch('mainPage/setPageConfigs', 'mygames')
      } else {
        this.$store.dispatch('mainPage/setPageConfigs', 'main')
      }
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    openModal(target) {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: target
      })
    }
  }
}
</script>
