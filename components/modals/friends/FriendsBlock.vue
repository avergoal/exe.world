<template>
<div class="modalinfo friendsmodal block small">
  <button @click="toggleModal(null)" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent blockbox">
    <div class="title">Block User</div>
    <div class="desc">
      <p>After being blocked, this user will no longer be able to send you messages and share news.</p>
      <p>Are you sure you want to block <strong v-html="modal.user.name"></strong>?</p>
    </div>
    <div class="btns">
      <button @click="toggleModal('friends')" type="button" class="btn st2">cancel</button>
      <button @click="blockUser()" type="button" class="btn st3">Yes, block</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsBlockModal',
  methods: {
    toggleModal(target) {
      this.$root.$emit('toggleModal', (target) ? {
        open: true,
        target: target,
        user: this.modal.user
      } : {})
    },
    async blockUser() {
      await this.$store.dispatch('profile/blackListAdd', {
        uid: this.modal.user.id
      })
      this.toggleModal('friends')
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
