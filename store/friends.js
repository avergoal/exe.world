export const state = () => ({
  list: [],
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
  async load({commit}, params) {
    const { data } = await this.$axios.post('/appApi/friends.get', params)
    commit('setState', {key: 'list', value: data.response.users})
    this.dispatch('friends/requests', {offset: 0})
  },
  async add({}, params) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/friends.add', params)
      resolve(true)
    })
  },
  async remove({}, params) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/friends.del', params)
      resolve(true)
    })
  },
  async update({}) {
    return new Promise(async (resolve) => {
      await this.dispatch('friends/load', {offset: 0})
      await this.dispatch('friends/requests', {offset: 0, type: 0})
      await this.dispatch('friends/requests', {offset: 0, type: 1})
      resolve(true)
    }) 
  },
  async report({}, params) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/user.report', params)
      resolve(true)
    })
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
  requests: state => state.requests,
  filters: state => state.filters
}

/*
async setFriends({commit}, params) {
    const { data } = await this.$axios.post('/appApi/friends.get', params)
    commit('setState', {
      key: 'friends',
      value: {
        total: data.response.users.length,
        list: data.response.users
      }
    })
  },
  async setFriendsRequest({commit}, params) {
    let key = params.key
    delete params.key
    const { data } = await this.$axios.post('/appApi/friends.requests', params)
    commit('setState', {
      key: key,
      value: {
        total: data.response.users.length,
        list: data.response.users
      }
    })
  },
*/