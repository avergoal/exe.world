<template>
  <div class="modalinfo gamemodal menumodal small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close"/>
    </button>
    <div class="modalcontent menu">
      <div class="topinfo">
        <div class="name">Developer</div>
      </div>
      <div class="desc" v-html="modal.developer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Developer",
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>

<style scoped>

</style>
