<template>
<div class="index_page">
  <div class="categoriesbox">
    <div v-html="pageTitle" class="pagetitle"></div>
    <ul class="category">
      <li v-for="(e, i) in pageData" :key="i" class="gamecard f">
        <div class="box">
          <div class="img">
            <img :src="e.img" :alt="e.title">
            <nuxt-link :to="e.link">
              <svg-icon name="ui/play" />
              <span>play</span>
            </nuxt-link>
          </div>
          <div class="info">
            <div v-html="e.title" class="title"></div>
            <div v-html="e.desc" class="desc"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="noresults page">
    <div class="img">
      <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
      <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
    </div>
    <div class="text">
      <b>We did not find anything for your request</b>
      <p>Try changing your search text</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchCategoryPageComponent',
  mounted() {
    setTimeout(() => {
      document.getElementById('scroll').dispatchEvent(new Event('scroll'))
    }, 100)
  },
  computed: {
    pageTitle() {
      return this.$store.getters['mainPage/pageTitle']
    },
    pageData() {
      return this.$store.getters['mainPage/pageData']
    }
  }
}
</script>
