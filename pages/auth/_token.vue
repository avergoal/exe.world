<template>
<div></div>
</template>

<script>
export default {
  name: 'AuthWithSocialsPage',
  asyncData({route, error}) {
    if(!route.params.token) {
      error({ statusCode: 404 })
    }
  },
  async created() {
    if(process.browser && this.$route.params.token) {
      await this.$store.dispatch('auth/auth', this.$route.params.token)
      this.$router.push('/')
    }
  }
}
</script>