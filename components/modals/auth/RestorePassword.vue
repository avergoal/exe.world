<template>
<div class="modalinfo authmodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top flex">
      <button @click="$root.$emit('toggleModal', {target: 'signIn'})" type="button"><svg-icon name="ui/back" /></button>
      <span>{{$t('Modal_restore_password')}}</span>
    </div>
    <form @submit.prevent="restorePassword()" action="" class="st1">
      <div class="desc">{{ $t('FORMS_restore_password_TEXT') }}</div>
      <fieldset>
        <input v-model="emailorphone" :class="{error: error.show}" type="text" name="" value="" :placeholder="$t('FORMS_restore_input_password')">
        <span v-if="error.show" v-html="error.text" class="error"></span>
      </fieldset>
      <div class="btns"><button type="submit" class="btn st2">{{ $t('Button_restore') }}</button></div>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'RestorePasswordModal',
  data: () => ({
    emailorphone: null,
    error: {text: 'Пользователь не найден', show: false}
  }),
  methods: {
    async restorePassword() {
      this.error.show = false
      const error = await this.$store.dispatch('auth/restorePassword', {
        emailorphone: this.emailorphone
      })
      if(error) {
        this.error.show = true
      } else this.$root.$emit('toggleModal', {target:'restoreSuccessful'})
    },
    goHome() {
      this.$root.$emit('toggleModal', {})
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>
