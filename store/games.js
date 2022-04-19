export const state = () => ({
  limit: 20,
  userRecent: [],
  userAll: {
    total: 0,
    list: []
  },
  carousel: [],
  newgames: {
    total: 0,
    list: []
  },
  recommended: {
    total: 0,
    list: []
  },
  categories: {},
  gamesData: {}
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  setGames({ commit }, data) {
    commit('setState', {
      key: data.category,
      value: data.data
    })
  },
  async loadUserGames({ state, commit }, params) {
    let games = (params.type === 'load') ? {
      total: 0,
      list: []
    } : Object.assign({}, state.userAll)
    const { data } = await this.$axios.post('/appApi/user.games', params)
    games.list = games.list.concat(data.response.games)
    commit('setState', {
      key: 'userAll',
      value: games
    })
    return (data.response.total_games < state.limit) ? false : true
  },
  setInitData({commit}, data) {
    let key = {
      games_carousel: 'carousel',
      games_new: 'newgames',
      games_recommended: 'recommended',
      categories: 'categories'
    }
    Object.keys(data).map(e => {
      if(e == 'categories') {
        data[e][0].list = data.games_all
        data[e][0].offset = data.games_all.length
      }
      commit('setState', {
        key: key[e], 
        value: data[e]
      })
    })
    let filters = {}
    Object.keys(data.categories).map(e => {
      filters[data.categories[e].cid] = {
        cid: data.categories[e].cid,
        title: data.categories[e].title,
        total: data.categories[e].total_games
      }
    })
    this.dispatch('filters/setAllCategories', {
      current: 0,
      list: filters
    })
  },
  async setCategories({state, commit}, params) {
    let categories = Object.assign({}, state.categories)
    categories[params.type] = Object.assign({}, categories[params.type])
    if(!params.filters) {
      categories[params.type].offset += state.limit
      params.offset = categories[params.type].offset
    }
    const { data } = await this.$axios.post('/appApi/games', params)
    categories[params.type].list = categories[params.type].list.concat(data.response.games)
    commit('setState', {
      key: 'categories',
      value: categories
    })
    return (data.response.games.length < state.limit) ? false : true
  },
  async setNew({state, commit}, params) {
    let games = Object.assign([], state.newgames)
    games.offset += state.limit
    params.offset = games.offset
    const { data } = await this.$axios.post('/appApi/games.new', params)
    games.list = games.list.concat(data.response.games)
    commit('setState', {
      key: 'newgames',
      value: games
    })
    return (data.response.games.length < state.limit) ? false : true
  },
  async setRecommend({state, commit}, params) {
    let games = Object.assign([], state.recommended)
    games.offset += state.limit
    params.offset = games.offset
    const { data } = await this.$axios.post('/appApi/games.recommended', params)
    games.list = games.list.concat(data.response.games)
    commit('setState', {
      key: 'recommended',
      value: games
    })
    return (data.response.games.length < state.limit) ? false : true
  },
  async setGamesData({state, commit}, params) {
    let gamesData = Object.assign({}, state.gamesData)
    const { data } = await this.$axios.post('/appApi/games.info', params)
    if(data.response) {
      gamesData[data.response.game.gid] = data.response.game
      commit('setState', {
        key: 'gamesData',
        value: gamesData
      })
    }
  },
  async installGame({}, params) {
    await this.$axios.post('/appApi/games.add', params)
    await this.dispatch('app/initAppData')
    return
  },
  async removeGame({commit}, params) {
    await this.$axios.post('/appApi/games.remove', params)
    await this.dispatch('app/initAppData')
    return
  },
  async runGame({}, params) {
    const { data } = await this.$axios.post('/appApi/games.run', params)
    return data
  }
}

export const getters = {
  userRecent: state => state.userRecent,
  userAll: state => state.userAll,
  carousel: state => state.carousel,
  newgames: state => state.newgames,
  recommended: state => state.recommended,
  categories: state => state.categories,
  gamesData: state => state.gamesData
}