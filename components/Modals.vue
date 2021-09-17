<template>
<div :class="{open: open, active: active}" class="modalbox">
  <SignIn v-if="target == 'signIn'"/>
  <SignUp v-if="target == 'signUp'"/>
  <LogOut v-if="target == 'logOut'"/>
  <RestorePassword v-if="target == 'restorePassword'"/>
  <EmailSend v-if="target == 'emailSend'"/>
  <Messages v-if="target == 'messages'"/>
  <MessagesChat v-if="target == 'messagesChat'"/>
  <MessagesWrite v-if="target == 'messagesWrite'"/>
  <Friends v-if="target == 'friends'"/>
  <FriendsBlock v-if="target == 'friendsBlock'"/>
  <FriendsRemove v-if="target == 'friendsRemove'"/>
  <FriendsRemoved v-if="target == 'friendsRemoved'"/>
  <FriendsReport v-if="target == 'friendsReport'"/>
  <UserProfile v-if="target == 'userProfile'"/>
  <UserProfileGames v-if="target == 'userProfileGames'"/>
  <UserProfileFriends v-if="target == 'userProfileFriends'"/>
  <News v-if="target == 'news'"/>
  <NewsAdd v-if="target == 'newsAdd'"/>
  <PersonalData v-if="target == 'personalData'"/>
  <MyPhoto v-if="target == 'myPhoto'"/>
  <MyPhotoEditor v-if="target == 'myPhotoEditor'"/>
  <GameRemove v-if="target == 'gameRemove'"/>
  <GameInfo v-if="target == 'gameInfo'" :game="data"/>
  <GameSignIn v-if="target == 'gameSignIn'"/>
  <Request v-if="target == 'request'"/>
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
    this.$root.$on('modalOpen', (e) => {
      this.$store.dispatch('modals/setOpen', e)
    })
    this.$root.$on('modalTab', (e) => {
      this.$store.dispatch('modals/setTab', e)
    })
    document.addEventListener('click', (e) => {
      if(e.target.closest('.modalbox') && !e.target.closest('.modalinfo')) {
        this.$store.dispatch('modals/setOpen', {
          open: false,
          target: null,
          tab: null
        })
      }
    })
  },
  computed: {
    open() {
      return this.$store.getters['modals/open']
    },
    active() {
      return this.$store.getters['modals/active']
    },
    target() {
      return this.$store.getters['modals/target']
    },
    data() {
      return this.$store.getters['modals/data']
    }
  }
}
</script>
