export const state = () => ({
  carousel: [],
  newgames: [],
  recommended: [],
  categories: {},
  games: {},
  gamesData: {}
})

export const mutations = {
  setInitData(state, data) {
    state.carousel = data.games_carousel
    state.newgames = data.games_new
    state.recommended = data.games_recommended
    data.categories[0].list = data.games_all
    data.categories[0].offset = data.games_all.length
    state.categories = data.categories
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setGames(state, games) {
    state.games = games
  },
  setGamesData(state, gamesData) {
    state.gamesData = gamesData
  }
}

export const actions = {
  setInitData({commit}, params) {
    commit('setInitData', params)
  },
  setCategories({commit, getters}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/games', params).then(response => {
        let categories = Object.assign({}, getters.categories)
        categories[params.get('type')].list = categories[params.get('type')].list.concat(response.data.response.games)
        categories[params.get('type')].offset += (response.data.response.games.length) ? response.data.response.games.length : 0
        categories[params.get('type')].loaded = (response.data.response.games.length) ? false : true
        commit('setCategories', categories)
        resolve(true)
      }).catch(err => {resolve(err.response)})
    })
  },
  setGames({commit, getters}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/games', params).then(response => {
        let games = Object.assign({}, getters.games)
        games[params.get('type')].list = response.data.response.games
        categories[params.get('type')].offset = response.data.response.offset
        commit('setGames', categories)
        resolve(true)
      }).catch(err => {resolve(err.response)})
    })
  },
  async setGamesData({commit, getters}, params) {
    return new Promise((resolve) => {
      let gamesData = Object.assign({}, getters.gamesData)
      this.$axios.post('/appApi/games.info', params).then(response => {
        gamesData[response.data.response.game.gid] = response.data.response.game
        commit('setGamesData', gamesData)
        resolve(true)
      })
    })
  },
}

export const getters = {
  carousel: state => state.carousel,
  newgames: state => state.newgames,
  recommended: state => state.recommended,
  categories: state => state.categories,
  games: state => state.games,
  gamesData: state => state.gamesData
}