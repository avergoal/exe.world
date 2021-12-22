<template>
<div class="modalinfo messagesmodal chat middle">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div v-if="show" class="modalcontent">
    <div v-if="profile" class="usermodaltop">
      <button @click="$root.$emit('toggleModal', {target: 'messages'})" type="button"><svg-icon name="ui/back" /></button>
      <button @click="$root.$emit('toggleModal', {target: 'userProfile', user: profile.user.uid})" class="userphoto" type="button"><img :src="profile.user.avatar_urls.x100" :alt="profile.user.user_name"></button>
      <div class="info">
        <div v-html="profile.user.user_name" class="name"></div>
        <div :class="{active: profile.user.online}" class="online"><span></span> {{ (profile.user.online ? 'Online' : 'Offline') }}</div>
      </div>
      <div class="nav">
        <div class="item">
          <button @click="toggleParams()" class="toggleparams"><svg-icon name="ui/dotted" /></button>
          <div :class="{open: openParams}" class="dropdown">
            <ul class="menu">
              <li>
                <button @click="$root.$emit('toggleModal', {target: 'userBlock', user: profile.user})" type="button">
                  <div class="ico"><svg-icon name="ui/blacklist" /></div>
                  <span>Block User</span>
                </button>
              </li>
              <li>
                <button @click="$root.$emit('toggleModal', {target: 'messagesRemove', code: messages.code, uid: profile.user.uid})" type="button">
                  <div class="ico"><svg-icon name="ui/remove" /></div>
                  <span>Delete History</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div :class="{open: openSearch}" class="searchchat">
      <form @submit.prevent action="">
        <fieldset>
          <svg-icon name="ui/search" />
          <input type="text" name="" value="" placeholder="Search messages">
        </fieldset>
        <button type="button"><svg-icon name="ui/close" /></button>
      </form>
    </div>
    -->
    <perfect-scrollbar ref="scroll" class="chatscroll">
      <div v-if="messages" class="chatbox">
        <div v-for="(e, i) in messages.list" :key="i" class="day">
          <div v-html="i.split('.').join(' ')" class="date"></div>
          <div v-for="(e2, i2) in e" :key="i2" :class="(e2.user.uid == user.profile.uid) ? 'out' : 'in'" class="item">
            <!-- In -->
            <div v-if="e2.user.uid != user.profile.uid" class="userphoto"><img :src="e2.user.avatar_urls.x100" alt=""></div>
            <div v-if="e2.user.uid != user.profile.uid" class="info">
              <div class="message">
                <div v-html="e2.user.user_name" class="name"></div>
                <div v-html="e2.text" class="text"></div>
              </div>
              <div v-html="e2.time" class="time"></div>
            </div>
            <!-- Out -->
            <div v-if="e2.user.uid == user.profile.uid" v-html="e2.text" class="message"></div>
            <div v-if="e2.user.uid == user.profile.uid" class="info">
              <div class="check">
                <svg-icon v-if="e2.unread" name="ui/unreceived" />
                <svg-icon v-else name="ui/received" />
              </div>
              <div v-html="e2.time" class="time"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="chatbox">
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
    <form @submit.prevent class="send" action="">
      <button type="button" class="smile"><svg-icon name="ui/smile" /></button>
      <input v-model="message" v-on:keyup.enter="sendMessage()" type="text" name="" value="" placeholder="Write message">
      <button @click="sendMessage()" type="button" class="submit"><svg-icon name="ui/send" /></button>
    </form>
  </div>
  <div :class="{loaded: show}" class="loader"><img src="/theme/img/loader.gif" alt=""></div>
</div>
</template>

<script>
export default {
	name: 'MessagesChatModal',
  data: () => ({
    message: null,
    date: '',
    openParams: false,
    show: false
  }),
  created() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.paramsbox') && !e.target.closest('.toggleparams')) {
        this.openParams = false
      }
    })
    this.loadMessages()
  },
  methods: {
    async loadMessages() {
      this.show = false
      await this.$store.dispatch('users/load', {uid: this.modal.user})
      await this.$store.dispatch('messages/load', {uid: this.modal.user})
      this.show = true
      let interval = setInterval(() => {
        if(this.$refs.scroll) {
          clearInterval(interval)
          this.$refs.scroll.$el.scrollBy(0, this.$refs.scroll.$el.firstChild.offsetHeight)
          this.$refs.scroll.update()
        }
      }, 100)
    },
    async sendMessage() {
      if(this.message) {
        await this.$store.dispatch('messages/send', {
          uid: this.modal.user,
          text: this.message
        })
        this.message = null
        this.$refs.scroll.$el.scrollBy(0, this.$refs.scroll.$el.firstChild.offsetHeight)
        this.$refs.scroll.update()
      }
    },
    toggleParams() {
      this.openParams = !this.openParams
    }
  },
  computed: {
    profile() {
      return this.$store.getters['users/profile']
    },
    user() {
      return this.$store.getters['profile/user']
    },
    modal() {
      return this.$store.getters['app/modal']
    },
    messages() {
      return this.$store.getters['messages/messages']
    }
  }
}
</script>
