<template>
<div class="modalinfo helpmodal thanks small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Thank You</div>
    <div class="desc">Your request has been sent, if necessary, we will contact you.</div>
    <button type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'ThanksModal'
}
</script>
