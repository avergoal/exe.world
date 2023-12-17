<template>

</template>
<script>
export default {
  name: "help",
  mounted() {
    this.$router.push('/')
    setTimeout(()=>{
      this.$root.$emit('toggleModal', {target:'help'})
    },200)
  }
}
</script>

<style scoped>

</style>
