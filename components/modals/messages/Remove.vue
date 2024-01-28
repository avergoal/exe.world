<template>
<div class="modalinfo friendsmodal remove small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removebox">
    <div class="title">Remove chat</div>
    <div class="desc">Are you sure you want to remove this chat?</div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {target: 'messages'})" type="button" class="btn st2">cancel</button>
      <button @click="remove()" type="button" class="btn st3">Yes, remove</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'MessagesRemoveModalComponent',
  methods: {
    async remove() {
      await this.$store.dispatch('messages/clear', {
        code: this.modal.code,
        uid: this.modal.uid
      })
      this.$root.$emit('toggleModal', {target: 'messages'})
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>