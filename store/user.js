export const state = () => ({
  token: null,
  darkTheme: false,
  user: null,
  messages: null,
  chats: null,
  friends: null,
  requestIn: null,
  requestOut: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
    state.darkTheme = (user.theme) ? true : false
  }
}

export const actions = {
  signIn({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/signin', params).then(response => {
        commit('setToken', response.data.response.api_token)
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  signUp({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/signup', params).then(response => {
        commit('setToken', response.data.response.token)
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  auth({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/auth', params).then((response) => {
        commit('setUser', response.data.response)
        commit('setToken', params.get('api_token'))
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  setToken({commit}, params) {
    commit('setToken', params)
  },
  restorePassword({}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/user.restore', params).then(response => {
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
}

export const getters = {
  token: state => state.token,
  darkTheme: state => state.darkTheme,
  user: state => state.user,
  messages: state => state.messages,
  chats: state => state.chats,
  friends: state => state.friends,
  requestIn: state => state.requestIn,
  requestOut: state => state.requestOut
}