<template>
<div class="modalinfo authmodal textbox small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Email Sent</div>
    <div class="text">Email with a link to reset your password has been sent. <br>If there is no message for a long time, check the Spam folder</div>
    <button type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'EmailSendModal'
}
</script>
