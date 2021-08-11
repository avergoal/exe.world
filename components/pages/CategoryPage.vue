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
</div>
</template>

<script>
export default {
  name: 'CategoryPageComponent',
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
