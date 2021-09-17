<template>
<div style="min-height:calc(100Vh - 152px)"></div>
</template>

<script>
export default {
  name: 'RequestPage',
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      let code = this.$route.params.pathMatch.replace('/', ''),
          formData = new FormData()
      formData.append('code', code)
      const { data } = await this.$store.dispatch('app/sendRequest', formData)
      let message = (typeof data.error != 'undefined') ? data.error[0] : data.response.message
      this.$root.$emit('modalOpen', {
        open: true,
        target: 'request',
        message: message,
        status: false,
        tab: null
      })
      this.$router.push('/')
    }
  }
}
</script>