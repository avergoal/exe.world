<template>
<div class="tab access">
  <div class="title">Access Settings</div>
  <form action="">
    <div class="item">
      <div class="desc">Change E-mail</div>
      <div class="subdesc">After changing the e-mail, a confirmation link will be sent to the new address</div>
      <fieldset>
        <input type="text" name="" value="" id="currentemail">
        <label for="currentemail">Current e-mail</label>
      </fieldset>
      <fieldset><input type="text" name="" value="" placeholder="New e-mail"></fieldset>
      <fieldset><input type="text" name="" value="" placeholder="Repeat new e-mail"></fieldset>
    </div>
    <div class="item">
      <div class="desc">Change Password</div>
      <div class="subdesc">To change your password, you need to enter your current password to confirm</div>
      <fieldset>
        <input :type="passwordType" name="" value="" placeholder="Current password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
      <fieldset>
        <input :type="passwordType" name="" value="" placeholder="New password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
      <fieldset>
        <input :type="passwordType" name="" value="" placeholder="Repeat new password">
        <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
      </fieldset>
    </div>
    <button type="button" class="btn st2">Save changes</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'AccessTab',
  data() {
    return{
      passwordType: 'password'
    }
  },
  methods: {
    togglePasswordType() {
      this.passwordType = (this.passwordType == 'password') ? 'text' : 'password'
    }
  }
}
</script>
