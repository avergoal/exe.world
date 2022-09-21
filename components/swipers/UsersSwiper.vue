<template>
<div class="users_slider">
  <div class="boxtitle">
    <span v-html="title"></span>
    <button v-if="target" @click="setRoute(target)" type="button"><svg-icon name="ui/more"/></button>
    <button v-if="tab" @click="$root.$emit('toggleModal', {target: tab})" type="button"><svg-icon name="ui/more"/></button>
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
  props: ['slides', 'between', 'title', 'target', 'tab'],
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
    async openUser(e) {
      if(!this.profile) {
        this.$root.$emit('toggleModal', {target: 'signIn'})
        this.closeSearch()
      } else if(this.profile.uid === e) {
        this.$root.$emit('toggleModal', {target: 'personalData', tab: 'personal'})
      } else {
        this.$root.$emit('updateUserProfile', e)
        this.closeSearch()
      }
    },
    setRoute(target) {
      this.$root.$emit('changeTemplate', target)
      this.closeSearch()
    },
    closeSearch() {
      this.$root.$emit('closeSearch')
    }
  },
  computed: {
    search_peoples() {
      return this.$store.getters['search/results'].peoples
    },
    user_profile_friends() {
      let friends = this.$store.getters['users/profile'].friends
      return (friends) ? friends.users : []
    },
    user_profile_mutual_friends() {
      let friends = this.$store.getters['users/profile'].mutual_friends
      return (friends) ? friends.users : []
    },
    profile() {
      return this.$store.getters['profile/data']
    }
  }
}
</script>
