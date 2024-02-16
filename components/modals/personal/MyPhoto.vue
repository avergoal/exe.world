<template>
<div class="modalinfo myphotomodal editor small">
  <button @click="$root.$emit('toggleModal', {target: 'personalData'})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">{{ $t('Modal_photo_text') }}</div>
    <div class="btns">
      <button @click="removePhoto()" type="button" class="btn st3">{{ $t('Button_delete_photo') }}</button>
      <button @click="$root.$emit('toggleModal', {target: 'myPhotoEditor'})" type="button" class="btn st2">{{ $t('Modal_photo_addphoto_choose_text') }}</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'MyPhotoModal',
  methods: {
    async removePhoto() {
      await this.$store.dispatch('settings/removePhoto')
      this.$root.$emit('toggleModal', {target: 'personalData'})
    }
  }
}
</script>
