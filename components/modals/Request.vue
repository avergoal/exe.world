<template>
<div class="modalinfo authmodal textbox small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Response</div>
    <div v-html="message" class="text"></div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">close</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'RequestModal',
  computed: {
    message() {
      return this.$store.getters['app/modal'].message
    }
  }
}
</script>