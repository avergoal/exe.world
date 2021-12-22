<template>
<div class="modalinfo gamemodal buy big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Success!</div>
    <div class="info">
      <div class="img"><img src="" alt=""></div>
      <div class="info">
        <div class="text">You have successfully bought 200 gold. Keep playing!</div>
        <button type="button" class="btn st2">continue</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'GameBuySuccessModal'
}
</script>
