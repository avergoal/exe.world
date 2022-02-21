<template>
<div class="tab access">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button"><svg-icon name="ui/back" /></button>
    Access Settings
  </div>
  <perfect-scrollbar ref="scroll_tab">
    <form @submit.prevent action="">
      <div class="item">
        <div class="desc">Change E-mail</div>
        <div class="subdesc">After changing the e-mail, a confirmation link will be sent to the new address</div>
        <fieldset>
          <input v-model="model.email" :placeholder="model.emailPlaceholder" :readonly="readonly" @mouseover="readonly = false" type="email" name="" value="" id="currentemail">
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
  </perfect-scrollbar>
</div>
</template>

<script>
export default {
  name: 'AccessTab',
  data: () => ({
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
    },
    readonly: true
  }),
  created() {
    this.loadUserData()
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll_tab) {
        setTimeout(() => {
          this.$refs.scroll_tab.update()
        }, 100)
      }
    })
  },
  mounted() {
    console.log(this.$refs)
  },
  methods: {
    async saveData() {
      const error = await this.$store.dispatch('settings/updateAccess', {
        email: this.model.email,
        new_email: this.model.newEmail,
        new_email_check: this.model.repeatMewEmail,
        pass: this.model.currentPassword,
        new_pass: this.model.newPassword,
        new_pass_check: this.model.repeatMewPassword
      })
      Object.keys(this.errors).map(e => this.errors[e].open = false)
      if(error && this.errors[error]) {
        this.errors[error].open = true
      }
      if(!error) {
        this.$root.$emit('toggleModal', {
          target: 'notification',
          data: {
            title: 'Updated',
            text: 'Все обновилось'
          }
        })
      }
    },
    loadUserData() {
      this.model.emailPlaceholder = this.settings.email
    },
    togglePasswordType() {
      this.passwordType = (this.passwordType == 'password') ? 'text' : 'password'
    }
  },
  computed: {
    profile() {
      return this.$store.getters['profile/data']
    },
    settings() {
      console.log(this.$store.getters['settings/access'])
      return this.$store.getters['settings/access']
    }
  }
}
</script>
