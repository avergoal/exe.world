export const state = () => ({
  profile: null
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  async load({commit}, params) {
    commit('setState', {key: 'profile', value: null})
    const { data } = await this.$axios.post('/appApi/user.info', params)
    commit('setState', {key: 'profile', value: data.response})
  },
  async report({}, params) {
    await this.$axios.post('/appApi/user.report', params)
    return true
  },
  async loadGames({commit,state}){
    let profile = JSON.parse(JSON.stringify(state.profile))
    if (profile.games.offset){
      let params = {
        uid:profile.user.uid,
        offset:profile.games.offset
      }
      const { data } = await this.$axios.post('/appApi/user.games', params)
      profile.games.games.push(...data.response.games)
      profile.games.offset = data.response.offset

      commit('setState', {key: 'profile', value: profile})
    }
  },
  async loadFriends({commit,state}){
    let profile = JSON.parse(JSON.stringify(state.profile))
    if (profile.friends.offset){
      let params = {
        uid:profile.user.uid,
        offset:profile.friends.offset
      }

      const { data } = await this.$axios.post('/appApi/friends.get', params)
      profile.friends.users.push(...data.response.users)
      profile.friends.offset = data.response.offset

      commit('setState', {key: 'profile', value: profile})
    }
  }
}

export const getters = {
  profile: state => state.profile
}
