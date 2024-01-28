<template>
<div class="tab blacklist">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button"><svg-icon name="ui/back" /></button>
    Blacklist
  </div>
  <form @submit.prevent action="">
    <fieldset>
      <svg-icon name="ui/search" />
      <input v-model="search" type="text" name="" value="" placeholder="Search friends">
    </fieldset>
  </form>
  <perfect-scrollbar ref="scroll">
    <ul class="list">
      <li v-for="(e, i) in blacklist" :key="i" :class="{hidden: searchValues(e.user_name)}">
        <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
        <div v-html="e.user_name" class="name"></div>
        <button @click="removeUser(e.uid)" type="button" class="btn st3">Remove from blacklist</button>
      </li>
    </ul>
  </perfect-scrollbar>
</div>
</template>

<script>
export default {
  name: 'BlacklistTab',
  data: () => ({
    search: null
  }),
  created() {
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll) {
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    })
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    searchValues(e) {
      if(e && this.search) {
        let str = e.toString().toLowerCase(),
            val = this.search.toString().toLowerCase()
        return !(str.indexOf(val) === 0)
      } else {
        return false
      }
    },
    async loadUsers() {
      await this.$store.dispatch('blacklist/load')
    },
    async removeUser(e) {
      await this.$store.dispatch('blacklist/remove', {
        uid: e
      })
    }
  },
  computed: {
    blacklist() {
      return this.$store.getters['blacklist/list']
    }
  }
}
</script>
