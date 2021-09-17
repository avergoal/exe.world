export const state = () => ({
  category: 0
})

export const mutations = {
  setCategory(state, filter) {
    state.category = filter
  }
}

export const actions = {
  setCategory({commit}, params) {
    commit('setCategory', params)
  }
}

export const getters = {
  category: state => state.category
}