<template>
<div class="modalinfo friendsmodal block small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent blockbox">
    <div class="title">{{ $t('Messages_dialog_with_user_dropdown_menu_block') }}</div>
    <div class="desc">
      <p>{{ $t('Modal_dialog_with_user_block_text_1') }}</p>
      <p v-html="$t('Modal_dialog_with_user_block_text_2',{username:modal.user.name})"></p>
    </div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">{{$t('Button_cancel')}}</button>
      <button @click="blockUser()" type="button" class="btn st3">{{$t('Button_block')}}</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'UserBlockModal',
  methods: {
    async blockUser() {
      await this.$store.dispatch('blacklist/add', {
        uid: this.modal.user.uid
      })
      this.$root.$emit('toggleModal', {
        target: 'userBlocked',
        user: this.modal.user
      })
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
