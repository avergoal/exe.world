<template>
  <div class="modalinfo alertmodal small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
      <div class="desc">
        <div class="title">{{ !modal.success?$t('Modal_payment_succesful'): $t('Modal_payment_cancelled') }}</div>
      </div>
      <button @click="toggleModal" type="button" class="btn st2">{{ $t('Button_continue') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccesfull',
  methods:{
    toggleModal(){
      this.$root.$emit('toggleModal', {target: ''})
      this.$root.$emit('setLoader', true)
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
