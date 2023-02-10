<template>
  <div class="modalinfo alertmodal small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
      <div class="desc">
        <div class="title">Payment {{ !modal.success?'successfull': 'cancelled' }}</div>
      </div>
      <button @click="toggleModal" type="button" class="btn st2">continue</button>
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
