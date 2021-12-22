<template>
<div class="modalinfo gamemodal buy big">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Buying gold</div>
    <div class="info">
      <div class="img"><img src="" alt=""></div>
      <div class="info">
        <div class="top">
          <div class="item">
            <div class="label">Price</div>
            <div class="desc">$5</div>
          </div>
          <div class="item">
            <div class="label">Balance</div>
            <div class="desc">$0</div>
          </div>
        </div>
        <div class="btns">
          <button type="button" class="btn st3">cancel</button>
          <button type="button" class="btn st2">add funds</button>
        </div>
      </div>
      <div class="desc">
        <p class="red">You don't have enough funds on your balance to pay</p>
        <p class="dark">You have enough funds on your balance to pay</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'GameBuyModal'
}
</script>
