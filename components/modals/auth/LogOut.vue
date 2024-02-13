<template>
<div class="modalinfo authmodal logoutbox small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">{{$t('Modal_logout')}}</div>
    <div class="alert" v-if="errors.length" v-for="error in errors">{{error}}</div>
    <div class="text">{{$t('Modal_logout_text')}}</div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st2">{{$t('Button_cancel')}}</button>
      <button @click="logOut()" type="button" class="btn st3">{{$t('Button_logout')}}</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'LogOutModal',
  data(){
    return{
      errors:[]
    }
  },
  methods: {
    async logOut() {
      this.errors = await this.$store.dispatch('auth/logout')
    }
  }
}
</script>
