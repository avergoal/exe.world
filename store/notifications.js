export const state = () => ({
  sidebar: {},
  header: {
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
  async set({ commit }, data) {
    if(data.type == 'sidebar') {
      if(!data.notifications) {
        data.notifications = await this.$axios.post('user.notifications', {})
        data.notifications = data?.notifications?.data?.response?.notifications??{}
      }
      commit('setState', {
        key: 'sidebar',
        value: data.notifications
      })
    } else {
      const { data } = await this.$axios.post('notifications', {})
      commit('setState', {
        key: 'header',
        value: {
          total: data?.response?.notifications?.length,
          list: data.response?.notifications
        }
      })
    }
  },
  async clear({ commit }) {
    await this.$axios.post('notifications.clear', {})
    commit('setState', {
      key: 'header',
      value: {
        total: 0,
        list: []
      }
    })
  }
}

export const getters = {
  sidebar: state => state.sidebar,
  header: state => state.header
}
