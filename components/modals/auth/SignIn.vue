<template>
<div class="modalinfo authmodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">
      <a @click.prevent="goHome()" modalinfo gamemodalsignin bighref="/" class="logo"><svg-icon name="logo" /></a>
    </div>
    <form @submit.prevent="signIn()" action="">
      <div class="alert" v-if="errors.user_not_found.show" v-html="$t(errors.user_not_found.text)"></div>
      <fieldset>
        <input v-model="model.emailorphone" :class="{error: errors.no_required_fields.show || errors.user_not_found.show}" type="text" :placeholder="$t('FORMS_login_input_email')">
        <span v-if="errors.no_required_fields.show" v-html="$t(errors.no_required_fields.text)" class="error"></span>
      </fieldset>
      <fieldset>
        <input v-model="model.pass" :class="{error: errors.no_required_fields.show || errors.user_not_found.show}" :type="passwordType" :placeholder="$t('FORMS_login_input_password')">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
        <span v-if="errors.no_required_fields.show" v-html="$t(errors.no_required_fields.text)" class="error"></span>
      </fieldset>
      <div class="btns">
        <button type="submit" class="btn st2">{{ $t('Button_login') }}</button>
        <button @click="$root.$emit('toggleModal', {target: 'restorePassword'})" type="button" class="link">{{ $t('FORMS_login_forgotpassword') }}</button>
      </div>
      <div class="signup">
        <div class="text">{{ $t('FORMS_guest_ingame_login_text') }}</div>
        <button @click="$root.$emit('toggleModal', {target: 'signUp'})" type="button">{{ $t('FORMS_login_signup') }}</button>
      </div>
<!--      <div class="social">-->
<!--        <div class="text">Login via services</div>-->
<!--        <ul>-->
<!--          <li><button @click="socialAuth('fb')" type="button"><svg-icon name="ui/facebook" /></button></li>-->
<!--          &lt;!&ndash;-->
<!--          <li><a href=""><svg-icon name="ui/twitter" /></a></li>-->
<!--          <li><a href=""><img src="~assets/google.svg" alt=""></a></li>-->
<!--          &ndash;&gt;-->
<!--        </ul>-->
<!--      </div>-->
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
      no_required_fields: {text: 'Alert_no_required_fields', show: false},
      user_not_found: {text: 'Alert_user_not_found', show: false}
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
      } else {
        this.$root.$emit('toggleModal', {})
        if(this.$route.path.includes('/game/')){
          setTimeout(()=>{
            window.location.reload()
          },200)
        }
      }
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
