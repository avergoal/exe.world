<template>
<div class="modalinfo notifymodal textbox small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div v-html="data.title" class="top"></div>
    <div v-html="data.text" class="text"></div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'EmailSendModal',
  computed: {
    data() {
      return this.$store.getters['app/modal'].data
    }
  }
}
</script>