<template>
<div class="modalinfo myphotomodal small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="title">Profile Photo</div>
    <client-only>
      <div class="editor">
        <div class="photo">
          <div class="avatar-cropper-container">
            <div :class="{active: dataUrl}" class="avatar-cropper-image-container">
              <svg-icon v-if="!dataUrl" name="ui/noimage"/>
              <img v-if="dataUrl" :src="dataUrl" @load.stop="createCropper" @error="onImgElementError" ref="img" />
            </div>
          </div>
        </div>
        <div class="btn">
          <input @change="onFileInputChange" :accept="cleanedMimes" :capture="capture" ref="input" type="file" />
          <span>Choose file</span>
        </div>
      </div>
    </client-only>
    <div class="btns">
      <button @click="cancel" type="button" class="btn st3">cancel</button>
      <button type="button" class="btn st2">save changes</button>
      <!--  @click.stop.prevent="submit" -->
    </div>
  </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default{
  name: 'MyPhotoEditor',
  components: {
    Cropper
  },
  model: {
    prop: 'trigger',
    event: 'triggered',
  },
  props: {
    uploadHandler: { type: Function },
    uploadUrl: { type: String },
    uploadHeaders: { type: Object },
    outputOptions: { type: Object },
    requestMethod: {
      type: String,
      default: 'POST',
    },
    uploadFormName: {
      type: String,
      default: 'file',
    },
    uploadFormData: {
      type: Object,
      default() {
        return {}
      },
    },
    cropperOptions: {
      type: Object,
      default() {
        return {
          aspectRatio: 1,
          autoCropArea: 1,
          viewMode: 1,
          movable: false,
          zoomable: false,
        }
      },
    },
    outputMime: {
      type: String,
      default: null,
    },
    outputQuality: {
      type: Number,
      default: 0.9,
    },
    mimes: {
      type: String,
      default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
    },
    capture: { type: String },
    withCredentials: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return{
      cropper: undefined,
      dataUrl: undefined,
      filename: undefined,
      trigger: {
        type: Boolean,
        default: false,
        required: false,
      }
    }
  },
  mounted() {
    this.$emit('triggered', false)
  },
  methods: {
    destroy() {
      if(this.cropper) {
        this.cropper.destroy()
      } else {
        this.$refs.input.value = ''
        this.dataUrl = undefined
      }
    },
    submit() {
      this.$emit('submit')
      if (this.uploadUrl) {
        this.uploadImage()
      } else if (this.uploadHandler) {
        this.uploadHandler(this.cropper)
      } else {
        this.$emit('error', 'No upload handler found.', 'user')
      }
      this.destroy()
    },
    cancel(){
        this.$emit('cancel')
        this.destroy()
    },
    onImgElementError() {
      this.$emit('error', 'File loading failed.', 'load')
      this.destroy()
    },
    pickImage() {
      this.$refs.input.click()
    },
    onFileInputChange(e) {
      if(e.target.files !== null && e.target.files[0] !== null) {
        const file = e.target.files[0]
        if(this.cleanedMimes === 'image/*') {
          if(file.type.split('/')[0] !== 'image') {
            this.$emit('error', 'File type not correct.', 'user')
            return
          }
        } else {
          const correctType = this.cleanedMimes.split(', ').find((mime) => mime === file.type)
          if(!correctType) {
            this.$emit('error', 'File type not correct.', 'user')
            return
          }
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          this.dataUrl = e.target.result
        }
        reader.readAsDataURL(file)
        this.filename = file.name || 'unknown'
        this.mimeType = this.mimeType || file.type
        this.$emit('changed', file, reader)
      }
    },
    createCropper() {
      this.cropper = new Cropper(this.$refs.img, this.cropperOptions)
    },
    uploadImage() {
      this.cropper.getCroppedCanvas(this.outputOptions).toBlob(
        (blob) => {
          const form = new FormData()
          const xhr = new XMLHttpRequest()
          const data = Object.assign({}, this.uploadFormData)
          xhr.withCredentials = this.withCredentials
          for(const key in data) {
            form.append(key, data[key])
          }
          form.append(this.uploadFormName, blob, this.filename)
          this.$emit('uploading', form, xhr)
          xhr.open(this.requestMethod, this.uploadUrl, true)
          for(const header in this.uploadHeaders) {
            xhr.setRequestHeader(header, this.uploadHeaders[header])
          }
          xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
              let response = ''
              try {
                response = JSON.parse(xhr.responseText)
              } catch (err) {
                response = xhr.responseText
              }
              this.$emit('completed', response, form, xhr)
              if([200, 201, 204].indexOf(xhr.status) > -1) {
                this.$emit('uploaded', response, form, xhr)
              } else {
                this.$emit('error', 'Image upload fail.', 'upload', xhr)
              }
            }
          }
          xhr.send(form)
        },
        this.outputMime,
        this.outputQuality,
      )
    },
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
    },
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
