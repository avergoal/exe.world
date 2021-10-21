export const state = () => ({
  profile: null,
  friends: [],
  mutualFriends: []
})

export const mutations = {  
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  async setProfile({commit}, params) {
    commit('setState', {key: 'profile', value: null})
    commit('setState', {key: 'friends', value: []})
    commit('setState', {key: 'mutualFriends', value: []})
    const { data } = await this.$axios.post('/appApi/user.info', params)
    commit('setState', {key: 'profile', value: data.response})
    commit('setState', {key: 'friends', value: data.response.friends.users})
    commit('setState', {key: 'mutualFriends', value: data.response.mutual_friends.users})
  },
  async addFriends({}, params) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/friends.add', params)
      resolve(true)
    })
  },
  
}

export const getters = {
  profile: state => state.profile,
  friends: state => state.friends,
  mutualFriends: state => state.mutualFriends,
}