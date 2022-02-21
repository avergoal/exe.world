<template>
<div class="modalinfo friendsmodal report small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent reportbox">
    <div class="title">Report</div>
    <perfect-scrollbar vref="scroll">
      <div class="desc">State the reason for the report:</div>
      <form @submit.prevent action="">
        <ul v-if="subjects" class="radio">
          <li v-for="(e, i) in subjects" :key="i">
            <input v-model="model.subject" :value="e.id" type="radio" name="radio" :id="'subject_' + e.id">
            <label v-html="e.title" :for="'subject_' + e.id"></label>
          </li>
        </ul>
        <textarea v-model="model.comment" name="" placeholder="Describe the problem"></textarea>
        <div class="btns">
          <button @click="$root.$emit('toggleModal', {target: 'friends'})" type="button" class="btn st3">cancel</button>
          <button @click="submit()" type="button" class="btn st2">send report</button>
        </div>
      </form>
    </perfect-scrollbar>
  </div>
</div>
</template>

<script>
export default {
	name: 'UserReportModal',
  data: () => ({
    model: {
      subject: 1,
      comment: ''
    }
  }),
  created() {
    if(!this.subjects) {
      this.load()
    }
  },
  methods: {
    load() {
      this.$store.dispatch('app/setReportSubjects')
    },
    async submit() {
      await this.$store.dispatch('users/report', {
        uid: this.modal.user.uid,
        type: this.model.subject,
        comment: this.model.comment
      })
      this.$root.$emit('toggleModal', {target: 'userReported'})
    }
  },
  computed: {
    subjects() {
      return this.$store.getters['app/subjects'].report
    },
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
