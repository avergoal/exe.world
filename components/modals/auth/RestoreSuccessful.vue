<template>
  <div class="modalinfo notifymodal textbox small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
      <div class="top">
        {{$t('Modal_restore_password')}}
      </div>
      <div class="text">
        {{$t('Modal_restore_password_text')}}
      </div>
      <button @click="toggleModal" type="button" class="btn st2">{{$t('Button_continue')}}</button>
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

