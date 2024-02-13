<template>
<div class="modalinfo friendsmodal remove small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removebox">
    <div class="title">{{ $t('Friends_user_dropdown_menu_remove') }}</div>
    <div class="desc" v-html="$t('Friends_user_dropdown_menu_remove',modal.user.name)"></div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {target: 'friends', user: modal.user})" type="button" class="btn st2">{{ $t('Button_cancel') }}</button>
      <button @click="remove()" type="button" class="btn st3">{{ $t('Button_remove') }}</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsRemoveModalComponent',
  methods: {
    async remove() {
      await this.$store.dispatch('friends/remove', {uid: this.modal.user.uid})
      this.$root.$emit('toggleModal', {target: 'friendsRemoved'})
    }
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
