<template>
<div class="aboutpagebox">
  <div class="pagetitle">About <span class="exe">Exe.world</span></div>
  <div class="info">
    <div class="text">
      <p>
        We are glad to see you on the <span class="exe">Exe.world</span> gaming portal.
      </p>
      <p>
        <span class="exe">Exe.world</span> is a modern cross-platform gaming platform. Play your favorite browser html5 or unity games on any device for free and without registration.
      </p>
      <p>
        Just Games! Nothing more 🎮
      </p>

      <h5>
        The main advantages of the <span class="exe">Exe.world</span> gaming portal
      </h5>
      <ul>
        <li>Exe.world is available on all devices: desktop, tablet and mobile phones</li>
        <li>We have collected for you the best browser games on the network</li>
        <li>Play without registration. Or sign up in no time to keep progress.</li>
        <li>Nothing distracts you from the exciting gameplay</li>
        <li>A simple social component will help you find like-minded people ‒ play together!</li>
      </ul>

      <h5>
        Contact us
      </h5>
      <p>
        Business proposal: <span class="exe">office@exe.world</span>

        <br>
        Support and other: <span class="exe">admin@exe.world</span>

      </p>
    </div>
    <div class="img">
      <img v-if="theme" src="~/assets/illustration/about_inverse.svg" />
      <img v-else src="~/assets/illustration/about.svg" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const data = await store.dispatch('app/setAbout')
    return {data}
  },
  head() {
		return {
      title: this.data.title,
      meta: [{hid: 'description', name: 'description', content: this.data.title}]
    }
  },
  computed: {
    theme() {
      return this.$store.getters['app/theme']
    }
  }
}
</script>
