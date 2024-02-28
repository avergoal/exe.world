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
      await this.$store.dispatch('app/sendRequest', {
        code: this.$route.params.pathMatch.replace('/', '')
      })
      await this.$router.push('/')
      // let message = (typeof data.error != 'undefined') ? data.error[0] : data.response.message
      this.$root.$emit('toggleModal', {
        target: 'notification',
        data: {
          title: this.$route.path.endsWith("r/")?this.$t('Modal_restore_password'):this.$t('Modal_profile_change_data'),
          text: this.$route.path.endsWith("r/")?this.$t('Modal_restore_password_text'):this.$t('Modal_profile_change_data_text')
        }
      })
    }
  }
}
</script>
