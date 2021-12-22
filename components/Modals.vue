<template>
<div :class="{open: modal.open, active: modal.active}" class="modalbox">
  <!-- Auth -->
  <SignIn v-if="modal.target == 'signIn'"/>
  <SignUp v-if="modal.target == 'signUp'"/>
  <LogOut v-if="modal.target == 'logOut'"/>
  <RestorePassword v-if="modal.target == 'restorePassword'"/>
  <EmailSend v-if="modal.target == 'emailSend'"/>
  <!-- Messages -->
  <Messages v-if="modal.target == 'messages'"/>
  <MessagesChat v-if="modal.target == 'messagesChat'"/>
  <MessagesRemove v-if="modal.target == 'messagesRemove'"/>
  <!-- Friends -->
  <Friends v-if="modal.target == 'friends'"/>
  <FriendsRemove v-if="modal.target == 'friendsRemove'"/>
  <FriendsRemoved v-if="modal.target == 'friendsRemoved'"/>
  <!-- Users -->
  <UserProfile v-if="modal.target == 'userProfile'"/>
  <UserProfileGames v-if="modal.target == 'userProfileGames'"/>
  <UserProfileFriends v-if="modal.target == 'userProfileFriends'"/>
  <UserBlock v-if="modal.target == 'userBlock'"/>
  <UserBlocked v-if="modal.target == 'userBlocked'"/>
  <UserReport v-if="modal.target == 'userReport'"/>
  <UserReported v-if="modal.target == 'userReported'"/>
  <!-- Personal -->
  <PersonalData v-if="modal.target == 'personalData'"/>
  <MyPhoto v-if="modal.target == 'myPhoto'"/>
  <MyPhotoEditor v-if="modal.target == 'myPhotoEditor'"/>
  <!-- Games -->
  <GameInfo v-if="modal.target == 'gameInfo'"/>
  <GameBuy v-if="modal.target == 'gameBuy'"/>
  <GameBuySuccess v-if="modal.target == 'gameBuySuccess'"/>
  <GameSignIn v-if="modal.target == 'gameSignIn'"/>
  <GameRemove v-if="modal.target == 'gameRemove'"/>
  <!-- News -->
  <News v-if="modal.target == 'news'"/>
  <!-- Request -->
  <Request v-if="modal.target == 'request'"/>
  <!-- Notification -->
  <Notification v-if="modal.target == 'notification'"/>
</div>
</template>

<script>
// Auth
import SignIn from './modals/auth/SignIn'
import SignUp from './modals/auth/SignUp'
import LogOut from './modals/auth/LogOut'
import RestorePassword from './modals/auth/RestorePassword'
import EmailSend from './modals/auth/EmailSend'
// Messages
import Messages from './modals/messages/Messages'
import MessagesChat from './modals/messages/Chat'
import MessagesRemove from './modals/messages/Remove'
// Friends
import Friends from './modals/friends/Friends'
import FriendsRemove from './modals/friends/Remove'
import FriendsRemoved from './modals/friends/Removed'
// Users
import UserProfile from './modals/users/Profile'
import UserProfileGames from './modals/users/Games'
import UserProfileFriends from './modals/users/Friends'
import UserBlock from './modals/users/Block'
import UserBlocked from './modals/users/Blocked'
import UserReport from './modals/users/Report'
import UserReported from './modals/users/Reported'
// Personal
import PersonalData from './modals/personal/PersonalData'
import MyPhoto from './modals/personal/MyPhoto'
import MyPhotoEditor from './modals/personal/MyPhotoEditor'
// Games
import GameInfo from './modals/games/Info'
import GameBuy from './modals/games/Buy'
import GameBuySuccess from './modals/games/BuySuccess'
import GameSignIn from './modals/games/SignIn'
import GameRemove from './modals/games/Remove'
// News
import News from './modals/news/News'
// Request
import Request from './modals/Request'
// Notification
import Notification from './modals/Notification'

export default {
	name: 'ModalsComponent',
  components: {
    // Auth
    SignIn, SignUp, LogOut, RestorePassword, EmailSend,
    // Messages
    Messages, MessagesChat, MessagesRemove,
    // Friends
    Friends, FriendsRemove, FriendsRemoved,
    // Users
    UserProfile, UserProfileGames, UserProfileFriends, UserBlock, UserBlocked, UserReport, UserReported,
    // Personal
    PersonalData, MyPhoto, MyPhotoEditor,
    // Games
    GameInfo, GameBuy, GameBuySuccess, GameSignIn, GameRemove,
    // News
    News,
    // Request
    Request,
    // Notification
    Notification
  },
  mounted() {
    this.$root.$on('toggleModal', (e) => {
      this.$store.dispatch('app/toggleModal', e)
    })
    this.$root.$on('toggleModalTab', (e) => {
      this.$store.dispatch('app/toggleModalTab', e)
    })
    document.addEventListener('click', (e) => {
      if(e.target.closest('.modalbox') && !e.target.closest('.modalinfo')) {
        this.$store.dispatch('app/toggleModal', {})
      }
    })
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  }
}
</script>
