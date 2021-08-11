<template>
<div class="modalinfo authmodal small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top flex">
      <button @click="$parent.openModal('signIn')" type="button"><svg-icon name="ui/back" /></button>
      <span>Restore password</span>
    </div>
    <form action="" class="st1">
      <div class="desc">Enter the E-mail or phone number specified during registration for password recovery</div>
      <fieldset><input type="text" name="" value="" placeholder="E-mail or Phone"></fieldset>
      <div class="btns"><button @click="$parent.openModal('emailSend')" type="submit" class="btn st2">restore password</button></div>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'RestorePasswordModal'
}
</script>
