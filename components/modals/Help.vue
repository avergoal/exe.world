<template>
<div class="modalinfo helpmodal small">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">{{ $t('Footer_help') }}</div>
    <form @submit.prevent action="">
      <fieldset>
        <div class="selectbox">
          <button @click="subjectOpen = true" v-html="subject.title" type="button"></button>
          <ul :class="{open: subjectOpen}">
            <li v-for="(e, i) in subjects" :key="i">
              <button @click="subject = e" v-html="e.title" type="button"></button>
            </li>
          </ul>
        </div>
      </fieldset>
      <fieldset><input v-model="model.email" type="text" name="" value="" :placeholder="$t('FORMS_help_input_email')"></fieldset>
      <fieldset><input v-model="model.name" type="text" name="" value="" :placeholder="$t('FORMS_help_input_name')"></fieldset>
      <fieldset><textarea v-model="model.message" name="" :placeholder="$t('FORMS_help_input_message')"></textarea></fieldset>
      <fieldset v-if="errors" v-html="errors"></fieldset>
      <div class="btns">
        <button @click="$root.$emit('toggleModal', {})" type="button" class="btn st3">{{ $t('Button_cancel') }}</button>
        <button @click="submit()" type="button" class="btn st2">{{ $t('Button_send') }}</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'HelpModal',
  data: () => ({
    subject: {
      id: null,
      title: 'Select the subject of your appeal'
    },
    subjectOpen: false,
    model: {},
    errors: null
  }),
  created() {
    if(!this.subjects) {
      this.load()
    }
    this.$root.$on('scrollUpdate', () => {
      if(this.$refs.scroll) {
        setTimeout(() => {
          this.$refs.scroll.update()
        }, 100)
      }
    })
  },
  methods: {
    load() {
      this.$store.dispatch('app/setSupportSubjects')
    },
    async submit() {
      const response = await this.$store.dispatch('app/sendSupport', Object.assign(this.model, {subject: this.subject.id}))
      if(response) {
        this.errors = response
      } else {
        this.$root.$emit('toggleModal', {target: 'helpSubmited'})
      }
    }
  },
  computed: {
    subjects() {
      return this.$store.getters['app/subjects'].support
    }
  },
  watch: {
    subject() {
      this.subjectOpen = false
    }
  }
}
</script>
