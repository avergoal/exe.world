<template>
<div class="modalinfo newsmodal big">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">News</div>
    <perfect-scrollbar ref="scroll" class="filters">
      <ul>
        <li v-for="(e, i) in filters.list" :key="i">
          <button @click="setFilter(i)" :class="{active: filters.current == i}" type="button">
            <span v-html="e"></span>
          </button>
        </li>
      </ul>
    </perfect-scrollbar>
    <perfect-scrollbar ref="scroll">
      <ul v-if="news.length" :class="{filtered: filters.current != 0}" :data-filter="(filters.current == 1) ? 'games' : 'friends'" class="news">
        <li v-for="(e, i) in news" :key="i" :class="(e.type == 1 || e.type == 2 || e.type == 3) ? 'friends' : 'games'">
          <!-- Photos -->
          <div v-if="(e.type == 1 || e.type == 2 || e.type == 3) && e.users[0]" class="userphoto">
            <img :src="e.users[0].avatar_urls.x100" :alt="e.users[0].user_name">
          </div>
          <div v-if="e.type == 4 && e.games[0]" class="img">
            <img :src="e.games[0].icon.default" :alt="e.games[0].title">
          </div>
          <!-- Info -->
          <div class="info">
            <div class="name">
              <strong v-html="e.name"></strong>
              <span v-html="'// '+$moment.unix(e.timestamp).format('DD.MM.YYYY')"></span>
            </div>
            <div v-html="e.text" class="text"></div>
            <div class="btns">
              <nuxt-link v-if="(e.type == 3 || e.type == 4) && e.button && e.games[0]" v-html="e.button" :to="'/g/' + e.games[0].gid" class="btn st2"></nuxt-link>
            </div>
          </div>
          <!-- Ext Photos -->
          <div v-if="(e.type == 1 || e.type == 3) && e.games[0]" class="img extended">
            <img :src="e.games[0].icon.default" :alt="e.games[0].title">
          </div>
          <div v-if="e.type == 2 && e.users[1]" class="userphoto extended">
            <img :src="e.users[1].avatar_urls.x100" :alt="e.users[1].user_name">
          </div>
        </li>
      </ul>
      <ul v-else class="news">
        <li class="empty">
          <div class="img">
            <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">
            <b>You have no news yet</b>
            <p>Play games, make friends, and something interesting will appear here</p>
          </div>
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>
export default {
	name: 'NewsModal',
  data: () => ({
    filters: {
      current: 0,
      list: ['All News', 'Games', 'Friends']
    }
  }),
  mounted() {
    this.loadNews()
  },
  methods: {
    async loadNews() {
      await this.$store.dispatch('app/setNews', {
        offset: 0
      })
    },
    setFilter(e) {
      this.filters.current = e
    }
  },
  computed: {
    news() {
      console.log(this.$store.getters['app/news'])
      return this.$store.getters['app/news']
    }
  }
}
</script>
