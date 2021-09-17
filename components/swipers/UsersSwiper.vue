<template>
<div class="users_slider">
  <div class="boxtitle">
    <span v-html="title"></span>
    <button v-if="target" @click="setRoute(target)" type="button"><svg-icon name="ui/more"/></button>
  </div>
  <div v-if="config" class="swiperbox">
    <swiper :options="config" ref="newSwiper">
      <swiper-slide v-for="(e, i) in data" :key="i">
        <button @click="openUser(e.uid)" type="button">
          <div class="userphoto"><img :src="e.avatar_urls.x100" :alt="e.user_name"></div>
          <div class="name" v-html="e.user_name"></div>
        </button>
      </swiper-slide>
    </swiper>
    <div class="swipernav">
      <button :class="'prev_'+_uid" class="prev b" type="button"><svg-icon name="ui/swiper_prev"/></button>
      <button :class="'next_'+_uid" class="next b" type="button"><svg-icon name="ui/swiper_next"/></button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UsersSwiperTemplate',
  props: ['slides', 'between', 'title', 'target'],
  data: () => ({
    config: null,
    data: []
  }),
  mounted() {
    this.data = this[this.slides]
    this.config = {
      slidesPerView: 'auto',
      spaceBetween: Number(this.between),
      navigation: {
        prevEl: '.prev_'+this._uid,
        nextEl: '.next_'+this._uid
      }
    }
  },
  methods: {
    openUser(e) {
      this.$store.dispatch('search/setOpen', false)
      this.$root.$emit('modalOpen', {
        open: true,
        target: 'userProfile',
        message: null,
        status: false,
        tab: e
      })
    },
    setRoute(target) {
      this.$store.dispatch('search/setOpen', false)
      this.$store.dispatch('app/setPage', target)
    }
  },
  computed: {
    search_peoples() {
      return this.$store.getters['search/peoples']
    },
    user_profile_friends() {
      return this.$store.getters['users/profile'].friends.users
    },
    user_profile_mutual_friends() {
      return this.$store.getters['users/profile'].mutual_friends.users
    }
  }
}
</script>
