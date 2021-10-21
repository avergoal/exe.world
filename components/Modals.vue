<template>
<div :class="{open: modal.open, active: modal.active}" class="modalbox">
  <SignIn v-if="modal.target == 'signIn'"/>
  <SignUp v-if="modal.target == 'signUp'"/>
  <LogOut v-if="modal.target == 'logOut'"/>
  <RestorePassword v-if="modal.target == 'restorePassword'"/>
  <EmailSend v-if="modal.target == 'emailSend'"/>
  <Messages v-if="modal.target == 'messages'"/>
  <MessagesChat v-if="modal.target == 'messagesChat'"/>
  <MessagesWrite v-if="modal.target == 'messagesWrite'"/>
  <Friends v-if="modal.target == 'friends'"/>
  <FriendsBlock v-if="modal.target == 'friendsBlock'"/>
  <FriendsRemove v-if="modal.target == 'friendsRemove'"/>
  <FriendsRemoved v-if="modal.target == 'friendsRemoved'"/>
  <FriendsReport v-if="modal.target == 'friendsReport'"/>
  <UserProfile v-if="modal.target == 'userProfile'"/>
  <UserProfileGames v-if="modal.target == 'userProfileGames'"/>
  <UserProfileFriends v-if="modal.target == 'userProfileFriends'"/>
  <News v-if="modal.target == 'news'"/>
  <NewsAdd v-if="modal.target == 'newsAdd'"/>
  <PersonalData v-if="modal.target == 'personalData'"/>
  <MyPhoto v-if="modal.target == 'myPhoto'"/>
  <MyPhotoEditor v-if="modal.target == 'myPhotoEditor'"/>
  <GameRemove v-if="modal.target == 'gameRemove'"/>
  <GameInfo v-if="modal.target == 'gameInfo'"/>
  <GameSignIn v-if="modal.target == 'gameSignIn'"/>
  <Request v-if="modal.target == 'request'"/>
</div>
</template>

<script>
import SignIn from './modals/auth/SignIn'
import SignUp from './modals/auth/SignUp'
import LogOut from './modals/auth/LogOut'
import RestorePassword from './modals/auth/RestorePassword'
import EmailSend from './modals/auth/EmailSend'
import Messages from './modals/messages/Messages'
import MessagesChat from './modals/messages/MessagesChat'
import MessagesWrite from './modals/messages/MessagesWrite'
import Friends from './modals/friends/Friends'
import FriendsBlock from './modals/friends/FriendsBlock'
import FriendsRemove from './modals/friends/FriendsRemove'
import FriendsRemoved from './modals/friends/FriendsRemoved'
import FriendsReport from './modals/friends/FriendsReport'
import UserProfile from './modals/user/Profile'
import UserProfileGames from './modals/user/ProfileGames'
import UserProfileFriends from './modals/user/ProfileFriends'
import News from './modals/news/News'
import NewsAdd from './modals/news/NewsAdd'
import PersonalData from './modals/personal/PersonalData'
import MyPhoto from './modals/personal/MyPhoto'
import MyPhotoEditor from './modals/personal/MyPhotoEditor'
import GameRemove from './modals/games/GameRemove'
import GameInfo from './modals/games/GameInfo'
import GameSignIn from './modals/games/GameSignIn'
import Request from './modals/Request'



import GameBuy from './modals/games/GameBuy'
import GameBuySuccess from './modals/games/GameBuySuccess'
import Help from './modals/Help'
import Thanks from './modals/Thanks'

export default {
	name: 'ModalsComponent',
  components: {
    SignIn,
    SignUp,
    LogOut,
    RestorePassword,
    EmailSend,
    Messages,
    MessagesChat,
    MessagesWrite,
    Friends,
    FriendsBlock,
    FriendsRemove,
    FriendsRemoved,
    FriendsReport,
    UserProfile,
    UserProfileGames,
    UserProfileFriends,
    PersonalData,
    MyPhoto,
    MyPhotoEditor,
    GameRemove,
    GameInfo,
    GameSignIn,
    Request,




    GameBuy,
    GameBuySuccess,
    News,
    NewsAdd,
    Help,
    Thanks
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
