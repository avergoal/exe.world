<template>
<div class="modalinfo gamemodals signin small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="photo">
      <div class="img"><img src="" alt=""></div>
      <div class="desc">Login or register so as not to lose your progress in the game</div>
      <form action="">
        <fieldset><input type="text" name="" value="" placeholder="E-mail or Phone"></fieldset>
        <fieldset>
          <input :type="passwordType" name="" value="" placeholder="Password">
          <button @click="togglePasswordType()" type="button"><svg-icon name="ui/eye" /></button>
        </fieldset>
        <div class="btns">
          <button type="submit" class="btn st2">Log in</button>
          <button @click="$parent.openModal('restorePassword')" type="button" class="link">forgot password?</button>
        </div>
        <div class="signup">
          <div class="text">Don't have an account yet?</div>
          <button @click="$parent.openModal('signUp')" type="button">sign up</button>
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
</div>
</template>

<script>
export default {
	name: 'GameSignInModal'
}
</script>
