<template>
<div class="modalinfo friendsmodal remove small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removebox">
    <div class="title">Remove From Friends</div>
    <div class="desc">Are you sure you want to remove <strong v-html="modal.user.name"></strong> as a friend?</div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {target: 'friends', user: modal.user})" type="button" class="btn st2">cancel</button>
      <button @click="remove()" type="button" class="btn st3">Yes, remove</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsRemoveModalComponent',
  methods: {
    async remove() {
      await this.$store.dispatch('friends/remove', {uid: this.modal.user.uid})
      this.$root.$emit('toggleModal', {target: 'friendsRemoved'})
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
