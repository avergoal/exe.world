<template>
<div class="modalinfo gamemodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Delete Game</div>
    <div class="desc" v-html="$t('Modal_delete_game',{ gamename: modal.name })"></div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">{{ $t('Button_cancel') }}</button>
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
      await this.$store.dispatch('app/initAppData')
      await this.$store.dispatch('games/loadUserGames',{
        uid:this.profile.id
      })
      this.$root.$emit('toggleModal', {})
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    },
    profile() {
      return this.$store.getters['profile/data']
    },
  }
}
</script>
