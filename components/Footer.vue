<template>
<footer class="main">
  <div class="copywrite">© {{ getYear }} {{ $t('Footer_TEXT_copyright') }}</div>
  <ul>
    <li><nuxt-link to="/about">{{ $t('Footer_about') }}</nuxt-link></li>
    <li><button @click="$root.$emit('toggleModal', {target: 'help'})" type="button">{{ $t('Footer_help') }}</button></li>
    <li><a href="https://dev.exe.world" target="_blank">{{ $t('Footer_developers') }}</a></li>
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
