<template>
<div class="modalinfo gamemodal buy">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Buying {{modal.item}}</div>
    <div class="info">
      <img class="img" src="https://via.placeholder.com/148x148.png?text=Test+image" alt="">
      <div class="content">
        <div class="top">
          <div class="item">
            <div class="label">Price</div>
            <div class="desc">${{price}}</div>
          </div>
          <div class="item">
            <div class="label">Balance</div>
            <div class="desc">${{balance}}</div>
          </div>
          <div class="description">
            <p v-if="enough" class="dark">You have enough funds on your balance to pay</p>
            <p v-else class="red">You don't have enough funds on your balance to pay</p>
          </div>
        </div>
        <div class="btns">
          <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st3">cancel</button>
          <button v-if="enough" @click="buyItems" type="button" class="btn st2">buy</button>
          <button v-else @click="toggleModal('personalData', 'addfunds')" type="button" class="btn st2">add funds</button>
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
    price: 5 /* for example */
  }),
  mounted() {
    this.checkBalance()
  },
  methods: {
    checkBalance() {
      if (this.balance >= this.price) {
        this.enough = true
      } else {
        this.enough = false
      }
    },
    buyItems() {
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
