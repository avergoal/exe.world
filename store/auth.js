export const state = () => ({
  token: null
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  // Auth
  async auth({commit}, params) {
    const { data } = await this.$axios.post('/appApi/auth', params)
    if(data.error) {
      localStorage.removeItem('token')
    } else {
      if(params.api_token) {
        commit('setState', {key: 'token', value: params.api_token})
        localStorage.setItem('token', params.api_token)
      }
      this.dispatch('profile/load', data.response)
      await this.dispatch('app/initAppData', {})
      this.dispatch('profile/setNotifications', {})
    }
    return true
  },
  async signIn({}, params) {
    const { data } = await this.$axios.post('/appApi/signin', params)
    if(!data.error) {
      this.dispatch('auth/auth', { api_token: data.response.api_token })
      return false
    }
    return data.error
  },
  async signUp({}, params) {
    const { data } = await this.$axios.post('/appApi/signup', params)
    if(!data.error) {
      this.dispatch('auth/auth', { api_token: data.response.api_token })
      return false
    }
    return data.error
  },
  async restorePassword({}, params) {
    const { data } = await this.$axios.post('/appApi/user.restore', params)
    if(!data.error) {
      this.dispatch('app/toggleModal', {target: 'emailSend'})
      return false
    }
    return data.error
  },
  setToken({commit}, params) {
    commit('setState', {key: 'token', value: params})
  }
}

export const getters = {
  token: state => state.token
}