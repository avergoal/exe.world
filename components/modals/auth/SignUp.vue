<template>
<div class="modalinfo authmodal small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">
      <a @click.prevent="goHome()" href="/" class="logo"><svg-icon name="logo" /></a>
    </div>
    <form action="">
      <fieldset><input type="text" name="" value="" placeholder="Your name"></fieldset>
      <fieldset><input type="text" name="" value="" placeholder="E-mail or Phone"></fieldset>
      <fieldset>
        <input :type="passwordType" name="" value="" placeholder="Password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
      <fieldset>
        <input :type="passwordType" name="" value="" placeholder="Repeat password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
      <div class="btns"><button type="submit" class="btn st2">sign up</button></div>
      <div class="signup">
        <div class="text">Already have an account?</div>
        <button @click="$parent.openModal('signIn')" type="button">log in</button>
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
	name: 'SignUpModal',
  data() {
    return{
      passwordType: 'password'
    }
  },
  methods: {
    goHome() {
      this.$store.dispatch('modals/setModalOpen', {
        open: false,
        target: null
      })
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
