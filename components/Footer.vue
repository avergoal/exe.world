<template>
<footer class="main">
  <div class="copywrite">© 2020 EXE. WORLD | All rights reserved</div>
  <ul>
    <li><nuxt-link to="/about">About</nuxt-link></li>
    <li><button @click="$root.$emit('toggleModal', {target: 'help'})" type="button">Help</button></li>
    <li><nuxt-link to="/">For Developers</nuxt-link></li>
  </ul>
</footer>
</template>
<script>
export default {
	name: 'FooterComponent'
}
</script>
