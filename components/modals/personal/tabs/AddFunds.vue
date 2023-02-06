<template>
<div class="tab addfunds">
  <div class="title">
    <button v-if="game" @click="$root.$emit('toggleModal', {target:'gameBuy'})" type="button"><svg-icon name="ui/back" /></button>
    <button v-else @click="$root.$emit('toggleModalTab', 'wallet')" type="button"><svg-icon name="ui/back" /></button>
    <span>Add Funds</span>
  </div>
  <perfect-scrollbar ref="scroll_tab">
    <ul class="select">
      <li v-for="(method,index) in paymentMethods">
        <button @click="selectPaySystem(method.pid,index)" :class="{active: index === selected}" type="button">
        {{ method.pid }}</button></li>
    </ul>
    <form @submit.prevent action="">
      <div class="label">Balance Quantity</div>
      <ul class="radio">
        <li v-for="n in 5">
          <input v-model="balanceQuantity" type="radio" name="payment" :value="quantity+n*5-5">
          <label @click="balanceQuantity = quantity+n*5-5" for="r1">${{quantity+n*5-5}}</label>
        </li>
      </ul>
      <fieldset>
        <input v-model="otherQuantity" type="number" name="" value="" placeholder="Other quantity">
        <span v-if="error" v-html="error" class="error"></span>
      </fieldset>
      <button @click="submit()" type="button" class="btn st2">Continue</button>
    </form>
  </perfect-scrollbar>
</div>
</template>

<script>
export default {
  name: 'BalanceTabAddFunds',
  props: {
    game: {
      default: false
    }
  },
  data: () => ({
    paysystem: 0,
    selected: 0,
    balanceQuantity: 0,
    otherQuantity: null,
    error: null,
    timer: null
  }),
  created() {
    this.$store.dispatch('profile/getPaymentsMethods')
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll_tab) {
        setTimeout(() => {
          this.$refs.scroll_tab.update()
        }, 100)
      }
    })
  },
  methods: {
    async submit() {
      let response = await this.$store.dispatch('profile/paymentsPrepare', {
        type: this.paysystem,
        sum: (this.otherQuantity) ? this.otherQuantity : this.balanceQuantity
      })
      if(response.error) {
        this.error = response.error
      } else {
        this.openWindow(response.response.url)
      }
    },
    selectPaySystem(pid,index){
      this.paysystem = pid
      this.selected = index
      this.otherQuantity = null
    },
    openWindow(url) {
      let handler, timer
      this.$root.$emit('setLoader', false)
      if(handler) handler.close()
      handler = window.open(url, 'paymentProccess')
      timer = setInterval(() => {
        if(handler.closed) {
          clearInterval(timer)
          this.$root.$emit('setLoader', true)
          this.$store.dispatch('profile/getBalance')
          if (!this.game) {
            this.$root.$emit('toggleModal', {target: 'paymentSuccesfull'})
          }
        }
      }, 500)
      if(this.game) {
        this.$root.$emit('toggleModal', {target: 'gameBuy'})
      }
    }
  },
  computed:{
    paymentMethods(){
      const methods = this.$store.getters['profile/paymentsMethods']
      this.balanceQuantity = methods[this.selected]?.limits[0]
      return methods
    },
    quantity(){
      return this.paymentMethods[this.selected]?.limits[0]
    }
  }
}
</script>
