export const state = () => ({
  data: null,
  balanceHistory: []
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  set({ commit }, data) {
    commit('setState', {
      key: 'data',
      value: data
    })
  },
  async getBalance({state, commit}) {
    const { data } = await this.$axios.post('/appApi/user.balance', {})
    let profile = Object.assign({}, state.data)
    profile.balance = data.response.balance
    commit('setState', {
      key: 'data',
      value: profile
    })
    commit('setState', {
      key: 'balanceHistory',
      value: data.response.history
    })
  },
  async paymentsPrepare({}, params) {
    const { data } = await this.$axios.post('/appApi/payments.prepare', params)
    return data
  }
}

export const getters = {
  data: state => state.data,
  balanceHistory: state => state.balanceHistory,
  isGuest: state => state.data.is_guest
}