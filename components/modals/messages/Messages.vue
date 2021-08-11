<template>
<div class="modalinfo messagesmodal big">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Messages</div>
    <form action="">
      <fieldset>
        <svg-icon name="ui/search" />
        <input type="text" name="" value="" placeholder="Search contacts">
      </fieldset>
      <button @click="$parent.openModal('messagesWrite')" type="button" class="btn st2">
        <svg-icon name="ui/plus" />
        <span>write</span>
      </button>
    </form>
    <perfect-scrollbar ref="scroll">
      <ul class="list messages">
        <li v-for="(e, i) in userMessages" :key="i">
          <button @click="$parent.openModal('messagesChat')" :class="{active: e.badges}" type="button">
            <div class="userphoto"><img :src="e.photo" :alt="e.name"></div>
            <div class="info">
              <div class="name">
                <strong v-html="e.name"></strong>
                <div v-html="'// ' + e.date" class="date"></div>
              </div>
              <div v-html="e.text" class="text"></div>
              <span v-if="e.badges" v-html="e.badges" class="badge">5</span>
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
  computed: {
    userMessages() {
      return this.$store.getters['app/userMessages']
    }
  }
}
</script>
