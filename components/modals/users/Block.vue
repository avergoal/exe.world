<template>
<div class="modalinfo friendsmodal block small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent blockbox">
    <div class="title">Block User</div>
    <div class="desc">
      <p>After being blocked, this user will no longer be able to send you messages and share news.</p>
      <p>Are you sure you want to block <strong v-html="modal.user.name"></strong>?</p>
    </div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">cancel</button>
      <button @click="blockUser()" type="button" class="btn st3">Yes, block</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'UserBlockModal',
  methods: {
    async blockUser() {
      await this.$store.dispatch('blacklist/add', {
        uid: this.modal.user.uid
      })
      this.$root.$emit('toggleModal', {
        target: 'userBlocked',
        user: this.modal.user
      })
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
