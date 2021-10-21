<template>
<div class="modalinfo authmodal small">
  <button @click="toggleModal(null)" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top flex">
      <button @click="toggleModal('signIn')" type="button"><svg-icon name="ui/back" /></button>
      <span>Restore password</span>
    </div>
    <form @submit.prevent="restorePassword()" action="" class="st1">
      <div class="desc">Enter the E-mail or phone number specified during registration for password recovery</div>
      <fieldset>
        <input v-model="emailorphone" :class="{error: error.show}" type="text" name="" value="" placeholder="E-mail or Phone">
        <span v-if="error.show" v-html="error.text" class="error"></span>
      </fieldset>
      <div class="btns"><button type="submit" class="btn st2">restore password</button></div>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'RestorePasswordModal',
  data: () => ({
    emailorphone: null,
    error: {text: 'Пользователь не найден',       show: false,
      
    }
  }),
  methods: {
    async restorePassword() {
      this.error.show = false
      const error = await this.$store.dispatch('profile/restorePassword', {
        emailorphone: this.emailorphone
      })
      if(error) {
        this.error.show = true
      }
    },
    goHome() {
      this.toggleModal(null)
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    toggleModal(e) {
      this.$root.$emit('toggleModal', (!e) ? {} : {
        open: true,
        target: e
      })
    }
  }
}
</script>
