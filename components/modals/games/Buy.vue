<template>
<div class="modalinfo gamemodal buy">
  <button @click="cancelModal" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Buying {{modal.item.title}}</div>
    <div class="info">
      <img class="img" :src="modal.item.photo_url" alt="">
      <div class="content">
        <div class="top">
          <div class="item">
            <div class="label">Price</div>
            <div class="desc">${{modal.item.price}}</div>
          </div>
          <div class="item">
            <div class="label">Balance</div>
            <div class="desc">${{balance}}</div>
          </div>
          <div class="description">
            <p v-if="!modal.item.insufficient_funds" class="dark">You have enough funds on your balance to pay</p>
            <p v-else class="red">You don't have enough funds on your balance to pay</p>
            <label for="testPay" class="checkbox">
              <input type="checkbox" id="testPay" v-model="test">
              <span></span>
              Test purchase

            </label>


          </div>
        </div>
        <div class="btns">
          <button @click="cancelModal" type="button" class="btn st3">cancel</button>
          <button v-if="modal.item.price<=balance" @click="buyItems" type="button" class="btn st2">buy</button>
          <button v-else @click="toggleModal('addFunds')" type="button" class="btn st2">add funds</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'GameBuyModal',
  data: () => ({
    enough: null,
    // price: 5 /* for example */
    test: false
  }),
  mounted() {
    // this.checkBalance()
  },
  methods: {
    // checkBalance() {
    //   if (this.balance >= this.price) {
    //     this.enough = true
    //   } else {
    //     this.enough = false
    //   }
    // },
    cancelModal(){
      this.$root.$emit('toggleModal', {})
      this.$root.$emit('setLoader', true)
    },
    buyItems() {
      window.ExeWorldApi.orderComplete({test: this.test})
      console.log('buy!')
    },
    toggleModal(target, tab) {
      this.$root.$emit('toggleModal', (tab == 'logOut') ? {
        target: tab
      } : {
        target: target,
        tab: tab,
        game: tab
      })
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    },
    balance() {
      return this.$store.getters['profile/data'].balance
    }
  }
}
</script>
