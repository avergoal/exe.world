<template>
  <div class="privacypagebox">
    <div v-html="data.title" class="pagetitle"></div>
    <div class="info">
      <div v-html="data.text" class="text"></div>
      <div class="img">
        <img v-if="theme" src="~/assets/illustration/about_inverse.svg" />
        <img v-else src="~/assets/illustration/about.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const data = await store.dispatch('app/setPrivacy')
    return {data}
  },
  head() {
    return {
      title: this.data.title,
      meta: [{hid: 'description', name: 'description', content: this.data.title}]
    }
  },
  computed: {
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
