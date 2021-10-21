<template>
<div class="modalinfo newsmodal big">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">News</div>
    <!--<Filters v-if="filters" :filters="filters"/>-->
    <perfect-scrollbar ref="scroll">
      <ul class="news">
        <li v-for="(e, i) in news" :key="i">
          <div v-if="e.photo" class="userphoto"><img :src="e.photo" :alt="e.name"></div>
          <div v-else-if="e.img" class="img"><img :src="e.img" :alt="e.name"></div>
          <div class="info">
            <div class="name">
              <strong v-html="e.name"></strong>
              <span v-html="'// '+e.date"></span>
            </div>
            <div v-html="e.text" class="text"></div>
            <div class="btns">
              <button v-if="e.button && false" type="button" class="btn st2">play</button>
              <button v-if="e.button && false" type="button" class="btn st2">Pick up the reward</button>
              <button v-if="e.button && false" type="button" class="btn st3">maybe later</button>
              <button v-if="e.button && false" type="button" class="btn st3">Start fight</button>
            </div>
          </div>
          <div v-if="e.extPhoto" class="userphoto extended"><img :src="e.extPhoto" :alt="e.name"></div>
          <div v-else-if="e.extImg" class="img extended"><img :src="e.extImg" :alt="e.name"></div>
        </li>
        <li class="empty">
          <div class="img">
            <img src="~/assets/illustration/notfound.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/notfound_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">
            <b>You have no news yet</b>
            <p>Play games, make friends, and something interesting will appear here</p>
          </div>
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>
export default {
	name: 'NewsModal',
  data: () => ({
    filters: [{
      text: 'All News',
      value: null,
      badge: null
    }, {
      text: 'Games',
      value: null,
      badge: null
    }, {
      text: 'Friends',
      value: null,
      badge: null
    }],
    filter: 0
  }),
  mounted() {
    this.loadNews()
  },
  methods: {
    async loadNews() {
      await this.$store.dispatch('app/setNews', {
        offset: 0
      })
    }
  },
  computed: {
    news() {
      console.log(this.$store.getters['app/news'])
      return this.$store.getters['app/news']
    }
  }
}
</script>
