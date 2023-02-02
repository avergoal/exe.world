<template>
<div class="modalinfo gamemodal buy">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Success!</div>
    <div class="info">
      <img class="img" :src="modal.item.photo_url" alt="">
      <div class="info">
        <div class="text">You have successfully bought 200 gold. Keep playing!</div>
        <button type="button" @click="$root.$emit('toggleModal', {})" class="btn st2">continue</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'GameBuySuccessModal',
  mounted() {
    this.$store.dispatch('profile/getBalance')
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    },
  }
}
</script>
