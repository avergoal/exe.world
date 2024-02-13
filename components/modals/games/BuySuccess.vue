<template>
<div class="modalinfo gamemodal buy">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">{{ $t('Modal_payment_succesful') }}</div>
    <div class="info">
      <img class="img" :src="modal.item.photo_url" alt="">
      <div class="info">
        <div class="text">{{ $t('Modal_ingame_purchase_success_text') }}</div>
        <button type="button" @click="$root.$emit('toggleModal', {})" class="btn st2">{{ $t('Button_continue') }}</button>
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
