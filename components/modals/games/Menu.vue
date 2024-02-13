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
          <button type="button" @click="toggleFullscreen"><svg-icon name="ui/fullscreen"/>{{ fullscreen? $t('Game_modal_exit_fullscreen'):$t('Game_modal_fullscreen') }}</button>
        </li>
        <li>
          <button type="button" @click="closeGame"><svg-icon name="ui/exit"/>{{ $t('Game_modal_exit') }}</button>
        </li>
<!--        <li>-->
<!--          <button type="button" @click="to(modal.game.tos_url)">Terms of use</button>-->
<!--        </li>-->
        <li>
          <button type="button" @click="$root.$emit('toggleModal', {target: 'developer',developer:modal.game.developer})"><svg-icon name="ui/about-circle"/>About developer</button>
        </li>
        <li>
          <button @click="$root.$emit('toggleModal', {target: 'gameRemove', game: modal.game.gid})" type="button"><svg-icon name="ui/remove-game"/>
            {{ $t('Game_modal_remove') }}</button>
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
      if(this.fullscreen){
        if (document.exitFullscreen) {
          document.exitFullscreen(); // Standard
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Webkit browsers
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE11
        }
      }
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
