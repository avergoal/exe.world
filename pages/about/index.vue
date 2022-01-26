<template>
<div class="aboutpagebox">
  <div v-html="data.title" class="pagetitle">About EXE</div>
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
  name: 'GamePage',
  async asyncData({ store }) {
    const data = await store.dispatch('app/setAbout')
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
