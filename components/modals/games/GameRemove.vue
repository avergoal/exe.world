<template>
<div class="modalinfo gamemodal small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Delete Game</div>
    <div class="desc">Are you sure you want to delete <strong>Perfect Fantasy</strong> from your games?</div>
    <div class="btns">
      <button type="button" class="btn st2">cancel</button>
      <button type="button" class="btn st3">delete</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'GameRemoveModal'
}
</script>
