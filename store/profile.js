export const state = () => ({
  data: null,
  balanceHistory: [],
  paymentsMethods: []
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
    const { data } = await this.$axios.post('user.balance', {})
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
    commit('setState', {
      key: 'isGuest',
      value: data.response.is_guest
    })
    return data.response.balance
  },
  async paymentsPrepare({}, params) {
    const { data } = await this.$axios.post('payments.prepare', params)
    return data
  },
  async getPaymentsMethods({commit}, params) {
    const { data } = await this.$axios.post('payments.methods', params)

    commit('setState', {
      key: 'paymentsMethods',
      value: data.response
    })
  }
}

export const getters = {
  data: state => state.data,
  balanceHistory: state => state.balanceHistory,
  isGuest: state => state?.data?.is_guest,
  paymentsMethods: state => state.paymentsMethods
}
