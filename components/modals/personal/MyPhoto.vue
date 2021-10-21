<template>
<div class="modalinfo myphotomodal editor small">
  <button @click="closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">My Photo</div>
    <div class="btns">
      <button @click="removePhoto()" type="button" class="btn st3">delete photo</button>
      <button @click="openModal()" type="button" class="btn st2">add new photo</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'MyPhotoModal',
  methods: {
    async removePhoto() {
      let formData = new FormData()
          formData.append('api_token', this.token)
      const { data } = await this.$store.dispatch('user/removePhoto', {
        token: this.token,
        formData: formData
      })
    },
    openModal() {
      this.$root.$emit('modalOpen', {
        open: true,
        target: 'myPhotoEditor',
        message: null,
        status: null,
        tab: null
      })
    },
    closeModal() {
      this.$root.$emit('modalOpen', {
        open: false,
        target: null,
        message: null,
        status: null,
        tab: null
      })
    }
  }
}
</script>
