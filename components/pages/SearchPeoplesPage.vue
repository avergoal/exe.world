<template>
<div class="index_page">
  <div class="categoriesbox">
    <div class="searchform">
      <fieldset>
        <svg-icon class="search" name="ui/search" />
        <input v-model="query" @input="goSearch()" type="text" name="" value="" placeholder="Search games">
      </fieldset>
      <div class="btns">
        <button @click="$root.$emit('changeTemplate', 'searchCategories')" type="button">games</button>
        <button class="active" type="button">people</button>
      </div>
    </div>
    <div v-html="pagetitle" class="pagetitle small"></div>
    <ul v-if="results.peoples.length" class="peoples_list">
      <li v-for="(e, i) in results.peoples" :key="i">
        <button @click="openUser(e.uid)" type="button">
          <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
          <div class="name" v-html="e.user_name"></div>
        </button>
      </li>
    </ul>
  </div>
  <div v-if="!results.peoples.length" class="noresults page">
    <div class="img">
      <img v-if="theme" src="~/assets/illustration/notfound_inverse.svg" />
      <img v-else src="~/assets/illustration/notfound.svg" />
    </div>
    <div class="text">
      <b>We did not find anything for your request</b>
      <p>Try changing your search text</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchPeoplesPageComponent',
  data: () => ({
    pagetitle: '',
    query: ''
  }),
  mounted() {
    this.pagetitle = this.results.peoples.length + ' peoples found'
    this.query = this.results.query
  },
  methods: {
    goSearch() {
      if(this.query.length >= 3) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(async () => {
          await this.$store.dispatch('search/goSearch', {
            query: this.query,
            offset: 0,
            limit: 24
          })
          this.pagetitle = this.results.peoples.length + ' peoples found'
        }, 350)
      }
    },
    openUser(e) {
      if(!this.profile) {
        this.$root.$emit('toggleModal', {target: 'signIn'})
      } else if(this.profile.uid === e) {
        this.$root.$emit('toggleModal', {target: 'personalData', tab: 'personal'})
      } else {
        this.$root.$emit('updateUserProfile', e)
      }
    }
  },
  computed: {
    results() {
      return this.$store.getters['search/results']
    },
    profile() {
      return this.$store.getters['profile/data']
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
