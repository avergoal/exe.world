export const state = () => ({
  page: 'index'
})

export const mutations = {  
  setPage(state, page) {
    state.page = page
  }  
}

export const actions = {
  async nuxtServerInit() {
    const data = await this.$axios.$post('/appApi/init').catch(err => {console.log(err.response)})
    return data
  },
  async sendRequest({}, params) {
    return new Promise((resolve) => {
      this.$axios.post('/appApi/request', params).then(response => {
        resolve(response)
      }).catch(err => {resolve(err.response)})
    })
  },
  setPage({commit}, params) {
    commit('setPage', params)
  }
}

export const getters = {
  page: state => state.page
}