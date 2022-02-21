<template>
<div class="tab addfunds">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'wallet')" type="button"><svg-icon name="ui/back" /></button>
    <span>Add Funds</span>
  </div>
  <perfect-scrollbar ref="scroll_tab">
    <ul class="select">
      <li><button @click="paysystem = 'yookassa'" :class="{active: paysystem === 'yookassa'}" type="button">yookassa</button></li>
    </ul>
    <form @submit.prevent action="">
      <div class="label">Balance Quantity</div>
      <ul class="radio">
        <li>
          <input v-model="balanceQuantity" type="radio" name="payment" value="1" id="r1" checked>
          <label for="r1">$1</label>
        </li>
        <li>
          <input v-model="balanceQuantity" type="radio" name="payment" value="5" id="r2">
          <label for="r2">$5</label>
        </li>
        <li>
          <input v-model="balanceQuantity" type="radio" name="payment" value="10" id="r3">
          <label for="r3">$10</label>
        </li>
        <li>
          <input v-model="balanceQuantity" type="radio" name="payment" value="15" id="r4">
          <label for="r4">$15</label>
        </li>
        <li>
          <input v-model="balanceQuantity" type="radio" name="payment" value="20" id="r5">
          <label for="r5">$20</label>
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
  data: () => ({
    paysystem: 'yookassa',
    balanceQuantity: 1,
    otherQuantity: null,
    error: null,
    timer: null
  }),
  created() {
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
    openWindow(url) {
      let handler, timer
      this.$root.$emit('setLoader', false)
      if(handler) handler.close()
      handler = window.open(url, 'paymentProccess')
      timer = setInterval(() => {
        if(handler.closed) {
          clearInterval(timer)
          this.$root.$emit('setLoader', true)
        }
      }, 500)
    }
  }
}
</script>
