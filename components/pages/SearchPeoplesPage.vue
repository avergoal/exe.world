<template>
<div class="index_page">
  <div class="categoriesbox">
    <div v-html="pageTitle" class="pagetitle"></div>
    <ul class="peoples_list">
      <li v-for="(e, i) in pageData" :key="i">
        <button type="button">
          <div class="userphoto"><img :src="e.img" :alt="e.title"></div>
          <div class="name" v-html="e.name"></div>
        </button>
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
  name: 'SearchPeoplesPageComponent',
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
