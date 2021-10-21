<template>
<perfect-scrollbar ref="scroll" :class="page" class="filters">
<ul>
  <li v-for="(e, i) in filters.list" :key="i">
    <button @click="setFilter(e.cid)" :class="{active: current == e.cid, hidden: !e.total}" type="button">
      <span v-html="e.title"></span>
      <span v-if="e.total" v-html="e.total" class="badge"></span>
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
    filters: [],
    current: 0
  }),
  mounted() {
    this.filters = this[this.type]
    this.current = this.filters.current
  },
  methods: {
    async setFilter(e) {
      if(this.filters.current != e) {
        let temp,
            action = (this.type == 'allCategoriesFilters') ? 'filters/setAllCategories' : 'filters/setUserCategories'
        temp = Object.assign({}, this.filters)
        temp.current = e
        await this.$store.dispatch(action, temp)
        this.filters = this[this.type]
        this.$parent.changeCategory(e)
        this.current = e
      }
    }
  },
  computed: {
    allCategoriesFilters() {
      return this.$store.getters['filters/allCategories']
    },
    userCategoriesFilters() {
      return this.$store.getters['filters/userCategories']
    },
    page() {
      return this.$store.getters['app/page'].toLowerCase()
    }
  }
}
</script>
