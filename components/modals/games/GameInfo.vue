<template>
<div class="modalinfo gamemodal info big">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="top">
      <div class="img"><img :src="game.photo" alt=""></div>
      <div class="info">
        <div v-html="game.name" class="title">Knight Wars</div>
        <div class="btns">
          <div class="item"><button type="button" class="btn st2">launch game</button></div>
          <div class="item">
            <button @click="shareOpen = !shareOpen" type="button" class="btn st3 toggleshare">share</button>
            <div :class="{open: shareOpen}" class="dropdown">
              <ul class="menu">
                <li>
                  <a href="">
                    <div class="ico"><svg-icon name="ui/facebook" /></div>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div class="ico"><svg-icon name="ui/twitter" /></div>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div class="ico"><svg-icon name="ui/vk" /></div>
                    <span>VK</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="screens">
      <div class="boxtitle">Screenshots</div>
      <div class="swiperbox">
        <swiper :options="config" ref="newSwiper">
          <swiper-slide v-for="(e, i) in game.screenList" :key="i">
            <div @click="index = i" class="img">
              <img :src="e">
              <span><svg-icon name="ui/plus" /></span>
            </div>
          </swiper-slide>
        </swiper>
        <!--div class="swipernav">
          <button class="prev_screen b" type="button"><svg-icon name="ui/swiper_prev"/></button>
          <button class="next_screen b" type="button"><svg-icon name="ui/swiper_next"/></button>
        </div-->
      </div>
    </div>
    <div class="desc">From the height of the castle hill, Count Henrik surveyed his Hochburg. Everything seems to be going as it should. The workers are carrying materials from the warehouse, actively pounding with hammers, expanding the forge and renovating the walls - the order given in the evening is being carried out. Archers have fun at the shooting range, filling targets with arrows.</div>
  </div>
  <CoolLightBox :items="game.screenList" :index="index" :effect="'fade'" @close="index = null" />
</div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
	name: 'GameInfoModal',
  components: {
    CoolLightBox
  },
  data() {
    return{
      config: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        navigation: {
          prevEl: '.prev_screen',
          nextEl: '.next_screen'
        }
      },
      shareOpen: false,
      index: null
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.dropdown') && !e.target.closest('.toggleshare')) {
        this.shareOpen = false
      }
    })
  },
  computed: {
    game() {
      return this.$store.getters['app/game']
    }
  }
}
</script>
