export const state = () => ({
  open: false,
  popular: [],
  results: {
    query: null,
    games: [],
    peoples: []
  }
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  toggleSearch({commit}, params) {
    commit('setState', {
      key: 'open',
      value: params
    })
  },
  setPopular({commit}, params) {
    commit('setState', {
      key: 'popular',
      value: params
    })
  },
  goSearch({commit}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/search', params)
      commit('setState', {
        key: 'results',
        value: {
          query: params.query,
          games: data.response.games,
          peoples: data.response.users
        }
      })
      resolve(true)
    })
  }
}

export const getters = {
  open: state => state.open,
  popular: state => state.popular,
  results: state => state.results
}