<template>
  <div :class="{open: modal.open, active: modal.active}" class="modalbox" :data-modal="modal.target">
    <!-- Auth -->
    <SignIn v-if="modal.target == 'signIn'" />
    <SignUp v-if="modal.target == 'signUp'" />
    <LogOut v-if="modal.target == 'logOut'" />
    <LogInTemp v-if="modal.target == 'logInTemp'" />
    <RestorePassword v-if="modal.target == 'restorePassword'" />
    <EmailSend v-if="modal.target == 'emailSend'" />
    <RegisterEmailSend v-if="modal.target == 'registerEmailSend'" />
    <RestoreSuccessful v-if="modal.target == 'restoreSuccessful'" />
    <!-- Messages -->
    <Messages v-if="modal.target == 'messages'" />
    <MessagesChat v-if="modal.target == 'messagesChat'" />
    <MessagesRemove v-if="modal.target == 'messagesRemove'" />
    <!-- Friends -->
    <Friends v-if="modal.target == 'friends'" />
    <FriendsRemove v-if="modal.target == 'friendsRemove'" />
    <FriendsRemoved v-if="modal.target == 'friendsRemoved'" />
    <!-- Users -->
    <UserProfile v-if="modal.target == 'userProfile'" />
    <UserProfileGames v-if="modal.target == 'userProfileGames'" />
    <UserProfileFriends v-if="modal.target == 'userProfileFriends'" />
    <UserProfileMutualFriends v-if="modal.target == 'userProfileMutualFriends'" />
    <UserBlock v-if="modal.target == 'userBlock'" />
    <UserBlocked v-if="modal.target == 'userBlocked'" />
    <UserReport v-if="modal.target == 'userReport'" />
    <UserReported v-if="modal.target == 'userReported'" />
    <!-- Personal -->
    <PersonalData v-if="modal.target == 'personalData'" />
    <MyPhoto v-if="modal.target == 'myPhoto'" />
    <MyPhotoEditor v-if="modal.target == 'myPhotoEditor'" />
    <!-- Games -->
    <GameInfo v-if="modal.target == 'gameInfo'" />
    <GameBuy v-if="modal.target == 'gameBuy'" />
    <GameBuySuccess v-if="modal.target == 'gameBuySuccess'" />
    <GameSignIn v-if="modal.target == 'gameSignIn'" />
    <GameRemove v-if="modal.target == 'gameRemove'" />
    <GameMenu v-if="modal.target == 'gameMenu'" />
    <AddFundsToGame v-if="modal.target == 'addFunds'"/>
    <Developer v-if="modal.target == 'developer'"/>
    <!-- News -->
    <News v-if="modal.target == 'news'" />
    <!-- Request -->
    <Request v-if="modal.target == 'request'" />
    <!-- Notification -->
    <Notification v-if="modal.target == 'notification'" />
    <!-- Help -->
    <Help v-if="modal.target == 'help'" />
    <HelpSubmited v-if="modal.target == 'helpSubmited'" />
    <!-- Alerts -->
    <PaymentSuccesfull v-if="modal.target == 'paymentSuccesfull'" />
    <!-- Refresh -->
    <RefreshPage v-if="modal.target == 'refreshPage'" />
  </div>
</template>

<script>
// Auth
import SignIn from './modals/auth/SignIn'
import SignUp from './modals/auth/SignUp'
import LogOut from './modals/auth/LogOut'
import LogInTemp from './modals/auth/LogInTemp'
import RestorePassword from './modals/auth/RestorePassword'
import EmailSend from './modals/auth/EmailSend'
import RegisterEmailSend from "@/components/modals/auth/RegisterEmailSend.vue";
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
import UserProfileMutualFriends from './modals/users/MutualFriends'
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
import GameMenu from './modals/games/Menu'
import Developer from "./modals/games/Developer.vue";
// News
import News from './modals/news/News'
// Request
import Request from './modals/Request'
// Notification
import Notification from './modals/Notification'
// Help
import Help from './modals/Help'
import HelpSubmited from './modals/HelpSubmited'
// Alerts
import PaymentSuccesfull from './modals/PaymentSuccesfull'
// Refresh
import RefreshPage from './modals/RefreshPage'
import AddFundsToGame from "~/components/modals/games/AddFundsToGame.vue";
import RestoreSuccessful from "@/components/modals/auth/RestoreSuccessful.vue";

export default {
	name: 'ModalsComponent',
  components: {
    RestoreSuccessful,
    Developer,
    AddFundsToGame,
    // Auth
    SignIn, SignUp, LogOut, LogInTemp, RestorePassword, EmailSend,RegisterEmailSend,
    // Messages
    Messages, MessagesChat, MessagesRemove,
    // Friends
    Friends, FriendsRemove, FriendsRemoved,
    // Users
    UserProfile, UserProfileGames, UserProfileFriends, UserProfileMutualFriends, UserBlock, UserBlocked, UserReport, UserReported,
    // Personal
    PersonalData, MyPhoto, MyPhotoEditor,
    // Games
    GameInfo, GameBuy, GameBuySuccess, GameSignIn, GameRemove, GameMenu,
    // News
    News,
    // Request
    Request,
    // Notification
    Notification,
    // Help
    Help, HelpSubmited,
    // Alerts
    PaymentSuccesfull,
    // Refresh
    RefreshPage
  },
  data: () => ({
    prev: null
  }),
  mounted() {
    this.$root.$on('toggleModal', (e) => {
      this.$store.dispatch('app/toggleModal', e)
    })
    this.$root.$on('toggleModalTab', (e) => {
      this.$store.dispatch('app/toggleModalTab', e)
    })
    document.addEventListener('click', (e) => {

      if(e.target.closest('.modalbox') && !e.target.closest('.modalinfo')) {
        if(this.modal.fromGame || this.modal.target === 'gameBuy'){
          window.ExeWorldApi.orderCancel()
        }
        this.$store.dispatch('app/toggleModal', {})
        this.$root.$emit('setLoader', true)
      }
      if(window.matchMedia('(max-width: 576px)').matches) {
        if(this.prev != this.modal.target) {
          this.prev = this.modal.target
        } else {
          this.prev = null
          if(!e.target.closest('.modalinfo')) {
            this.$store.dispatch('app/toggleModal', {})
            this.$root.$emit('setLoader', true)
          }
        }
      }
    })
  },
  computed: {
    modal() {
      return this.$store.getters['app/modal']
    }
  },
  // watch:{
  // modal(newVal,oldVal){
  //   if(newVal?.active){
  //     document.body.classList.add('no-scroll')
  //   }else {
  //     document.body.classList.remove('no-scroll')
  //   }
  // }
  // }
}
</script>
