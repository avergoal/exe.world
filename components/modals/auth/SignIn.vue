<template>
<div class="modalinfo authmodal small">
  <button @click="closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">
      <a @click.prevent="goHome()" href="/" class="logo"><svg-icon name="logo" /></a>
    </div>
    <form @submit.prevent="signIn()" action="">
      <div class="alert" v-if="errors.user_not_found.show" v-html="errors.user_not_found.text"></div>
      <fieldset>
        <input v-model="model.emailorphone" :class="{error: errors.no_required_fields.show || errors.user_not_found.show}" type="text" placeholder="E-mail or Phone">
        <span v-if="errors.no_required_fields.show" v-html="errors.no_required_fields.text" class="error"></span>
      </fieldset>
      <fieldset>
        <input v-model="model.pass" :class="{error: errors.no_required_fields.show || errors.user_not_found.show}" :type="passwordType" placeholder="Password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
        <span v-if="errors.no_required_fields.show" v-html="errors.no_required_fields.text" class="error"></span>
      </fieldset>
      <div class="btns">
        <button type="submit" class="btn st2">Log in</button>
        <button @click="openModal('restorePassword')" type="button" class="link">forgot password?</button>
      </div>
      <div class="signup">
        <div class="text">Don't have an account yet?</div>
        <button @click="openModal('signUp')" type="button">sign up</button>
      </div>
      <div class="social">
        <div class="text">Login via services</div>
        <ul>
          <li><a href=""><svg-icon name="ui/facebook" /></a></li>
          <li><a href=""><svg-icon name="ui/twitter" /></a></li>
          <li><a href=""><img src="~assets/google.svg" alt=""></a></li>
        </ul>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'SignInModal',
  data: () => ({
    model: {},
    errors: {
      no_required_fields: {text: 'Заполните все поля', show: false},
      user_not_found: {text: 'Пользователь не найден', show: false}
    },
    passwordType: 'password'
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
    togglePasswordType() {
      this.passwordType = (this.passwordType == 'password') ? 'text' : 'password'
    },
    async signIn() {
      let formData = new FormData()
      formData.append('emailorphone', this.model.emailorphone)
      formData.append('pass', this.model.pass)
      const { data } = await this.$store.dispatch('user/signIn', formData)
      if(typeof data.error != 'undefined') {
        this.errors[data.error].show = true
      } else {
        formData = new FormData()
        formData.append('api_token', data.response.api_token)
        this.$store.dispatch('user/auth', formData)
        localStorage.setItem('token', data.response.api_token)
        this.closeModal()
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
  }
}
</script>
