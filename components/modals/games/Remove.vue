<template>
<div class="modalinfo gamemodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Delete Game</div>
    <div class="desc">Are you sure you want to delete <strong v-html="modal.name"></strong> from your games?</div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">cancel</button>
      <button @click="removeGame()" type="button" class="btn st3">delete</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'GameRemoveModal',
  methods: {
    async removeGame() {
      this.$router.push('/')
      await this.$store.dispatch('games/removeGame', {
        gid: this.modal.game
      })
      this.$root.$emit('toggleModal', {})
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
