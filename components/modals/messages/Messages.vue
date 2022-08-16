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
        <input v-model="query" @input="setSearchResults()" type="text" name="" value="" placeholder="Search contacts">
      </fieldset>
    </form>
    <perfect-scrollbar ref="scroll">
      <ul class="list messages">
        <li v-for="(e, i) in chats" :key="i">
          <button @click="$root.$emit('toggleModal', {target: 'messagesChat', user: e.uid})" :class="{active: e.new_messages}" type="button">
            <div class="userphoto"><img :src="e.cover" :alt="e.name"></div>
            <div class="info">
              <div class="name">
                <strong v-html="e.title"></strong>
                <div v-html="'// ' + $moment.unix(e.timestamp).format('DD.MMMM.YYYY')" class="date"></div>
              </div>
              <div v-html="e.message.text" class="text"></div>
              <span v-if="e.new_messages" v-html="e.new_messages" class="badge"></span>
            </div>
          </button>
        </li>
        <li v-if="!chats.length" class="empty">
          <div class="img">
            <img v-if="theme" src="~/assets/illustration/messages_inverse.svg" />
            <img v-else src="~/assets/illustration/messages.svg" />
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
    query: null
  }),
  created() {
    this.$store.dispatch('messages/chats')
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll) {
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    })
    this.$root.$on('getNewMessage', () => {
      this.$store.dispatch('messages/chats')
    })
  },
  methods: {
    setSearchResults() {
      if(this.query) {
        this.$store.dispatch('messages/search', {query: this.query})
      } else {
        this.$store.dispatch('messages/chats')
      }
    }
  },
  computed: {
    chats() {
      return this.$store.getters['messages/chats']
    },
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
