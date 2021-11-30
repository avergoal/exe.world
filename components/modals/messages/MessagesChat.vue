<template>
<div class="modalinfo messagesmodal chat middle">
  <button @click="$root.$emit('toggleModal', {})" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent">
    <div v-if="profile" class="usermodaltop">
      <button @click="$root.$emit('toggleModal', {target: 'messages'})" type="button"><svg-icon name="ui/back" /></button>
      <div class="userphoto"><img :src="profile.user.avatar_urls.x100" :alt="profile.user.user_name"></div>
      <div class="info">
        <div v-html="profile.user.user_name" class="name"></div>
        <div :class="{active: profile.user.online}" class="online"><span></span> {{ (profile.user.online ? 'Online' : 'Offline') }}</div>
      </div>
      <div class="nav">
        <div class="item"><button @click="toggleSearch()" type="button" class="togglesearch"><svg-icon name="ui/search" /></button></div>
        <div class="item">
          <button @click="toggleParams()" class="toggleparams"><svg-icon name="ui/dotted" /></button>
          <div :class="{open: openParams}" class="dropdown">
            <ul class="menu">
              <li>
                <button @click="toggleModal('userBlock', {id: profile.user.uid, name: profile.user.user_name})" type="button">
                  <div class="ico"><svg-icon name="ui/blacklist" /></div>
                  <span>Block User</span>
                </button>
              </li>
              <li>
                <button @click="clearChat()" type="button">
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
      <div v-if="messages" class="chatbox">
        <div v-for="(e, i) in messages" :key="i" class="day">
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
    <form class="send" action="">
      <button type="button" class="smile"><svg-icon name="ui/smile" /></button>
      <input v-model="message" type="text" name="" value="" placeholder="Write message">
      <button @click="sendMessage()" type="button" class="submit"><svg-icon name="ui/send" /></button>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'MessagesChatModal',
  data: () => ({
    message: null,
    date: '',
    openSearch: false,
    openParams: false
  }),
  created() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.paramsbox') && !e.target.closest('.toggleparams')) {
        this.openParams = false
      }
    })
    this.loadMessages()
  },
  mounted() {
    setTimeout(() => {
      this.$refs.scroll.$el.scrollTop = this.$refs.scroll.$el.firstChild.offsetHeight
    }, 50)
  },
  methods: {
    async loadMessages() {
      if(!this.profile) {
        await this.$store.dispatch('users/load', {uid: this.modal.user.id})
      }
      await this.$store.dispatch('messages/load', {uid: this.modal.user.id})
    },
    async sendMessage() {
      if(this.message) {
        this.$store.dispatch('messages/send', {
          uid: this.modal.user.id,
          text: this.message
        })
      }
    },
    async clearChat() {
      await this.$store.dispatch('messages/clear', {
        code: '',
        uid: this.modal.user.id
      })
    },
    toggleModal(target, user) {
      this.$root.$emit('toggleModal', (target) ? {
        target: target,
        user: user
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
