export const state = () => ({
  token: null,
  darkTheme: false,
  user: null,
  countries: [],
  cities: [],
  blackList: [],
  balanceHistory: {
    balance: 0,
    history: []
  },
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
    state.darkTheme = (Number(user.theme)) ? true : false
  },
  setTheme(state, theme) {
    state.darkTheme = theme
  },
  setCountries(state, countries) {
    state.countries = countries
  },
  setCities(state, cities) {
    state.cities = cities
  },
  setBlackList(state, blackList) {
    state.blackList = blackList
  },
  setBalanceHistory(state, balanceHistory) {
    state.balanceHistory = balanceHistory
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
  async auth({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/auth', params).then((response) => {
        let user = Object.assign({}, response.data.response),
            age = user.settings.main.birth_date.match(/(\d{4})(\d{2})(\d{2})/)
        user.settings.main.birth_date_obj = {
          y: (Number(age[1])) ? age[1] : '',
          m: (Number(age[2])) ? age[2] : '',
          d: (Number(age[3])) ? age[3] : ''
        }
        commit('setUser', user)
        commit('setToken', params.get('api_token'))
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  async updateData({}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/settings.main.save', params.formData).then((response) => {
        let formData = new FormData()
        formData.append('api_token', params.token)
        this.dispatch('user/auth', formData)
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  async updateAccess({}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/settings.access.save', params.formData).then((response) => {
        let formData = new FormData()
        formData.append('api_token', params.token)
        this.dispatch('user/auth', formData)
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  async updateNotifications({}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/settings.notifications.save', params.formData).then((response) => {
        let formData = new FormData()
        formData.append('api_token', params.token)
        this.dispatch('user/auth', formData)
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
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
  setTheme({commit}, params) {
    commit('setTheme', params.theme)
    this.$axios.post('/appApi/settings.theme.switch', params.data)
  },
  async setCountries({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/util.countries', params).then(response => {
        let countries = {}
        for(let i = 0; i < response.data.response.countries.length; i++) {
          countries[response.data.response.countries[i].id] = response.data.response.countries[i].title
        }
        commit('setCountries', countries)
        resolve(countries)
      }).catch(err => {resolve(err.response)})
    })
  },
  async setCities({commit}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/util.cities', params).then(response => {
        let cities = {}
        for(let i = 0; i < response.data.response.cities.length; i++) {
          cities[response.data.response.cities[i].id] = response.data.response.cities[i].title
        }
        commit('setCities', cities)
        resolve(cities)
      }).catch(err => {resolve(err.response)})
    })
  },
  setBlackList({commit}, params) {
    this.$axios.post('/appApi/blacklist.get', params).then(response => {
      commit('setBlackList', response.data.response.blacklist)
    })
  },
  setBalanceHistory({commit}, params) {
    this.$axios.post('/appApi/user.balance', params).then(response => {
      commit('setBalanceHistory', response.data.response.balance)
    })
  }
}

export const getters = {
  token: state => state.token,
  darkTheme: state => state.darkTheme,
  user: state => state.user,
  countries: state => state.countries,
  cities: state => state.cities,
  blackList: state => state.blackList,
  balanceHistory: state => state.balanceHistory,
}