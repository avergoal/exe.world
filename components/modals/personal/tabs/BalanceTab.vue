<template>
<div class="tab balance">
  <div class="title">Balance</div>
  <div class="inform">
    <div class="top">
      <div v-html="(balance.balance) ? balance.balance : '0'" class="balance"></div>
      <button @click="setTab('addfunds')" type="button" class="btn">
        <svg-icon name="ui/plus" />
        <span>Add funds</span>
      </button>
    </div>
    <div class="desc">Dollars ‒Universal currency of the game portal EXE.WORLD. <br>With it, you can pay for additional features in games and applications.</div>
  </div>
  <div class="label">History</div>
  <perfect-scrollbar ref="scroll">
    <ul class="list">
      <li v-for="(e, i) in balance.history" :key="i">
        <div v-html="e.date" class="date"></div>
        <div v-html="e.desc" class="desc"></div>
        <div v-html="e.balance" :class="e.type" class="balance">+ $50</div>
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
  },
  methods: {
    async loadBalance() {
      await this.$store.dispatch('profile/setBalance')
    },
    setTab(target) {
      this.$store.dispatch('app/toggleModalTab', target)
    }
  },
  computed: {
    balance() {
      return this.$store.getters['profile/balance']
    }
  }
}
</script>
