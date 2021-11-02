export const state = () => ({
  messages: {},
  chats: []
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  async chats({commit}, params) {
    const { data } = await this.$axios.post('/appApi/chats', {})
    commit('setState', {key: 'chats', value: data.response.chats})
  },
  async load({commit}, params) {
    const { data } = await this.$axios.post('/appApi/messages', params)
    let messages = {}
    if(data.response) {
      data.response.messages.sort((a, b) => {
        if(a.mid > b.mid) {
          return 1
        } else if (a.mid < b.mid) {
          return -1
        }
        return 0
      })
      for(let i = 0; i < data.response.messages.length; i++) {
        let date = this.$moment.unix(data.response.messages[i].timestamp).format('DD.MMMM.YYYY')
        messages[date] = (messages[date]) ? messages[date] : []
        data.response.messages[i].time = this.$moment.unix(data.response.messages[i].timestamp).format('hh:mm')
        messages[date].push(data.response.messages[i])
      }
    }
    commit('setState', {key: 'messages', value: messages})
  },
  async send({state, commit}, params) {
    const { data } = await this.$axios.post('/appApi/message.send', params)
    let messages = this.$deepClone(state.messages),
        date = this.$moment.unix(data.response.result.message.timestamp).format('DD.MMMM.YYYY')
    messages[date] = (messages[date]) ? messages[date] : {}
    messages[date] = Object.values(messages[date])
    data.response.result.message.time = this.$moment.unix(data.response.result.message.timestamp).format('hh:mm')
    messages[date].push(data.response.result.message)
    commit('setState', {key: 'messages', value: messages})
  },
}

export const getters = {
  messages: state => state.messages,
  chats: state => state.chats,
}