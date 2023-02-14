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
  async chats({commit}) {
    let { data } = await this.$axios.post('/appApi/chats', {}),
      offset = data.response.offset,
      chats = data.response.chats

    for (; offset != 0;) {
      let { data } = await this.$axios.post('/appApi/chats', {'offset': offset})
      chats = [...chats, ...data.response.chats]
      offset = data.response.offset
    }
    commit('setState', {key: 'chats', value: chats})
  },
  async load({state,commit}, params) {
    let messages = {
      code: '',
      list: {},
      total: 0,
      uid:params.uid
    }
    if(params.observer && params.uid===state.messages.uid){
      params.offset = state.messages.offset
      messages.list = JSON.parse(JSON.stringify(state.messages.list))
    }
    console.log(params)
    const {data} = params.uid ? await this.$axios.post('/appApi/messages', params) : {data: {response:false}}
    if(data.response || params.observer) {
      messages.total = data.response.messages.length
      messages.offset = data.response.offset
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
        data.response.messages[i].time = this.$moment.unix(data.response.messages[i].timestamp).format('HH:mm')
        messages.list[date] = (messages.list[date]) ? messages.list[date] : []
        if(!params.observer) {
          messages.list[date].push(data.response.messages[i])
        }else{
          messages.list[date].unshift(data.response.messages[i])
        }
      }

      messages.list = Object.entries(messages.list)
        .sort((a, b) => new Date(a[0].split('.').reverse().join('-')) - new Date(b[0].split('.').reverse().join('-')))
        .reduce((acc, [date, message]) => ({...acc, [date]: message}), {})
    }
    commit('setState', {key: 'messages', value: messages})
    return !!data.response.offset
  },
  async send({state, commit}, params) {
    const { data } = await this.$axios.post('/appApi/message.send', params)
    let messages = this.$deepClone(state.messages),
        date = this.$moment.unix(data.response.result.message.timestamp).format('DD.MMMM.YYYY')
    messages.list[date] = (messages.list[date]) ? messages.list[date] : {}
    messages.list[date] = Object.values(messages.list[date])
    data.response.result.message.time = this.$moment.unix(data.response.result.message.timestamp).format('HH:mm')
    messages.list[date].push(data.response.result.message)
    commit('setState', {key: 'messages', value: messages})
  },
  async clear({}, params) {
    await this.$axios.post('/appApi/chat.clear', params)
  },
  async search({commit}, params) {
    const { data } = await this.$axios.post('/appApi/chat.search', params)
    commit('setState', {key: 'chats', value: data.response.chats})
  }
}

export const getters = {
  messages: state => state.messages,
  chats: state => state.chats,
}
