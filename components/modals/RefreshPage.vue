<template>
  <div class="modalinfo thanksmodal small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
      <div class="title">Refresh the page</div>
      <div class="desc">You haven't been active for a long time. Please refresh the page.</div>
      <button @click="refreshPage" type="button" class="btn btn_small st2">refresh</button>
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
