<template>
<div class="modalinfo authmodal logoutbox small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">Log Out</div>
    <div class="text">Are you sure you want to log out of your account?</div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">cancel</button>
      <button @click="logOut()" type="button" class="btn st3">Yes, log out</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'LogOutModal',
  methods: {
    logOut() {
      localStorage.removeItem('token')
      window.location.reload()
    }
  }
}
</script>
