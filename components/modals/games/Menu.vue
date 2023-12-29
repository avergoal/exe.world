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
        <li v-if="!isIOS">
          <button type="button" @click="toggleFullscreen"><svg-icon name="ui/fullscreen"/>{{ fullscreen?'Exit Fullscreen':'Fullscreen' }}</button>
        </li>
        <li>
          <button type="button" @click="closeGame"><svg-icon name="ui/exit"/>Exit game</button>
        </li>
<!--        <li>-->
<!--          <button type="button" @click="to(modal.game.tos_url)">Terms of use</button>-->
<!--        </li>-->
        <li>
          <button type="button" @click="$root.$emit('toggleModal', {target: 'developer',developer:modal.game.developer})"><svg-icon name="ui/about-circle"/>About developer</button>
        </li>
        <li>
          <button @click="$root.$emit('toggleModal', {target: 'gameRemove', game: modal.game.gid})" type="button"><svg-icon name="ui/remove-game"/>Remove</button>
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
  mounted() {
    console.log('pix')
    this.fullscreen = !document.fullscreenElement?false:true
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    },
    isIOS() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    },
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
      if (document.exitFullscreen) {
        document.exitFullscreen(); // Standard
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Webkit browsers
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE11
      }
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
