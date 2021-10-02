export const state = () => ({
  profile: null
})

export const mutations = {  
  setProfile(state, profile) {
    state.profile = profile
  }  
}

export const actions = {
  getProfile({commit}, params) {
    this.$axios.post('/appApi/user.info', params).then(response => {
      console.log(response)
      commit('setProfile', (response.data) ? response.data.response : null)
    }).catch(err => {console.log(err)})
  },
  async addFriends({}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/friends.add', params).then(response => {
        console.log(response)
        resolve(true)
      }).catch(err => {console.log(err.response)})
    })
  }
}

export const getters = {
  profile: state => state.profile
}