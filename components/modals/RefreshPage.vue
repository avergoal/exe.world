<template>
  <div class="modalinfo thanksmodal small">
    <button @click="refreshPage" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
      <div class="title">{{ $t('Modal_refresh_page') }}</div>
      <div class="desc">{{ $t('Modal_refresh_page_text') }}</div>
      <button @click="refreshPage" type="button" class="btn btn_small st2">{{ $t('Button_refresh') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefreshPage',
  methods: {
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>
