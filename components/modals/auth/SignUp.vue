<template>
  <div class="modalinfo authmodal small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
      <div class="top"><a @click.prevent="goHome()" href="/" class="logo">
          <svg-icon name="logo" />
        </a></div>
      <form @submit.prevent="signUp()" action="">
        <fieldset><input v-model="model.name" type="text" placeholder="Your name"></fieldset>
        <fieldset>
          <input v-model="model.emailorphone" :class="{error: errors.email_exists.show || errors.email_not_valid.show}"
            type="text" placeholder="E-mail or Phone">
          <span v-if="errors.email_exists.show || errors.email_not_valid.show"
            v-html="(errors.email_exists.show) ? errors.email_exists.text : errors.email_not_valid.text"
            class="error"></span>
        </fieldset>
        <fieldset>
          <input v-model="model.pass" :class="{error: errors.pass_too_short.show}" :type="passwordType"
            placeholder="Password">
          <button @click="togglePasswordType()" type="button">
            <svg-icon name="ui/eye" />
          </button>
          <span v-if="errors.pass_too_short.show" v-html="errors.pass_too_short.text" class="error"></span>
        </fieldset>
        <fieldset>
          <input v-model="model.pass_check" :class="{error: errors.passwords_does_not_match.show}" :type="passwordType"
            placeholder="Repeat password">
          <button @click="togglePasswordType()" type="button">
            <svg-icon name="ui/eye" />
          </button>
          <span v-if="errors.passwords_does_not_match.show" v-html="errors.passwords_does_not_match.text"
            class="error"></span>
        </fieldset>
        <div class="btns">
          <button type="submit" class="btn st2">sign up</button>
          <a href="https://exe.ru/rules" class="btns__privacy">privacy policy</a>
        </div>
        <div class="signup">
          <div class="text">Already have an account?</div>
          <button @click="$root.$emit('toggleModal', {target: 'signIn'})" type="button">log in</button>
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
	name: 'SignUpModal',
  data: () => ({
    model: {},
    errors: {
      email_exists: {text: 'Email уже зарегистрирован', show: false},
      email_not_valid: {text: 'Не верный формат email', show: false},
      pass_too_short: {text: 'Пароль слишком короткий', show: false},
      passwords_does_not_match: {text: 'Пароли не совпадают', show: false}
    },
    passwordType: 'password'
  }),
  methods: {
    async signUp() {
      Object.keys(this.errors).map(e => this.errors[e].show = false)
      const error = await this.$store.dispatch('auth/signUp', {
        name: this.model.name,
        emailorphone: this.model.emailorphone,
        pass: this.model.pass,
        pass_check: this.model.pass_check
      })
      if(error) {
        this.errors[error].show = true
      } else this.$root.$emit('toggleModal', {})
    },
    async socialAuth(e) {
      const url = await this.$store.dispatch('auth/authSocilas', e)

      if (url) {
        let handler, timer
        //this.$root.$emit('setLoader', false)
        if (handler) handler.close()
        handler = window.open(url, 'paymentProccess')
        timer = setInterval(() => {
          if (handler.closed) {
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
