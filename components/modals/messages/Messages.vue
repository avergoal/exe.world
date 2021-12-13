<template>
<div class="modalinfo messagesmodal big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Messages</div>
    <form action="">
      <fieldset>
        <svg-icon name="ui/search" />
        <input v-model="search" type="text" name="" value="" placeholder="Search contacts">
      </fieldset>
      <button @click="setSearchResults()" type="button" class="btn st2">
        <svg-icon name="ui/plus" />
        <span>write</span>
      </button>
    </form>
    <perfect-scrollbar ref="scroll">
      <ul class="list messages">
        <li v-for="(e, i) in chats" :key="i">
          <button @click="toggleModal('messagesChat', {id: e.uid})" :class="{active: e.new_messages}" type="button">
            <div class="userphoto"><img :src="e.cover" :alt="e.name"></div>
            <div class="info">
              <div class="name">
                <strong v-html="e.title"></strong>
                <div v-html="'// ' + $moment.unix(e.timestamp).format('DD.MMMM.YYYY')" class="date"></div>
              </div>
              <div v-html="e.message.text" class="text"></div>
              <span v-if="e.new_messages" v-html="e.new_messages" class="badge">5</span>
            </div>
          </button>
        </li>
        <li v-if="!chats.length" class="empty">
          <div class="img">
            <img src="~/assets/illustration/messages.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/messages_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">
            <b>There are no messages here yet</b>
            <p>Write something</p>
          </div>
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>
export default {
	name: 'MessagesModal',
  data: () => ({
    search: null
  }),
  created() {
    this.$store.dispatch('messages/chats')
  },
  methods: {
    async setSearchResults() {
      await this.$store.dispatch('messages/search', {query: this.search})
    },
    toggleModal(target, user) {
      this.$root.$emit('toggleModal', (target) ? {
        target: target,
        user: user
      } : {})
    }
  },
  computed: {
    chats() {
      console.log(this.$store.getters['messages/chats'])
      return this.$store.getters['messages/chats']
    }
  }
}
</script>
