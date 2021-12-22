<template>
<div class="modalinfo friendsmodal removed small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removedbox">
    <div class="desc">You report has been submited</div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'UserReportedModal'
}
</script>
