<template>
<div class="gamepagebox">
  <div v-html="pageTitle" class="pagetitle"></div>
  <div class="framebox">
    <iframe :src="pageData" frameborder="0"></iframe>
    <div class="overlay" area-label="overlay"></div>
  </div>
  <div class="info">
    <ul>
      <li><button @click="openModal('gameInfo')" type="button">Terms of use</button></li>
      <li><button type="button">About the developer</button></li>
      <li><button @click="removeGame()" type="button">Delete from my games</button></li>
    </ul>
    <div class="checkbox">
      <input type="checkbox" name="" value="1" id="notifications">
      <label for="notifications">
        <span>Send game notifications</span>
        <svg-icon name="ui/checkbox" />
      </label>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GamePage',
  head() {
		return {
      title: this.pageTitle,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'description category'
      }]
    }
  },
  methods: {
    openModal(target) {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: target
      })
    },
    removeGame() {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: 'gameRemove'
      })
    }
  },
  computed: {
    pageTitle() {
      return this.$store.getters['gamePage/pageTitle']
    },
    pageData() {
      return this.$store.getters['gamePage/pageData']
    }
  }
}
// @click="openModal('gameSignIn')"
</script>
