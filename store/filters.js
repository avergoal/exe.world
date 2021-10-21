export const state = () => ({
  allCategories: {
    current: 0,
    list: []
  },
  userCategories: {
    current: 0,
    list: []
  }
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  setAllCategories({commit}, params) {
    commit('setState', {
      key: 'allCategories',
      value: params
    })
  },
  setUserCategories({commit}, params) {
    commit('setState', {
      key: 'userCategories',
      value: params
    })
  },
}

export const getters = {
  allCategories: state => state.allCategories,
  userCategories: state => state.userCategories
}