<template>
<div class="modalinfo myphotomodal editor small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">My Photo</div>
    <div class="btns">
      <button type="button" class="btn st3">delete photo</button>
      <button @click="openEditor()" type="button" class="btn st2">add new photo</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'MyPhotoModal',
  methods: {
    openEditor() {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: 'myPhotoEditor'
      })
    }
  }
}
</script>
