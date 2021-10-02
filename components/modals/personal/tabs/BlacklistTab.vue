<template>
<div class="tab blacklist">
  <div class="title">Blacklist</div>
  <form action="">
    <fieldset>
      <svg-icon name="ui/search" />
      <input type="text" name="" value="" placeholder="Search friends">
    </fieldset>
  </form>
  <perfect-scrollbar ref="scroll">
    <ul class="list">
      <li v-for="(e, i) in list" :key="i">
        <div class="userphoto"><img :src="e.img" :alt="e.name"></div>
        <div v-html="e.name" class="name"></div>
        <button type="button" class="btn st3">Remove from blacklist</button>
      </li>
    </ul>
  </perfect-scrollbar>
</div>
</template>

<script>
export default {
  name: 'BlacklistTab',
  data: () => ({
    query: '',
    list: []
  }),
  created() {
    this.loadUsers()
  },
  methods: {
    loadUsers() {
      let formData = new FormData()
      formData.append('api_token', this.token)
      this.$store.dispatch('user/setBlackList', formData)
    }
  },
  computed: {
    users() {
      return this.$store.getters['user/blackList']
    },
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
