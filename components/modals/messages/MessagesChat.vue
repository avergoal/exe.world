<template>
<div class="modalinfo messagesmodal chat middle">
  <button @click="toggleModal(null)" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div class="usermodaltop">
      <button @click="toggleModal('messages')" type="button"><svg-icon name="ui/back" /></button>
      <div class="userphoto"><img :src="profile.user.avatar_urls.x100" :alt="profile.user.user_name"></div>
      <div class="info">
        <div v-html="profile.user.user_name" class="name"></div>
        <div :class="{active: profile.user.online}" class="online"><span></span> Online</div>
      </div>
      <div class="nav">
        <div class="item"><button @click="toggleSearch()" type="button" class="togglesearch"><svg-icon name="ui/search" /></button></div>
        <div class="item">
          <button @click="toggleParams()" class="toggleparams"><svg-icon name="ui/dotted" /></button>
          <div :class="{open: openParams}" class="dropdown">
            <ul class="menu">
              <li>
                <button type="button">
                  <div class="ico"><svg-icon name="ui/blacklist" /></div>
                  <span>Block User</span>
                </button>
              </li>
              <li>
                <button type="button">
                  <div class="ico"><svg-icon name="ui/remove" /></div>
                  <span>Delete History</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div :class="{open: openSearch}" class="searchchat">
      <form action="">
        <fieldset>
          <svg-icon name="ui/search" />
          <input type="text" name="" value="" placeholder="Search messages">
        </fieldset>
        <button type="button"><svg-icon name="ui/close" /></button>
      </form>
    </div>
    <perfect-scrollbar ref="scroll" class="chatscroll">
      <div class="chatbox">
        <div v-for="(e, i) in userMessagesChat.list" :key="i" class="day">
          <div v-html="e.date" class="date"></div>
          <div v-for="(e2, i2) in e.items" :key="i2" :class="e2.type" class="item">
            <!-- In -->
            <div v-if="e2.type == 'in'" class="userphoto"><img :src="userMessagesChat.photo" alt=""></div>
            <div v-if="e2.type == 'in'" class="info">
              <div class="message">
                <div v-html="userMessagesChat.name" class="name"></div>
                <div v-html="e2.text" class="text"></div>
              </div>
              <div v-html="e2.time" class="time"></div>
            </div>
            <!-- Out -->
            <div v-if="e2.type == 'out'" v-html="e2.text" class="message"></div>
            <div v-if="e2.type == 'out'" class="info">
              <div class="check">
                <svg-icon v-if="e2.check" name="ui/received" />
                <svg-icon v-else name="ui/unreceived" />
              </div>
              <div v-html="e2.time" class="time"></div>
            </div>
          </div>
        </div>
        <div class="empty">
          <div class="img">
            <img src="~/assets/illustration/messages.svg" alt="" class="illustration day">
            <img src="~/assets/illustration/messages_inverse.svg" alt="" class="illustration night">
          </div>
          <div class="text">
            <b>There are no messages here yet</b>
            <p>Write something</p>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
    <form class="send" action="">
      <button type="button" class="smile"><svg-icon name="ui/smile" /></button>
      <input type="text" name="" value="" placeholder="Write message">
      <button type="submit" class="submit"><svg-icon name="ui/send" /></button>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'MessagesChatModal',
  data() {
    return{
      openSearch: false,
      openParams: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.scroll.$el.scrollTop = this.$refs.scroll.$el.firstChild.offsetHeight
    }, 50)
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.paramsbox') && !e.target.closest('.toggleparams')) {
        this.openParams = false
      }
    })
  },
  methods: {
    toggleModal(target) {
      this.$root.$emit('toggleModal', (target) ? {
        open: true,
        target: target
      } : {})
    },





    toggleSearch() {
      this.openSearch = !this.openSearch
    },
    toggleParams() {
      this.openParams = !this.openParams
    }
  },
  computed: {
    profile() {
      let profile = this.$store.getters['users/profile']
      if(profile) {
        profile = Object.assign({}, profile)
        let age = profile.user.birth_date.match(/(\d{4})(\d{2})(\d{2})/)
        profile.user.age = {
          year: age[1],
          month: age[2],
          day: age[3]
        }
      }
      console.log(profile)
      return profile
    },




    userMessagesChat() {
      return this.$store.getters['app/userMessagesChat']
    }
  }
}
</script>
