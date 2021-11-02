<template>
<div class="modalinfo friendsmodal block small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removedbox">
    <div class="desc"><strong v-html="modal.user.name"></strong> has been blocked</div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'UserBlockedModal',
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>