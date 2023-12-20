<template>
  <div class="modalinfo notifymodal textbox small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
      <div class="top">
       Restore password
      </div>
      <div class="desc">

          Instructions for changing the password has been sent
      </div>
      <button @click="toggleModal" type="button" class="btn st2">continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestoreSuccessful',
  methods:{
    toggleModal(){
      this.$root.$emit('toggleModal', {target: ''})
      this.$root.$emit('setLoader', true)
    }
  }
}
</script>

