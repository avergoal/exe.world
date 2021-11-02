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
      const data = await this.$store.dispatch('app/sendRequest', {
        code: this.$route.params.pathMatch.replace('/', '')
      })
      this.$router.push('/')
      let message = (typeof data.error != 'undefined') ? data.error[0] : data.response.message
      this.$root.$emit('toggleModal', {
        target: 'request',
        message: message,
        status: (typeof data.error != 'undefined')
      })
    }
  }
}
</script>