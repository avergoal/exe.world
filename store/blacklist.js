export const state = () => ({
  list: []
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  async load({commit}) {
    const { data } = await this.$axios.post('/appApi/blacklist.get', {})
    let list = {}
    for(let i = 0; i < data.response.blacklist.length; i++) {
      list[data.response.blacklist[i].uid] = data.response.blacklist[i]
    }
    commit('setState', {key: 'list', value: list})
  },
  async add({}, params) {
    await this.$axios.post('/appApi/blacklist.add', params)
  },
  async remove({commit, state}, params) {
    await this.$axios.post('/appApi/blacklist.remove', params)
    let list = this.$deepClone(state.list)
    delete list[params.uid]
    commit('setState', {key: 'list', value: list})
  }
}

export const getters = {
  list: state => state.list
}