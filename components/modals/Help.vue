<template>
<div class="modalinfo helpmodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Help</div>
    <form @submit.prevent action="">
      <fieldset><input type="text" name="" value="" placeholder="Your e-mail"></fieldset>
      <fieldset><input type="text" name="" value="" placeholder="Your name"></fieldset>
      <fieldset><textarea name="" placeholder="Your message"></textarea></fieldset>
      <div class="btns">
        <button type="button" class="btn st3">cancel</button>
        <button type="button" class="btn st2">send</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'HelpModal'
}
</script>
