<template>
<div class="modalinfo authmodal textbox small">
  <button @click="closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Response</div>
    <div v-html="message" class="text"></div>
    <button @click="closeModal()" type="button" class="btn st2">close</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'RequestModal',
  methods: {
    closeModal() {
      this.$root.$emit('modalOpen', {
        open: false,
        target: null,
        message: null,
        status: false,
        tab: null
      })
    }
  },
  computed: {
    message() {
      return this.$store.getters['modals/message']
    }
  }
}
</script>