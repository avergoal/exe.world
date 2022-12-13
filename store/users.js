export const state = () => ({
  profile: null
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  async load({commit}, params) {
    commit('setState', {key: 'profile', value: null})
    const { data } = await this.$axios.post('/appApi/user.info', params)
    commit('setState', {key: 'profile', value: data.response})
  },
  async report({}, params) {
    await this.$axios.post('/appApi/user.report', params)
    return true
  }
}

export const getters = {
  profile: state => state.profile
}
