<template>
<div class="modalinfo friendsmodal remove small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removebox">
    <div class="title">{{$t('Modal_remove_chat')}}</div>
    <div class="desc">{{$t('Modal_remove_chat_text')}}</div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {target: 'messages'})" type="button" class="btn st2">{{$t('Button_cancel')}}</button>
      <button @click="remove()" type="button" class="btn st3">{{$t('Button_remove')}}</button>
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
