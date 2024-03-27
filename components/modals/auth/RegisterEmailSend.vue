<template>
<div class="modalinfo authmodal textbox small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">{{$t('Modal_email_verification')}}</div>
    <div class="text">A letter has been sent to your e-mail to confirm registration.
      If there is no message for a long time, check the Spam folder</div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">{{$t('Button_continue')}}</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'EmailSendModal'
}
</script>
