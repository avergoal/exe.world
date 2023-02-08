export { default as Filters } from '../../components/Filters.vue'
export { default as Footer } from '../../components/Footer.vue'
export { default as Header } from '../../components/Header.vue'
export { default as LoaderAnimation } from '../../components/LoaderAnimation.vue'
export { default as Modals } from '../../components/Modals.vue'
export { default as Observer } from '../../components/Observer.vue'
export { default as Search } from '../../components/Search.vue'
export { default as Sidebar } from '../../components/Sidebar.vue'
export { default as GuestSave } from '../../components/guest/GuestSave.vue'
export { default as PagesCategoryPage } from '../../components/pages/CategoryPage.vue'
export { default as PagesMainPage } from '../../components/pages/MainPage.vue'
export { default as PagesMyGamesPage } from '../../components/pages/MyGamesPage.vue'
export { default as PagesSearchCategoryPage } from '../../components/pages/SearchCategoryPage.vue'
export { default as PagesSearchPeoplesPage } from '../../components/pages/SearchPeoplesPage.vue'
export { default as ModalsHelp } from '../../components/modals/Help.vue'
export { default as ModalsHelpSubmited } from '../../components/modals/HelpSubmited.vue'
export { default as ModalsNotification } from '../../components/modals/Notification.vue'
export { default as ModalsPaymentSuccesfull } from '../../components/modals/PaymentSuccesfull.vue'
export { default as ModalsRefreshPage } from '../../components/modals/RefreshPage.vue'
export { default as ModalsRequest } from '../../components/modals/Request.vue'
export { default as ModalsThanks } from '../../components/modals/Thanks.vue'
export { default as SwipersGamesSwiper } from '../../components/swipers/GamesSwiper.vue'
export { default as SwipersMainSwiper } from '../../components/swipers/MainSwiper.vue'
export { default as SwipersUsersSwiper } from '../../components/swipers/UsersSwiper.vue'
export { default as ModalsAuthEmailSend } from '../../components/modals/auth/EmailSend.vue'
export { default as ModalsAuthLogInTemp } from '../../components/modals/auth/LogInTemp.vue'
export { default as ModalsAuthLogOut } from '../../components/modals/auth/LogOut.vue'
export { default as ModalsAuthRestorePassword } from '../../components/modals/auth/RestorePassword.vue'
export { default as ModalsAuthSignIn } from '../../components/modals/auth/SignIn.vue'
export { default as ModalsAuthSignUp } from '../../components/modals/auth/SignUp.vue'
export { default as ModalsGamesAddFundsToGame } from '../../components/modals/games/AddFundsToGame.vue'
export { default as ModalsGamesBuy } from '../../components/modals/games/Buy.vue'
export { default as ModalsGamesBuySuccess } from '../../components/modals/games/BuySuccess.vue'
export { default as ModalsGamesInfo } from '../../components/modals/games/Info.vue'
export { default as ModalsGamesMenu } from '../../components/modals/games/Menu.vue'
export { default as ModalsGamesRemove } from '../../components/modals/games/Remove.vue'
export { default as ModalsGamesSignIn } from '../../components/modals/games/SignIn.vue'
export { default as ModalsFriendsActions } from '../../components/modals/friends/Actions.vue'
export { default as ModalsFriends } from '../../components/modals/friends/Friends.vue'
export { default as ModalsFriendsRemove } from '../../components/modals/friends/Remove.vue'
export { default as ModalsFriendsRemoved } from '../../components/modals/friends/Removed.vue'
export { default as ModalsMessagesChat } from '../../components/modals/messages/Chat.vue'
export { default as ModalsMessages } from '../../components/modals/messages/Messages.vue'
export { default as ModalsMessagesRemove } from '../../components/modals/messages/Remove.vue'
export { default as ModalsNewsAdd } from '../../components/modals/news/Add.vue'
export { default as ModalsNews } from '../../components/modals/news/News.vue'
export { default as ModalsPersonalMyPhoto } from '../../components/modals/personal/MyPhoto.vue'
export { default as ModalsPersonalMyPhotoEditor } from '../../components/modals/personal/MyPhotoEditor.vue'
export { default as ModalsPersonalData } from '../../components/modals/personal/PersonalData.vue'
export { default as ModalsUsersBlock } from '../../components/modals/users/Block.vue'
export { default as ModalsUsersBlocked } from '../../components/modals/users/Blocked.vue'
export { default as ModalsUsersFriends } from '../../components/modals/users/Friends.vue'
export { default as ModalsUsersGames } from '../../components/modals/users/Games.vue'
export { default as ModalsUsersMutualFriends } from '../../components/modals/users/MutualFriends.vue'
export { default as ModalsUsersProfile } from '../../components/modals/users/Profile.vue'
export { default as ModalsUsersReport } from '../../components/modals/users/Report.vue'
export { default as ModalsUsersReported } from '../../components/modals/users/Reported.vue'
export { default as ModalsPersonalTabsAccess } from '../../components/modals/personal/tabs/Access.vue'
export { default as ModalsPersonalTabsAddFunds } from '../../components/modals/personal/tabs/AddFunds.vue'
export { default as ModalsPersonalTabsBalance } from '../../components/modals/personal/tabs/Balance.vue'
export { default as ModalsPersonalTabsBlacklist } from '../../components/modals/personal/tabs/Blacklist.vue'
export { default as ModalsPersonalTabsNotifications } from '../../components/modals/personal/tabs/Notifications.vue'
export { default as ModalsPersonal } from '../../components/modals/personal/tabs/Personal.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
