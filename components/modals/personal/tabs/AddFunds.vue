<template>
<div class="tab addfunds">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'wallet')" type="button"><svg-icon name="ui/back" /></button>
    <span>Add Funds</span>
  </div>
  <ul class="select">
    <li><button @click="paysystem = 0" :class="{active: paysystem === 0}" type="button">Credit Card</button></li>
    <li><button @click="paysystem = 1" :class="{active: paysystem === 1}" type="button">PayPal</button></li>
    <li><button @click="paysystem = 2" :class="{active: paysystem === 2}" type="button">Xsolla</button></li>
  </ul>
  <form action="">
    <div class="label">Balance Quantity</div>
    <ul class="radio">
      <li>
        <input type="radio" name="payment" value="" id="r1" checked>
        <label for="r1">$1</label>
      </li>
      <li>
        <input type="radio" name="payment" value="" id="r2">
        <label for="r2">$5</label>
      </li>
      <li>
        <input type="radio" name="payment" value="" id="r3">
        <label for="r3">$10</label>
      </li>
      <li>
        <input type="radio" name="payment" value="" id="r4">
        <label for="r4">$15</label>
      </li>
      <li>
        <input type="radio" name="payment" value="" id="r5">
        <label for="r5">$20</label>
      </li>
    </ul>
    <fieldset><input type="text" name="" value="" placeholder="Other quantity"></fieldset>
    <button type="button" class="btn st2">Continue</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'BalanceTabAddFunds',
  data: () => ({
    paysystem: 0
  })
}
</script>
