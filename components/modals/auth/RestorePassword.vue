<template>
<div class="modalinfo authmodal small">
  <button @click="closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top flex">
      <button @click="openModal('signIn')" type="button"><svg-icon name="ui/back" /></button>
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
    error: {
      show: false,
      text: 'Пользователь не найден'
    }
  }),
  methods: {
    goHome() {
      this.$root.$emit('modalOpen', {
        open: false,
        target: null,
        message: null,
        status: false,
        tab: null
      })
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    async restorePassword() {
      let formData = new FormData()
      formData.append('emailorphone', this.emailorphone)
      formData.append('api_token', this.token)
      const { data } = await this.$store.dispatch('user/restorePassword', formData)
      if(typeof data.error != 'undefined') {
        this.error.show = true
      } else {
        this.openModal('emailSend')
      }
    },
    openModal(e) {
      this.$root.$emit('modalOpen', {
        open: true,
        target: e,
        message: null,
        status: false,
        tab: null
      })
    },
    closeModal() {
      this.$root.$emit('modalOpen', {
        open: false,
        target: null,
        message: null,
        status: false,
        tab: null
      })
    }
  },
  computed: {
    token() {
      return this.$store.getters['user/token']
    }
  }
}
</script>
