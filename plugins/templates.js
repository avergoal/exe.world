import Vue from 'vue'
// Loader animation
import LoaderAnimation from '~/components/LoaderAnimation'
Vue.component('LoaderAnimation', LoaderAnimation)
// Main pages
import MainPage from '~/components/pages/MainPage'
import CategoryPage from '~/components/pages/CategoryPage'
import MyGames from '~/components/pages/MyGamesPage'
Vue.component('MainPage', MainPage)
Vue.component('CategoryPage', CategoryPage)
Vue.component('MyGames', MyGames)
// Search pages
import SearchCategories from '~/components/pages/SearchCategoryPage'
import SearchPeoples from '~/components/pages/SearchPeoplesPage'
Vue.component('SearchCategories', SearchCategories)
Vue.component('SearchPeoples', SearchPeoples)
// Swipers
import MainSwiper from '~/components/swipers/MainSwiper'
import GamesSwiper from '~/components/swipers/GamesSwiper'
import UsersSwiper from '~/components/swipers/UsersSwiper'
Vue.component('MainSwiper', MainSwiper)
Vue.component('GamesSwiper', GamesSwiper)
Vue.component('UsersSwiper', UsersSwiper)
// Filters
import Filters from '~/components/Filters'
Vue.component('Filters', Filters)
// Observer
import Observer from '~/components/Observer'
Vue.component('Observer', Observer)
