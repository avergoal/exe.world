<template>
<div class="modalinfo friendsmodal remove small">
  <button @click="toggleModal(null)" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removebox">
    <div class="title">Remove From Friends</div>
    <div class="desc">Are you sure you want to remove <strong v-html="modal.user.name"></strong> as a friend?</div>
    <div class="btns">
      <button @click="toggleModal('friends')" type="button" class="btn st2">cancel</button>
      <button @click="rejectRequest('friendsRemoved')" type="button" class="btn st3">Yes, remove</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsRemoveModalComponent',
  methods: {
    toggleModal(target) {
      this.$root.$emit('toggleModal', (target) ? {
        open: true,
        target: target,
        user: this.modal.user
      } : {})
    },
    rejectRequest() {
      this.$root.$emit('rejectRequest', this.modal.user.id)
      this.toggleModal('friendsRemoved')
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
