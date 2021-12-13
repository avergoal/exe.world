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
    let messages = {
      code: '',
      list: {}
    }
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
        messages.list[date] = (messages.list[date]) ? messages.list[date] : []
        data.response.messages[i].time = this.$moment.unix(data.response.messages[i].timestamp).format('hh:mm')
        messages.list[date].push(data.response.messages[i])
      }
      messages.code = data.response.chat.clear_code
    }
    commit('setState', {key: 'messages', value: messages})
  },
  async send({state, commit}, params) {
    const { data } = await this.$axios.post('/appApi/message.send', params)
    let messages = this.$deepClone(state.messages),
        date = this.$moment.unix(data.response.result.message.timestamp).format('DD.MMMM.YYYY')
    messages.list[date] = (messages.list[date]) ? messages.list[date] : {}
    messages.list[date] = Object.values(messages.list[date])
    data.response.result.message.time = this.$moment.unix(data.response.result.message.timestamp).format('hh:mm')
    messages.list[date].push(data.response.result.message)
    commit('setState', {key: 'messages', value: messages})
  },
  async clear({}, params) {
    await this.$axios.post('/appApi/chat.clear', params)
  },
  async search({commit}, params) {
    const { data } = await this.$axios.post('/appApi/chat.search', params)
    console.log(data)
  }
}

export const getters = {
  messages: state => state.messages,
  chats: state => state.chats,
}