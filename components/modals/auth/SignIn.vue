<template>
<div class="modalinfo authmodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
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
        <button @click="$root.$emit('toggleModal', {target: 'restorePassword'})" type="button" class="link">forgot password?</button>
      </div>
      <div class="signup">
        <div class="text">Don't have an account yet?</div>
        <button @click="$root.$emit('toggleModal', {target: 'signUp'})" type="button">sign up</button>
      </div>
      <div class="social">
        <div class="text">Login via services</div>
        <ul>
          <li><button @click="socialAuth('fb')" type="button"><svg-icon name="ui/facebook" /></button></li>
          <!--
          <li><a href=""><svg-icon name="ui/twitter" /></a></li>
          <li><a href=""><img src="~assets/google.svg" alt=""></a></li>
          -->
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
    async signIn() {
      Object.keys(this.errors).map(e => this.errors[e].show = false)
      const error = await this.$store.dispatch('auth/signIn', {
        emailorphone: this.model.emailorphone,
        pass: this.model.pass
      })
      if(error) {
        this.errors[error].show = true
      } else this.$root.$emit('toggleModal', {})
    },
    async socialAuth(e) {
      const url = await this.$store.dispatch('auth/authSocilas', e)

      if(url) {
        let handler, timer
        //this.$root.$emit('setLoader', false)
        if(handler) handler.close()
        handler = window.open(url, 'paymentProccess')
        timer = setInterval(() => {
          if(handler.closed) {
            clearInterval(timer)
            console.log('close', handler)
          }
        }, 500)
        //window.open(url, '_blank')
      }
    },
    goHome() {
      this.$root.$emit('toggleModal', {})
      if(this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    togglePasswordType() {
      this.passwordType = (this.passwordType == 'password') ? 'text' : 'password'
    }
  }
}
</script>
