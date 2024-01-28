<template>
<footer class="main">
  <div class="copywrite">© {{ getYear }} EXE. WORLD | All rights reserved</div>
  <ul>
    <li><nuxt-link to="/about">About</nuxt-link></li>
    <li><button @click="$root.$emit('toggleModal', {target: 'help'})" type="button">Help</button></li>
    <li><a href="https://dev.exe.world" target="_blank">For Developers</a></li>
  </ul>
</footer>
</template>
<script>
export default {
	name: 'FooterComponent',
  computed:{
    getYear(){
      return new Date().getFullYear();
    }
  }
}
</script>
