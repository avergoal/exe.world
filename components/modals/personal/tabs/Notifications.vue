<template>
<div class="tab notifications">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button"><svg-icon name="ui/back" /></button>
    Notifications
  </div>
  <perfect-scrollbar ref="scroll_tab">
    <form @submit.prevent action="">
      <div class="label">Newsletter by e-mail</div>
      <ul>
        <li>
          <input v-model="model.news" :checked="model.news" type="checkbox" name="" value="" id="n1">
          <label for="n1">
            <span>Send service news</span>
            <svg-icon name="ui/checkbox" />
          </label>
        </li>
        <li>
          <input v-model="model.friends" :checked="model.friends" type="checkbox" name="" value="" id="n2">
          <label for="n2">
            <span>Send notifications from friends</span>
            <svg-icon name="ui/checkbox" />
          </label>
        </li>
        <li>
          <input v-model="model.games" :checked="model.games" type="checkbox" name="" value="" id="n3">
          <label for="n3">
            <span>Send notifications from my games</span>
            <svg-icon name="ui/checkbox" />
          </label>
        </li>
        <li>
          <input v-model="model.friends_messages" :checked="model.friends_messages" type="checkbox" name="" value="" id="n4">
          <label for="n4">
            <span>Send notifications of new messages from friends</span>
            <svg-icon name="ui/checkbox" />
          </label>
        </li>
        <li>
          <input v-model="model.users_messages" :checked="model.users_messages" type="checkbox" name="" value="" id="n5">
          <label for="n5">
            <span>Send notifications of new messages from all users</span>
            <svg-icon name="ui/checkbox" />
          </label>
        </li>
      </ul>
      <button @click="saveData()" type="button" class="btn st2">Save changes</button>
    </form>
  </perfect-scrollbar>
</div>
</template>

<script>
export default {
  name: 'NotificationsTab',
  data: () => ({
    model: {}
  }),
  created() {
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll_tab) {
        setTimeout(() => {
          this.$refs.scroll_tab.update()
        }, 100)
      }
    })
  },
  mounted() {
    this.model = Object.assign({}, this.settings)
  },
  methods: {
    async saveData() {
      await this.$store.dispatch('settings/updateNotifications', this.model)
      this.$root.$emit('toggleModal', {
        target: 'notification',
        data: {
          title: 'Updated',
          text: 'Все обновилось'
        }
      })
    }
  },
  computed: {
    profile() {
      return this.$store.getters['profile/data']
    },
    settings() {
      return this.$store.getters['settings/notifications']
    }
  }
}
</script>
