<template>
<div class="modalinfo newsmodal big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">{{$t('News')}}</div>
    <perfect-scrollbar ref="scroll" class="filters">
      <ul>
        <li v-for="(e, i) in filters.list" :key="i">
          <button @click="setFilter(i)" :class="{active: filters.current == i}" type="button">
            <span v-html="$t(e)"></span>
          </button>
        </li>
      </ul>
    </perfect-scrollbar>
    <perfect-scrollbar ref="scroll_list" class="list">
      <template v-if="!waiting">
      <ul v-if="news.length" class="news">
        <li v-for="(e, i) in news" :key="i">
          <!-- Photos -->
          <button v-if="(e.type == 1 || e.type == 2 || e.type == 3) && e.users[0]" @click="openUser(e.users[0].uid)" type="button" class="userphoto">
            <img :src="e.users[0].avatar_urls.x100" :alt="e.users[0].user_name">
          </button>
          <nuxt-link v-if="e.type == 4 && e.games[0] && e.games[0].installed" :to="'/game/' + e.games[0].gid" class="img">
            <img :src="e.games[0].icon.default" :alt="e.games[0].title">
          </nuxt-link>
          <button v-else-if="e.type == 4 && e.games[0]" @click="$root.$emit('toggleModal', {target: 'gameInfo', game: e.games[0].gid})" type="button" class="img">
            <img :src="e.games[0].icon.default" :alt="e.games[0].title">
          </button>
          <!-- Info -->
          <div class="info">
            <div class="name">
              <strong v-if="e.name" v-html="e.name"></strong>
              <span v-html="'// '+$moment.unix(e.timestamp).format('DD.MM.YYYY')"></span>
            </div>
            <div v-html="e.text" class="text"></div>
            <div v-if="(e.type == 3 || e.type == 4) && e.button && e.games[0]" class="btns">
              <nuxt-link v-html="e.button" :to="'/game/' + e.games[0].gid" class="btn st2"></nuxt-link>
            </div>
          </div>
          <!-- Ext Photos -->
          <nuxt-link v-if="(e.type == 1 || e.type == 3) && e.games[0] && e.games[0].installed" :to="'/game/' + e.games[0].gid" class="img extended">
            <img :src="e.games[0].icon.default" :alt="e.games[0].title">
          </nuxt-link>
          <button v-else-if="(e.type == 1 || e.type == 3) && e.games[0]" @click="$root.$emit('toggleModal', {target: 'gameInfo', game: e.games[0].gid})" type="button" class="img extended">
            <img :src="e.games[0].icon.default" :alt="e.games[0].title">
          </button>
          <button v-if="e.type == 2 && e.users[1] && e.users[1].gid != profile.gid" @click="openUser(e.users[1].uid)" type="button" class="userphoto extended">
            <img :src="e.users[1].avatar_urls.x100" :alt="e.users[1].user_name">
          </button>
          <button v-else-if="e.type == 2 && e.users[1]" @click="openUser(e.users[1].uid)" type="button" class="userphoto extended">
            <img :src="e.users[1].avatar_urls.x100" :alt="e.users[1].user_name">
          </button>
        </li>
        <Observer @intersect="intersected"/>
      </ul>
      <ul v-else class="news">
        <li class="empty">
          <div class="img">
            <img v-if="theme" src="~/assets/illustration/notfound_inverse.svg" />
            <img v-else src="~/assets/illustration/notfound.svg" />
          </div>
          <div class="text">
            <b>{{ $t('News_no_news_allnews_text_1') }}</b>
            <p>{{ $t('News_no_news_allnews_text_2') }}</p>
          </div>
        </li>
      </ul>
      </template>
      <div v-else class="waiting">
        <img src="~/assets/loader-svg.svg" alt="">
      </div>
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
      list: ['Button_news_all', 'Button_news_friends', 'Button_news_games']
    },
    offset: 0,
    waiting: true,
  }),
  created() {
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll_list) {
        setTimeout(() => {
          this.$refs.scroll_list.update()
        }, 100)
      }
    })
  },
  async mounted() {
    await this.loadNews({offset: this.offset})
    this.waiting = false
  },
  methods: {
    openUser(id){
      if(id !== this.profile.uid){
        this.$root.$emit('toggleModal', {target: 'userProfile'})
        this.$root.$emit('updateUserProfile', id)
      }else {
        this.$root.$emit('toggleModal', {target: 'personalData', tab: 'personal'})
      }

    },
    async loadNews(params) {
      await this.$store.dispatch('app/setNews', params)
      this.$refs.scroll_list.$el.scrollTop = 0
      this.$store.dispatch('notifications/set', {
        type: 'sidebar'
      })
    },
    async setFilter(e) {
      let params = {
        offset: 0
      }
      if(e > 0) {
        params.type = e
      }
      this.loadNews(params)
      this.filters.current = e
    },
    async intersected() {
      this.offset += 20
      let params = {
        offset: this.offset,
        intersect: true
      }
      if(this.filters.current) {
        params.type = this.filters.current
      }
      await this.$store.dispatch('app/setNews', params)
    }
  },
  computed: {
    news() {
      return this.$store.getters['app/news']
    },
    profile() {
      return this.$store.getters['profile/data']
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  },
  watch: {
    $route() {
      this.$root.$emit('toggleModal', {})
    }
  }
}
</script>
