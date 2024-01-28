<template>
<div class="guest-save">
  <button @click="$emit('closeGuestSave')" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="guest-save-wrap">
    <img class="guest-save__img" src="~/assets/illustration/sleek.svg" alt="">
    <div class="guest-save-text">
      <div class="guest-save__title">Save your game progress!</div>
      <div class="guest-save__desc">Sign up to save your game progress</div>
    </div>
    <div class="guest-save-btns">
      <button @click="$root.$emit('toggleModal', {target: 'signUp'})" type="button" class="btn st2">
        <span>Sign up</span>
      </button>
      <button @click="$root.$emit('toggleModal', {target: 'gameSignIn',game:poster})" type="button" class="btn st3">
        <span>Log in</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GuestSave',
  props:{
    poster:{}
  }
}
</script>
