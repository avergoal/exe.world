export const state = () => ({
  token: null,
  user: null,
  theme: 0,
  blacklist: [],
  balance: {
    balance: 0,
    history: []
  },
  notifications: {
    total: 0,
    list: []
  }
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  // Auth
  async auth({commit}, params) {
    return new Promise(async () => {
      const { data } = await this.$axios.post('/appApi/auth', params)
      if(data.error) {
        localStorage.removeItem('token')
      } else {
        let user = Object.assign({}, data.response),
            age = user.settings.main.birth_date.match(/(\d{4})(\d{2})(\d{2})/)
        user.settings.main.birth_date_obj = {
          y: (Number(age[1])) ? age[1] : '',
          m: (Number(age[2])) ? age[2] : '',
          d: (Number(age[3])) ? age[3] : ''
        }
        commit('setState', {
          key: 'user',
          value: user
        })
        this.dispatch('profile/setToken', params.api_token)
        localStorage.setItem('token', params.api_token)
        this.dispatch('app/initAppData', {})
        this.dispatch('profile/setNotifications', {})
        this.dispatch('profile/setTheme', Number(user.theme))
        let filters = {}
        filters[0] = {
          cid: 0,
          title: 'All',
          total: 0
        }
        for(let i = 0; i < user.user_games.length; i++) {
          if(!filters[user.user_games[i].type.cid]) {
            filters[user.user_games[i].type.cid] = {
              cid: user.user_games[i].type.cid,
              title: user.user_games[i].type.title,
              total: 1
            }
          } else {
            ++filters[user.user_games[i].type.cid].total
          }
          ++filters[0].total
        }
        this.dispatch('filters/setUserCategories', {
          current: 0,
          list: filters
        })
      }
    })
  },
  async signIn({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/signin', params)
      if(!data.error) {
        this.dispatch('profile/auth', { api_token: data.response.api_token })        
        this.dispatch('app/toggleModal', {})
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async signUp({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/signup', params)
      if(!data.error) {
        this.dispatch('profile/setToken', data.response.api_token)
        localStorage.setItem('token', data.response.api_token)
        this.dispatch('profile/auth', { api_token: data.response.api_token })
        this.dispatch('app/toggleModal', {})
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async restorePassword({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/user.restore', params)
      if(!data.error) {
        this.dispatch('app/toggleModal', {
          open: true,
          target: 'emailSend'
        })
        resolve(false)
      }
      resolve(data.error)
    })
  },
  setToken({commit}, params) {
    commit('setState', {
      key: 'token',
      value: params
    })
  },
  // Settings
  async updateData({state}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/settings.main.save', params)
      if(!data.error) {
        this.dispatch('profile/auth', { api_token: state.token })
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async updateAccess({state}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/settings.access.save', params)
      if(!data.error) {
        this.dispatch('profile/auth', { api_token: state.token })
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async updateNotifications({state}, params) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/settings.notifications.save', params)
      this.dispatch('profile/auth', { api_token: state.token })
    })
  },
  // Theme
  setTheme({commit}, params) {
    commit('setState', {
      key: 'theme',
      value: params
    })
    this.$axios.post('/appApi/settings.theme.switch', {theme: params})
  },
  // Notifications
  async setNotifications({commit}, params) {
    const { data } = await this.$axios.post('/appApi/notifications', params)
    if(data.response) {
      commit('setState', {
        key: 'notifications',
        value: {
          total: data.response.notifications.length,
          list: data.response.notifications
        }
      })
    }
  },
  clearNotifications({}) {
    this.$axios.post('/appApi/notifications.clear', {})
    this.dispatch('profile/setNotifications', {})
  },
  // Balance
  async setBalance({commit}) {
    const { data } = await this.$axios.post('/appApi/user.balance', {})
    commit('setState', {
      key: 'balance',
      value: data.response
    })
  },
  // Black list
  async setBlackList({}) {
    const { data } = await this.$axios.post('/appApi/blacklist.get', {})
    console.log(data)
    return
  },
}



/*

export const actions = {
  
  async removePhoto({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/settings.avatar.delete', params.formData).then((response) => {
        let formData = new FormData()
        formData.append('api_token', params.token)
        this.dispatch('user/auth', formData)
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  async changePhoto({commit}, params) {
    commit('setToken', params)
  },
  ,
  
  setTheme({commit}, params) {
    commit('setTheme', params.theme)
    this.$axios.post('/appApi/settings.theme.switch', params.data)
  },
  
  
  
}
 */
export const getters = {
  token: state => state.token,
  user: state => state.user,
  theme: state => state.theme,
  blacklist: state => state.blacklist,
  balance: state => state.balance,
  notifications: state => state.notifications,
}