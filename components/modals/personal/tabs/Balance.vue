<template>
<div class="tab balance">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button"><svg-icon name="ui/back" /></button>
    Balance
  </div>
  <perfect-scrollbar ref="scroll">
    <div class="inform">
      <div class="top">
        <div v-html="(balance) ? balance : '0'" class="balance"></div>
        <button @click="$root.$emit('toggleModalTab', 'addfunds')" type="button" class="btn">
          <svg-icon name="ui/plus" />
          <span>Add funds</span>
        </button>
      </div>
      <div class="desc">Dollars ‒Universal currency of the game portal EXE.WORLD. <br>With it, you can pay for additional features in games and applications.</div>
    </div>
    <div class="label">History</div>
    <ul class="list">
      <li v-for="(e, i) in history" :key="i">
        <div v-html="e.date" class="date"></div>
        <div v-html="e.title" class="desc"></div>
        <div v-html="((e.type == 1) ? '+ $' : '- $') + e.value" :class="(e.type == 1) ? 'plus' : 'minus'" class="balance"></div>
      </li>
    </ul>
  </perfect-scrollbar>
</div>
</template>

<script>
export default {
  name: 'BalanceTab',
  data: () => ({
    addFunds: false
  }),
  created() {
    this.loadBalance()
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll) {
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    })
  },
  methods: {
    async loadBalance() {
      this.$store.dispatch('profile/getBalance')
    }
  },
  computed: {
    balance() {
      return this.$store.getters['profile/data'].balance
    },
    history() {
      return this.$store.getters['profile/balanceHistory']
    }
  }
}
</script>
