export const state = () => ({
  messages: {},
  chats: [],
  dialog:[]
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
    let dialog = [...state.dialog]
    if(params.observer && params.uid===state.messages.uid){
      params.offset = state.messages.offset
      messages.list = JSON.parse(JSON.stringify(state.messages.list))
    }
    const {data} = params.uid ? await this.$axios.post('/appApi/messages', params) : {data: {response:false}}
    if(data.response || params.observer) {
      messages.total = data.response.messages.length
      messages.offset = data.response.offset
      messages.code =  data.response.chat.clear_code
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
        data.response.messages[i].date = date
        messages.list[date] = (messages.list[date]) ? messages.list[date] : []
        dialog.push(data.response.messages[i])
        if(!params.observer) {
          messages.list[date].push(data.response.messages[i])
        }else{
          messages.list[date].unshift(data.response.messages[i])
        }
      }
      dialog=dialog.sort((a, b) => {
        if(a.mid > b.mid) {
          return 1
        } else if (a.mid < b.mid) {
          return -1
        }
        return 0
      })
      messages.list = Object.keys(messages.list)
        .map(key => ({ key, date: new Date(key) }))
        .sort((a, b) => a.date - b.date)
        .reduce((result, entry) => {
          result[entry.key] = messages.list[entry.key];
          return result;
        }, {});
    }
    commit('setState', {key: 'messages', value: messages})
    commit('setState', {key: 'dialog', value: dialog})
    return !!data.response?.offset
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
  dialog: state => state.dialog,
}
