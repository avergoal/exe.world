<template>
<div class="tab balance">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button"><svg-icon name="ui/back" /></button>
    {{ $t('Header_balance') }}
  </div>
  <perfect-scrollbar ref="scroll">
    <div class="inform">
      <div class="top">
        <div v-html="(balance) ? balance : '0'" class="balance"></div>
        <button @click="$root.$emit('toggleModalTab', 'addfunds')" type="button" class="btn">
          <svg-icon name="ui/plus" />
          <span> {{ $t('Profile_balance_addfunds') }}</span>
        </button>
      </div>
      <div class="desc" v-html="$t('Profile_balance_text')"></div>
    </div>
    <div class="label">{{ $t('Profile_balance_history') }}</div>
    <ul class="list">
      <li v-for="(e, i) in history" :key="i">
        <div v-html="e.date" class="date"></div>
        <div v-html="$t(e.title.replaceAll('-','_').replaceAll(' ','_'))" class="desc"></div>
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

        }, 1000)
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
