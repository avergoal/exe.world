<template>
<div :class="{open: modalOpen, active: modalActive}" class="modalbox">
  <SignIn v-if="modalTarget == 'signIn'"/>
  <SignUp v-if="modalTarget == 'signUp'"/>
  <LogOut v-if="modalTarget == 'logOut'"/>
  <RestorePassword v-if="modalTarget == 'restorePassword'"/>
  <EmailSend v-if="modalTarget == 'emailSend'"/>
  <Messages v-if="modalTarget == 'messages'"/>
  <MessagesChat v-if="modalTarget == 'messagesChat'"/>
  <MessagesWrite v-if="modalTarget == 'messagesWrite'"/>
  <Friends v-if="modalTarget == 'friends'"/>
  <FriendsBlock v-if="modalTarget == 'friendsBlock'"/>
  <FriendsRemove v-if="modalTarget == 'friendsRemove'"/>
  <FriendsRemoved v-if="modalTarget == 'friendsRemoved'"/>
  <FriendsReport v-if="modalTarget == 'friendsReport'"/>
  <UserProfile v-if="modalTarget == 'userProfile'"/>
  <UserProfileGames v-if="modalTarget == 'userProfileGames'"/>
  <UserProfileFriends v-if="modalTarget == 'userProfileFriends'"/>
  <News v-if="modalTarget == 'news'"/>
  <NewsAdd v-if="modalTarget == 'newsAdd'"/>
  <PersonalData v-if="modalTarget == 'personalData'"/>
  <MyPhoto v-if="modalTarget == 'myPhoto'"/>
  <MyPhotoEditor v-if="modalTarget == 'myPhotoEditor'"/>
  <GameRemove v-if="modalTarget == 'gameRemove'"/>
  <GameInfo v-if="modalTarget == 'gameInfo'"/>
  <GameSignIn v-if="modalTarget == 'gameSignIn'"/>

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





    GameBuy,
    GameBuySuccess,
    News,
    NewsAdd,
    Help,
    Thanks
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(e.target.closest('.modalbox') && !e.target.closest('.modalinfo')) {
        this.$store.dispatch('modals/setModalOpen', {
          open: false,
          target: null
        })
      }
    })
  },
  methods: {
    closeModal() {
      this.$store.dispatch('modals/setModalOpen', {
        open: false,
        target: null
      })
    },
    openModal(target) {
      this.$store.dispatch('modals/setModalOpen', {
        open: true,
        target: target
      })
    }
  },
  computed: {
    modalOpen() {
      return this.$store.getters['modals/modalOpen']
    },
    modalActive() {
      return this.$store.getters['modals/modalActive']
    },
    modalTarget() {
      return this.$store.getters['modals/modalTarget']
    }
  }
}
</script>
