<template>
<div class="modalinfo messagesmodal big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Messages</div>
    <!--
    <form action="">
      <fieldset>
        <svg-icon name="ui/search" />
        <input type="text" name="" value="" placeholder="Search contacts">
      </fieldset>
      <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">
        <svg-icon name="ui/plus" />
        <span>write</span>
      </button>
    </form>
    -->
    <perfect-scrollbar ref="scroll">
      <ul class="list messages">
        <li v-for="(e, i) in chats" :key="i">
          <button @click="toggleModal('messagesChat', {id: e.uid})" :class="{active: e.title}" type="button">
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
      </ul>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>
export default {
	name: 'MessagesModal',
  created() {
    this.$store.dispatch('messages/chats')
  },
  methods: {
    toggleModal(target, user) {
      this.$root.$emit('toggleModal', (target) ? {
        target: target,
        user: user
      } : {})
    }
  },
  computed: {
    chats() {
      return this.$store.getters['messages/chats']
    }
  }
}
</script>
