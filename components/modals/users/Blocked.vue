<template>
<div class="modalinfo friendsmodal block small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removedbox">
    <div class="desc" v-html="$t('Modal_friends_block_text_3',{username:modal.user.name})"></div>
    <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">{{ $t('Button_continue') }}</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'UserBlockedModal',
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
