<script>
import IndexPage from "@/pages/index.vue";
import profile from "@/components/modals/users/Profile.vue";

export default {
  name: "slug",
  components: {IndexPage},
  computed: {
    profile() {
      return this.$store.getters['profile/data']
    },
  },
  watch: {
    profile(newVal){
      if(newVal){
        this.$root.$emit('toggleModal', {target: 'userProfile', user: this.$route.params.id})
      }
    }
  }
}
</script>
<template>
  <IndexPage/>
</template>

<style scoped>

</style>
