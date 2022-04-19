export const state = () => ({
  list: [],
  total: 0,
  requests: {
    total: {
      subscribers: 0,
      subscriptions: 0
    },
    list: {
      subscribers: [],
      subscriptions: []
    }
  },
  filters: ['All Friends', 'Friend Requests', 'My Requests']
})

export const mutations = {  
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  async load({commit, state}, params) {
    const { data } = await this.$axios.post('/appApi/friends.get', params)
    if(params.offset === 0) commit('setState', {key: 'list', value: []})
    commit('setState', {key: 'list', value: state.list.concat(data.response.users)})
    commit('setState', {key: 'total', value: data.response.total_friends})
    this.dispatch('friends/requests', {offset: params.offset})
  },
  async search({commit}, params) {
    const { data } = await this.$axios.post('/appApi/user.search', params)
    commit('setState', {key: 'list', value: data.response.users})
  },
  async add({}, params) {
    await this.$axios.post('/appApi/friends.add', params)
    return true
  },
  async remove({}, params) {
    await this.$axios.post('/appApi/friends.del', params)
    return true
  },
  async update({}, params) {
    await this.dispatch('friends/load', params)
    await this.dispatch('friends/requests', Object.assign({type: 0}, params))
    await this.dispatch('friends/requests', Object.assign({type: 1}, params))
    return true
  },
  async report({}, params) {
    await this.$axios.post('/appApi/user.report', params)
    return true
  },
  async requests({state, commit}, params) {
    const { data } = await this.$axios.post('/appApi/friends.requests', params)
    let requests = this.$deepClone(state.requests)
    if(typeof params.type != 'undefined') {
      let key = (params.type) ? 'subscriptions' : 'subscribers'
      requests.list[key] = data.response.users
    } else {
      requests.total = data.response.users
    }
    commit('setState', {key: 'requests', value: requests})
  },
}

export const getters = {
  list: state => state.list,
  total: state => state.total,
  requests: state => state.requests,
  filters: state => state.filters
}