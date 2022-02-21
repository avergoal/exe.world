<template>
<div class="modalinfo gamemodal menumodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent menu">
    <div class="topinfo">
      <div class="img"><img :src="modal.game.icon.hires" alt=""></div>
      <div v-html="modal.game.title" class="name"></div>
    </div>
    <ul class="menu">
      <li><button type="button">Send game notifications</button></li>
      <li><button type="button">Terms of use</button></li>
      <li><button type="button">About the developer</button></li>
      <li><button @click="$root.$emit('toggleModal', {target: 'gameRemove', game: modal.game.gid})" type="button">Delete from my games</button></li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'GameMenuModalComponent',
  computed: {
    modal() {
      console.log(this.$store.getters['app/modal'])
      return this.$store.getters['app/modal']
    }
  }
}
</script>