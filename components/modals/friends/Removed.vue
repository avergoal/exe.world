<template>
<div class="modalinfo friendsmodal removed small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removedbox">
    <div class="desc"><strong v-html="modal.user.name"></strong> is removed from your friends list</div>
    <button @click="$root.$emit('toggleModal', {target: 'friends'})" type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsRemovedModal',
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
