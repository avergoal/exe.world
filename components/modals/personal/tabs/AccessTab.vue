<template>
<div class="tab access">
  <div class="title">Access Settings</div>
  <form action="">
    <div class="item">
      <div class="desc">Change E-mail</div>
      <div class="subdesc">After changing the e-mail, a confirmation link will be sent to the new address</div>
      <fieldset>
        <input v-model="model.email" type="email" name="" value="" id="currentemail" :placeholder="model.emailPlaceholder">
        <label for="currentemail">Current e-mail</label>
      </fieldset>
      <fieldset><input v-model="model.newEmail" type="email" name="" value="" placeholder="New e-mail"></fieldset>
      <fieldset><input v-model="model.repeatMewEmail" type="email" name="" value="" placeholder="Repeat new e-mail"></fieldset>
    </div>
    <div class="item">
      <div class="desc">Change Password</div>
      <div class="subdesc">To change your password, you need to enter your current password to confirm</div>
      <fieldset>
        <input v-model="model.currentPassword" :type="passwordType" name="" value="" placeholder="Current password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
      <fieldset>
        <input v-model="model.newPassword" :type="passwordType" name="" value="" placeholder="New password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
      <fieldset>
        <input v-model="model.repeatMewPassword" :type="passwordType" name="" value="" placeholder="Repeat new password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
    </div>
    <button @click="saveData()" type="button" class="btn st2">Save changes</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'AccessTab',
  data() {
    return{
      passwordType: 'password',
      model: {
        email: '',
        emailPlaceholder: '',
        newEmail: '',
        repeatMewEmail: '',
        currentPassword: '',
        newPassword: '',
        repeatMewPassword: ''
      },
      errors: {
        email_mismatch: {
          open: false,
          text: 'Email mismatch'
        },
        email_same: {
          open: false,
          text: 'Email same'
        },
        pass_missmatch: {
          open: false,
          text: 'Pass missmatch'
        }
      }
    }
  },
  created() {
    this.loadUserData()
  },
  methods: {
    async saveData() {
      const error = await this.$store.dispatch('settings/access', {
        email: this.model.email,
        new_email: this.model.newEmail,
        new_email_check: this.model.repeatMewEmail,
        pass: this.model.currentPassword,
        new_pass: this.model.newPassword,
        new_pass_check: this.model.repeatMewPassword
      })
      for(let e in this.errors) {
        this.errors[e].open = false
      }
      if(error && this.errors[error]) {
        this.errors[error].open = true
      }
    },
    loadUserData() {
      this.model.emailPlaceholder = this.user.settings.access.email
    },
    togglePasswordType() {
      this.passwordType = (this.passwordType == 'password') ? 'text' : 'password'
    }
  },
  computed: {
    user() {
      return this.$store.getters['profile/user']
    }
  }
}
</script>
