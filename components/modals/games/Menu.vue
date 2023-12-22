<template>
  <div class="modalinfo gamemodal menumodal small">
    <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
      <svg-icon name="ui/close"/>
    </button>
    <div class="modalcontent menu">
      <div class="topinfo">
        <div class="img"><img :src="modal.game.icon.hires?modal.game.icon.hires:modal.game.icon.default" alt=""></div>
        <div v-html="modal.game.title" class="name"></div>
      </div>
      <ul class="menu">
        <!--      <li><button type="button">Send game notifications</button></li>-->
        <li>
          <button type="button" @click="toggleFullscreen">{{ fullscreen?'Exit Fullscreen':'Fullscreen' }}</button>
        </li>
        <li>
          <button type="button" @click="closeGame">Close the application</button>
        </li>
        <li>
          <button type="button" @click="to(modal.game.tos_url)">Terms of use</button>
        </li>
        <li>
          <button type="button" @click="$root.$emit('toggleModal', {target: 'developer',developer:modal.game.developer})">About the developer</button>
        </li>
        <li>
          <button @click="$root.$emit('toggleModal', {target: 'gameRemove', game: modal.game.gid})" type="button">Delete
            from my games
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameMenuModalComponent',
  data:() => ({
    fullscreen:false
  }),
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  },
  methods: {
    to(url) {
      if(!url){
        url = window.location.origin + this.$router.resolve({ path: '/privacy' }).href
      }
      window.open(url, "_blank");
    },
    closeGame(){
      this.$router.push('/')
      this.$root.$emit('toggleModal',{})
    },
    toggleFullscreen() {
      const elem = document.documentElement; // Get the root element (HTML)

      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen(); // Standard
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(); // Webkit browsers
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen(); // IE11
        }
        this.fullscreen = true
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen(); // Standard
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Webkit browsers
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE11
        }
        this.fullscreen = false

      }
    }
  }
}
</script>
