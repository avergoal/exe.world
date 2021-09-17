<template>
<perfect-scrollbar ref="scroll" class="filters">
<ul>
  <li v-for="(e, i) in filters" :key="i">
    <button @click="setFilter(e.cid)" :class="{active: filter == e.cid, hidden: !e.total_games}" type="button">
      <span v-html="e.title"></span>
      <span v-if="e.total_games" v-html="e.total_games" class="badge">2</span>
    </button>
  </li>
</ul>
</perfect-scrollbar>
</template>

<script>
export default {
  name: 'FiltersComponents',
  props: ['type'],
  data: () => ({
    filters: []
  }),
  created() {
    this.filters = this[this.type]
  },
  methods: {
    async setFilter(e) {
      if(this.type == 'categories' && this.filter != e) {
        this.$store.dispatch('filters/setCategory', e)
        this.$root.$emit('changeCategory', e)
      }
    }
  },
  computed: {
    categories() {
      return this.$store.getters['games/categories']
    },
    filter() {
      return this.$store.getters['filters/category']
    }
  }
}
</script>
