<template>
<div class="modalinfo messagesmodal big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top flex">
      <button @click="$parent.openModal('messages')" type="button"><svg-icon name="ui/back" /></button>
      <span>Write Message</span>
    </div>
    <form @submit.prevent action="" class="st1">
      <fieldset>
        <svg-icon name="ui/search" />
        <input type="text" name="" value="" placeholder="Search contacts">
      </fieldset>
    </form>
    <perfect-scrollbar ref="scroll">
      <ul class="list writes">
        <li v-for="(e, i) in userMessages" :key="i">
          <div class="userphoto"><img :src="e.photo" alt=""></div>
          <div v-html="e.name" class="name"></div>
          <button type="button" class="btn st2">
            <span>write</span>
            <svg-icon name="ui/pencil" />
          </button>
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>

export default {
	name: 'MessagesWriteModal',
  computed: {
    userMessages() {
      return this.$store.getters['app/userMessages']
    }
  }
}
</script>
