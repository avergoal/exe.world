<template>
  <div class="error-page-not-found">
    <img src="~/assets/illustration/game_not_found.svg"  alt="game_not_found"/>
    <h2>{{ $t('MAIN_page_not_found') }}</h2>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
