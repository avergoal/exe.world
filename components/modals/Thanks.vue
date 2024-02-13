<template>
<div class="modalinfo thanksmodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">{{ $t('Modal_help_sent_confirm') }}</div>
    <div class="desc">{{ $t('Modal_help_send_confirm_text') }}</div>
    <button type="button" class="btn btn_small st2">{{ $t('Button_continue') }}</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'ThanksModal'
}
</script>
