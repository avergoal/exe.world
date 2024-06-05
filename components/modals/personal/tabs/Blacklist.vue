<template>
  <div class="tab blacklist">
    <div class="title">
      <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button">
        <svg-icon name="ui/back"/>
      </button>
      {{ $t('Header_profile_dropdown_menu_blacklist') }}
    </div>
    <form @submit.prevent action="">
      <fieldset>
        <svg-icon name="ui/search"/>
        <input v-model="search" type="text" name="" value="" :placeholder="$t('Friends_search_input')">
      </fieldset>
    </form>
    <perfect-scrollbar ref="scroll">
      <ul class="list">
        <li v-for="e in blacklist" :key="e?.uid">
          <div class="userphoto"><img :src="e?.avatar_urls?.x100" :alt="e?.user_name"></div>
          <div v-html="e?.user_name" class="name"></div>
          <button @click="removeUser(e?.uid)" type="button" class="btn st3">{{ $t('Button_remove_blacklist') }}</button>
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'BlacklistTab',
  data: () => ({
    search: ''
  }),
  created() {
    this.$root.$on('scrollUpdate', () => {
      if (this.$refs.scroll) {
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
      if (e && this.search) {
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
      let data = Object.values(this.$store.getters['blacklist/list'])
      return data?.filter(item => {
        if(item?.user_name?.toLowerCase()?.includes(this.search?.toLowerCase())){
          return item
        }
      })

    }
  }
}
</script>
