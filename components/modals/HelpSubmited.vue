<template>
<div class="modalinfo friendsmodal removed small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removedbox">
    <div class="desc">Your message has been sent successfully</div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'HelpSubmitedModal'
}
</script>
