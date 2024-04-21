<template>
<div class="modalinfo notifymodal textbox small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">{{data?.title?data.title:$t('Modal_profile_change_data')}}</div>
    <div class="text">{{data?.text?data.text:$t('Modal_profile_change_data_text')}}</div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">{{ $t('Button_continue') }}</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'EmailSendModal',
  computed: {
    data() {
      return this.$store.getters['app/modal'].data
    }
  }
}
</script>
