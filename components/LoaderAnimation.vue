<template>
  <div
    class="loader-wrap"
    :class="{'loader-wrap_theme': theme}"
  >
    <img src="~/assets/loader-svg.svg" alt="" width="48" height="48">
  </div>
</template>

<script>
export default {
  name: 'LoaderAnimation',
  computed: {
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>