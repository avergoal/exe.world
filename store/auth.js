export const state = () => ({
  token: null
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  async auth({commit}, token) {
    const { data } = await this.$axios.post('auth', {
      api_token: token
    })
    if(data.error) {
        localStorage.removeItem('token')
    } else {
      localStorage.setItem('token', token)
      await this.dispatch('app/initAppData')
      this.dispatch('app/setTheme', {
        theme: data.response?.theme
      })
      this.dispatch('profile/set', Object.assign({
        wssid: data.response?.wssid,
        balance: data.response?.balance
      }, data.response?.profile))
      this.dispatch('notifications/set', {
        type: 'sidebar',
        notifications: data.response?.notifications
      })
      this.dispatch('notifications/set', {
        type: 'header'
      })
      this.dispatch('games/setGames', {
        category: 'userRecent',
        data: data.response?.recent_games
      })
      this.dispatch('games/setGames', {
        category: 'userAll',
        data: {
          offset: 0,
          list: data.response?.user_games.splice(0, 20)
        }
      })
      this.dispatch('settings/set', data.response?.settings)
      commit('setState', {
        key: 'token',
        value: token
      })

    }
  },
  async regGuest({}) {
    let guestToken = this.getters['auth/token']
    const { data } = await this.$axios.post('guest', {
      api_token: guestToken
    })

    if (!data.error) {
      await this.dispatch('auth/auth', data.response.api_token)
      return false
    }
    return data.error
  },
  async authSocilas({}, params) {
    const { data } = await this.$axios.post('social.' + params)
    return (data.response) ? data.response.url : false
  },
  async signIn({}, params) {
    const {data} = await this.$axios.post('signin', params)
    if(!data?.error) {
      this.dispatch('auth/auth', data.response.api_token)
      return false
    }
    return data.error
  },
  async signUp({}, params) {
    const { data } = await this.$axios.post('signup', params)
    if(!data.error) {
      this.dispatch('auth/auth', data.response.api_token)
      return false
    }
    return data.error
  },
  async restorePassword({}, params) {
    const { data } = await this.$axios.post('user.restore', params)
    if(!data.error) {
      this.dispatch('app/toggleModal', {target: 'emailSend'})
      return false
    }
    return data.error
  },
  async logout({state}){
    const { data } = await this.$axios.post('signout', {api_token:state.token})
    if(!data.error) {
      localStorage.removeItem('token')
      window.location.reload()
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
