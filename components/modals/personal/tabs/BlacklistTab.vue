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
    async loadUsers() {
      await this.$store.dispatch('profile/setBlackList')
    }
  },
  computed: {
    users() {
      return this.$store.getters['profile/blackList']
    }
  }
}
</script>
