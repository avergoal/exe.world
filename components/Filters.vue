<template>
<perfect-scrollbar ref="scroll" class="filters">
<ul>
  <li v-for="(e, i) in filters" :key="i">
    <button @click="setFilter(i)" :class="{active: filter == i}" type="button">
      <span v-html="e.text"></span>
      <span v-if="e.badge" v-html="e.badge" class="badge">2</span>
    </button>
  </li>
</ul>
</perfect-scrollbar>
</template>

<script>
export default {
  name: 'FiltersComponents',
  props: ['filters'],
  data() {
    return{
      filter: 0
    }
  },
  methods: {
    setFilter(e) {
      this.filter = e
      this.$root.$emit('toggleFilters', this.filter)
    }
  }
}
</script>
