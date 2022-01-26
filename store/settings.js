export const state = () => ({
  access: {},
  main: {},
  notifications: {},
  countries: null,
  cities: null
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  set({ commit }, data) {
    Object.keys(data).map(e => {
      commit('setState', {
        key: e,
        value: data[e]
      })
    })
  },
  async getLocations({commit}, params) {
    const { data } = await this.$axios.post('/appApi/util.' + params.key, params.data)
    let list = {}
    data.response[params.key].map(e => {
      list[e.id] = e.title
    })
    commit('setState', {
      key: params.key,
      value: list
    })
  },
  async updateMain({commit}, params) {
    const { data } = await this.$axios.post('/appApi/settings.main.save', params)
    if(!data.error) {
      let profile = Object.assign({}, this.getters['profile/data'])
      profile.first_name = params.first_name
      profile.last_name = params.last_name
      profile.user_name = params.first_name + ' ' + params.last_name
      this.dispatch('profile/set', profile)
      commit('setState', {
        key: 'main',
        value: params
      })
      return false
    }
    return data.error
  },
  async updateAccess({commit}, params) {
    const { data } = await this.$axios.post('/appApi/settings.access.save', params)
    if(!data.error) {
      commit('setState', {
        key: 'access',
        value: {email: params.email}
      })
      return false
    }
    return data.error
  },
  async updateNotifications({commit}, params) {
    await this.$axios.post('/appApi/settings.notifications.save', params)
    commit('setState', {
      key: 'notifications',
      value: params
    })
  },
  async removePhoto({}) {
    const { data } = await this.$axios.post('/appApi/settings.avatar.delete', {})
    let profile = Object.assign({}, this.getters['profile/data'])
    profile.avatar_urls = data.response.avatar_urls
    this.dispatch('profile/set', profile)
  },
  async uploadPhoto({}, file) {
    const { data } = await this.$axios.post('https://api.exe.world/settings.avatar.upload', {file: file})
    let profile = Object.assign({}, this.getters['profile/data'])
    profile.avatar_urls = data.response.result.avatar
    this.dispatch('profile/set', profile)
  }
}

export const getters = {
  access: state => state.access,
  main: state => state.main,
  notifications: state => state.notifications,
  countries: state => state.countries,
  cities: state => state.cities
}