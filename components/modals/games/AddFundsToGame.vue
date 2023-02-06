<template>
  <div class="modalinfo gamefundmodal bigger">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close" />
    </button>
    <div class="modalcontent">
        <AddFunds/>
    </div>
  </div>
</template>

<script>
import AddFunds from "~/components/modals/personal/tabs/AddFunds.vue";
export default {
  name: "AddFundsToGame",
  components: {AddFunds}
}
</script>

<style scoped>

</style>
