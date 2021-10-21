export const state = () => ({
  carousel: [],
  newgames: [],
  recommended: [],
  categories: {},
  gamesData: {}
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  setInitData({commit}, params) {
    commit('setState', {key: 'carousel', value: []})
    commit('setState', {key: 'carousel', value: params.games_carousel})
    commit('setState', {key: 'newgames', value: []})
    commit('setState', {key: 'newgames', value: params.games_new})
    commit('setState', {key: 'recommended', value: []})
    commit('setState', {key: 'recommended', value: params.games_recommended})
    params.categories[0].list = params.games_all
    params.categories[0].offset = params.games_all.length
    commit('setState', {key: 'categories', value: []})
    commit('setState', {key: 'categories', value: params.categories})
    let filters = {}
    for(let e in params.categories) {
      filters[params.categories[e].cid] = {
        cid: params.categories[e].cid,
        title: params.categories[e].title,
        total: params.categories[e].total_games
      }
    }
    this.dispatch('filters/setAllCategories', {
      current: 0,
      list: filters
    })
  },
  async setCategories({commit, getters}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/games', params)
      let categories = Object.assign({}, getters.categories)
      categories[params.type] = Object.assign({}, categories[params.type])
      if(!params.offset) {
        categories[params.type].list = data.response.games
      } else {
        categories[params.type].list = categories[params.type].list.concat(data.response.games)
      }
      categories[params.type].offset += (data.response.games.length) ? data.response.games.length : 0
      categories[params.type].loaded = (data.response.games.length) ? false : true
      commit('setState', {
        key: 'categories',
        value: categories
      })
      resolve(true)
    })
  },
  async setGamesData({commit, getters}, params) {
    return new Promise(async (resolve) => {
      let gamesData = Object.assign({}, getters.gamesData)
      const { data } = await this.$axios.post('/appApi/games.info', params)
      if(data.response) {
        gamesData[data.response.game.gid] = data.response.game
        commit('setState', {
          key: 'gamesData',
          value: gamesData
        })
      }
      resolve(true)
    })
  },
  async installGame({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/games.add', params)
      resolve(data)
    })
  },
  async removeGame({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/games.remove', params)
      resolve(data)
    })
  },
  async runGame({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/games.run', params)
      resolve(data)
    })
  },
}

export const getters = {
  carousel: state => state.carousel,
  newgames: state => state.newgames,
  recommended: state => state.recommended,
  categories: state => state.categories,
  gamesData: state => state.gamesData,
  filters: state => state.filters,
}