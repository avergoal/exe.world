export const state = () => ({
  open: false,
  popular: [],
  games: [],
  peoples: []
})

export const mutations = {
  setPopular(state, popular) {
    state.popular = popular
  },
  setOpen(state, open) {
    state.open = open
  },
  goSearch(state, data) {
    state.games = data.games
    state.peoples = data.peoples
  }
}

export const actions = {
  setPopular({commit}, params) {
    commit('setPopular', params)
  },
  setOpen({commit}, params) {
    commit('setOpen', params)
  },
  goSearch({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/search', params).then(response => {
        console.log(response)
        let result = {
          games: [],
          peoples: []
        }
        if(response.data.response.users.length) {
          result.peoples = response.data.response.users
        }
        if(response.data.response.games.length) {
          result.games = response.data.response.games
        }
        commit('goSearch', result)
        resolve(true)
      }).catch(err => {resolve(err.response)})
    })
  }
}

export const getters = {
  open: state => state.open,
  popular: state => state.popular,
  games: state => state.games,
  peoples: state => state.peoples
}