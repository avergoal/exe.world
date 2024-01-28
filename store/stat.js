export const state = () => ({
  headers:{}
})


export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  },
}


export const actions = {
  sendStat({state},params) {
    try {
      this.$axios.post('/appApi/stat' , params)
    }catch (e) {
      console.log(e)
    }
  },
  setHeader({commit},params) {
    commit('setState', {key: 'headers', value: params})
  },
}


export const getters = {
  headers: state => state.headers
}

