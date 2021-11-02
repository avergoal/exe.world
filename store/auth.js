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
    return new Promise(async (resolve) => {
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
      resolve(true)
    })
  },
  async signIn({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/signin', params)
      if(!data.error) {
        this.dispatch('auth/auth', { api_token: data.response.api_token })
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async signUp({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/signup', params)
      if(!data.error) {
        this.dispatch('auth/auth', { api_token: data.response.api_token })
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async restorePassword({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/user.restore', params)
      if(!data.error) {
        this.dispatch('app/toggleModal', {target: 'emailSend'})
        resolve(false)
      }
      resolve(data.error)
    })
  },
  setToken({commit}, params) {
    commit('setState', {key: 'token', value: params})
  }
}

export const getters = {
  token: state => state.token
}