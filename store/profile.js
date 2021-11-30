export const state = () => ({
  user: null,
  filters: {
    friends: {current: 0, list: ['All Friends', 'Friend Requests', 'My Requests']},
    games: {current: 0, list: {}}
  },
  balance: {balance: 0, history: []},
  notifications: {total: 0, list: []}
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  load({state, commit}, params) {
    let age = params.settings.main.birth_date.match(/(\d{4})(\d{2})(\d{2})/),
        filters = this.$deepClone(state.filters)
    params.settings.main.birth_date_obj = {y: age[1], m: age[2], d: age[3]}
    filters.games[0] = {cid: 0, title: 'All', total: 0}
    for(let i = 0; i < params.user_games.length; i++) {
      if(!filters.games[params.user_games[i].type.cid]) {
        filters.games[params.user_games[i].type.cid] = {
          cid: params.user_games[i].type.cid,
          title: params.user_games[i].type.title,
          total: 1
        }
      } else ++filters.games[params.user_games[i].type.cid].total
      ++filters.games[0].total
    }
    commit('setState', {key: 'user', value: params})
    commit('setState', {key: 'theme', value: Number(params.theme)})
    commit('setState', {key: 'filters', value: filters})
  },
  async setProfile({commit}) {
    const { data } = await this.$axios.post('/appApi/auth', {})
    let age = data.response.settings.main.birth_date.match(/(\d{4})(\d{2})(\d{2})/)
    data.response.settings.main.birth_date_obj = {y: age[1], m: age[2], d: age[3]}
    commit('setState', {key: 'user', value: data.response})
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
    this.dispatch('profile/setNotifications', {total: 0, list: []})
  },
  // Balance
  async setBalance({commit}) {
    const { data } = await this.$axios.post('/appApi/user.balance', {})
    commit('setState', {key: 'balance', value: data.response})
  }
}

export const getters = {
  user: state => state.user,
  filters: state => state.filters,
  balance: state => state.balance,
  notifications: state => state.notifications
}