<template>
<div class="modalinfo myphotomodal small">
  <button @click="$root.$emit('toggleModal', {target: 'personalData'})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Profile Photo</div>
    <client-only>
      <div class="editor">
        <div class="photo">
          <div class="avatar-cropper-container">
            <div :class="{active: dataAvatar && !errors.active}" class="avatar-cropper-image-container">
              <svg-icon v-if="!dataAvatar || errors.active" name="ui/noimage"/>
              <img v-else-if="dataAvatar" :src="dataAvatar" @load.stop="createCropper" ref="img" />
            </div>
          </div>
        </div>
        <div class="btn">
          <input @change="onFileInputChange" :accept="cleanedMimes" :capture="capture" ref="input" type="file" />
          <span>Choose file</span>
        </div>
      </div>
    </client-only>
    <div v-if="errors.active" class="errors">
      <p v-if="errors.sizes">The image size cannot be less than 220x220 pixels</p>
      <p v-if="errors.mimes">Only allowed to download (*.jpg, *.jpeg or *.png) files</p>
      <p v-if="errors.submit">You have not selected an image</p>
    </div>
    <div class="btns">
      <button @click="$root.$emit('toggleModal', {target: 'personalData'})" type="button" class="btn st3">cancel</button>
      <button @click="submit()" type="button" class="btn st2">save changes</button>
    </div>
  </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default{
  name: 'MyPhotoEditor',
  components: {Cropper},
  model: {prop: 'trigger', event: 'triggered'},
  props: {
    uploadHandler: { type: Function },
    uploadUrl: {type: String},
    uploadHeaders: {type: Object},
    outputOptions: {type: Object},
    requestMethod: {type: String, default: 'POST'},
    uploadFormName: {type: String, default: 'file'},
    uploadFormData: {type: Object, default() {return {}}},
    cropperOptions: {type: Object, default() {return {aspectRatio: 1, autoCropArea: 1, viewMode: 1, movable: false, zoomable: false}}},
    outputMime: {type: String, default: null},
    outputQuality: {type: Number,default: 0.9},
    mimes: {type: String, default: 'image/png, image/jpeg'},
    capture: {type: String},
    withCredentials: {type: Boolean, default: false}
  },
  data: () => ({
    cropper: undefined,
    sizes: [400, 400],
    errors: {
      active: false,
      sizes: false,
      mimes: false,
      submit: false
    },
    dataAvatar: undefined,
    filename: undefined,
    trigger: {type: Boolean, default: false, required: false}
  }),
  mounted() {
    this.$emit('triggered', false)
  },
  methods: {
    async submit() {
      this.clearErrors()
      if(this.cropper) {
        this.$emit('submit')
        this.cropper.getCroppedCanvas(this.outputOptions).toBlob(async (blob) => {
          await this.$store.dispatch('settings/uploadPhoto', blob)
          this.$root.$emit('toggleModal', {target: 'personalData'})
        }, this.outputMime, this.outputQuality)
      } else {
        this.errors.active = true
        this.errors.submit = true
      }
    },
    createCropper() {
      if(this.cropper) this.cropper.destroy()
      this.cropper = new Cropper(this.$refs.img, this.cropperOptions)
    },
    onFileInputChange(e) {
      this.clearErrors()
      if(e.target.files && e.target.files[0]) {
        let file = e.target.files[0],
            checkMime = this.cleanedMimes.split(', ').find((mime) => mime === file.type)
        if(!checkMime) {
          this.errors.active = true
          this.errors.mimes = true
          this.cropper.destroy()
        } else {
          let reader = new FileReader()
          reader.onload = (e) => {
            let img = new Image()
            img.src = e.target.result
            img.onload = () => {
              if(this.checkSizes(img)) {
                this.dataAvatar = e.target.result
              } else if(this.cropper) this.cropper.destroy()
            }
          }
          if(!this.errors.active) {
            reader.readAsDataURL(file)
            this.filename = file.name || 'unknown'
            this.mimeType = this.mimeType || file.type
            this.$emit('changed', file, reader)
          }
        }
      }
    },
    pickImage() {
      this.$refs.input.click()
    },
    checkSizes(e) {
      if(!e.naturalWidth || e.naturalWidth < this.sizes[0] || !e.naturalHeight || e.naturalHeight < this.sizes[1]) {
        this.errors.active = true
        this.errors.sizes = true
        return false
      }
      return true
    },
    clearErrors() {
      Object.keys(this.errors).map(e => this.errors[e] = false)
    }
  },
  computed: {
    pageType() {
      setTimeout(() => {
        if(typeof document != 'undefined') {
          document.getElementById('scroll').dispatchEvent(new Event('scroll'))
        }
      }, 100)
      return this.$store.getters['mainPage/pageType']
    },
    pageTitle() {
      return this.$store.getters['mainPage/pageTitle']
    },
    cleanedMimes() {
      return this.mimes.trim().toLowerCase()
    }
  },
  watch: {
    trigger(value) {
      if(!value) {
        return
      }
      this.pickImage()
      this.$emit('triggered', false)
    },
  }
}
</script>
