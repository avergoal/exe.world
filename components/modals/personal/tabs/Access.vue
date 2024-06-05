<template>
<div class="tab access">
  <div class="title">
    <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button"><svg-icon name="ui/back" /></button>
    {{ $t('Header_profile_dropdown_menu_access') }}
  </div>
  <perfect-scrollbar ref="scroll_tab">
    <form @submit.prevent action="">
      <div class="item">
        <div class="desc">{{ $t('Profile_acces_2') }}</div>
        <div class="subdesc">{{$t('Profile_acces_text_email')}}</div>
        <fieldset>
          <input v-model="model.email" :placeholder="model.emailPlaceholder" :readonly="readonly" @mouseover="readonly = false" type="email" name="" value="" id="currentemail">
          <label for="currentemail">{{ $t('Profile_acces_email_input') }}</label>
          <span v-if="errors.email_mismatch.open" v-html="$t(errors.email_mismatch.text)" class="error-span"></span>
          <span v-if="errors.email_same.open" v-html="$t(errors.email_same.text)" class="error-span"></span>
        </fieldset>
        <fieldset><input v-model="model.newEmail" type="email" name="" value="" :placeholder="$t('Profile_acces_new_email_input')"></fieldset>
        <fieldset><input v-model="model.repeatMewEmail" type="email" name="" value="" :placeholder="$t('Profile_acces_new_email_repeat_input')"></fieldset>
      </div>
      <div class="item">
        <div class="desc">{{ $t('Profile_acces_3') }}</div>
        <div class="subdesc">{{$t('Profile_acces_text_password')}}</div>
        <fieldset>
          <input v-model="model.currentPassword" :type="passwordType" name="" value="" :placeholder="$t('Profile_acces_password_input')">
          <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
           <span v-if="errors.pass_too_short.open" v-html="$t(errors.pass_too_short.text)" class="error-span"></span>
          <span v-if="errors.pass_missmatch.open" v-html="$t(errors.pass_missmatch.text)" class="error-span"></span>
        </fieldset>
        <fieldset>
          <input v-model="model.newPassword" :type="passwordType" name="" value="" :placeholder="$t('Profile_acces_new_password')">
          <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
        </fieldset>
        <fieldset>
          <input v-model="model.repeatMewPassword" :type="passwordType" name="" value="" :placeholder="$t('Profile_acces_new_password_input')">
          <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
        </fieldset>
      </div>
      <button @click="saveData()" type="button" class="btn st2">{{ $t('Button_save') }}</button>
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
        text: 'Alert_email_mismatch'
      },
      email_same: {
        open: false,
        text: 'Alert_email_same'
      },
      pass_too_short: {
        open: false,
        text: 'Alert_password_too_short'
      },
      pass_missmatch: {
        open: false,
        text: 'Alert_password_mismatch'
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
      let error = {}
      if((this.model.email && this.model.newEmail && this.model.repeatMewEmail) ||
        (!this.model.email && !this.model.newEmail && !this.model.repeatMewEmail)){
        error = await this.$store.dispatch('settings/updateAccess', {
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
          })
        }
      }else {
        this.errors.email_mismatch.open = true
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
