<template>
<div class="guest-save">
  <button @click="$emit('closeGuestSave')" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="guest-save-wrap">
    <img class="guest-save__img" src="~/assets/illustration/sleek.svg" alt="">
    <div class="guest-save-text">
      <div class="guest-save__title">{{$t('Guest_game_bar_text_1')}}</div>
      <div class="guest-save__desc">{{ $t('Guest_game_bar_text_2') }}</div>
    </div>
    <div class="guest-save-btns">
      <button @click="$root.$emit('toggleModal', {target: 'signUp'})" type="button" class="btn st2">
        <span>{{ $t('Button_signup') }}</span>
      </button>
      <button @click="$root.$emit('toggleModal', {target: 'gameSignIn',game:poster})" type="button" class="btn st3">
        <span>{{ $t('Button_login') }}</span>
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
