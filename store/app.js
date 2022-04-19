export const state = () => ({
  theme: 0,
  page: 'index',
  modal: {},
  news: [],
  subjects: {}
})

export const mutations = {
  setState(state, data) {
    state[data.key] = data.value
  }
}

export const actions = {
  // Inititial app data
  async initAppData() {
    const { response } = await this.$axios.$post('/appApi/init', {})
    let games = {},
        search = []
    response.map(e => {
      let keys = Object.keys(e)
      switch(keys[0]) {
        case 'guest_token':
          this.getters['auth/token'] || this.dispatch('auth/setToken', e[keys[0]])
          break
        case 'games_carousel':
        case 'games_new':
        case 'games_recommended':
          games[keys[0]] = {
            list: e[keys[0]],
            offset: 0
          }
          break
        case 'games_all':
          games[keys[0]] = e[keys[0]]
          break
        case 'categories':
          let categories = {}
          e[keys[0]].map(c => {
            if(c.total_games) {
              categories[c.cid] = c
              categories[c.cid].list = []
              categories[c.cid].offset = 0
            }
          })
          categories[0] = {
            cid: 0,
            title: 'All',
            list: [],
            offset: 0
          }
          games[keys[0]] = categories
          break
        case 'popular_search':
          search = e[keys[0]]
          break
      }
    })
    this.dispatch('games/setInitData', games)
    this.dispatch('search/setPopular', search)
  },
  // Modals
  toggleModal({state, commit}, params) {
    let data = {
      key: 'modal',
      value: Object.assign(this.$deepClone(state.modal), params)
    }
    if(params.target) {
      data.value.open = true
      commit('setState', data)
      setTimeout(() => {
        data = this.$deepClone(data)
        data.value.active = true
        commit('setState', data)
      }, 300)
    } else {
      data.value = this.$deepClone(state.modal)
      data.value.active = false
      commit('setState', data)
      setTimeout(() => {
        data.value = this.$deepClone(data.value)
        data.value.open = false
        commit('setState', data)
        setTimeout(() => {
          commit('setState', {key: 'modal', value: {}})
        }, 350)
      }, 300)
    }
  },
  toggleModalTab({state, commit}, params) {
    let modal = Object.assign({}, state.modal)
    modal.tab = params
    commit('setState', {key: 'modal', value: modal})
  },
  // Pages
  setPage({commit}, params) {
    commit('setState', {key: 'page', value: params})
  },
  // Theme
  setTheme({commit}, params) {
    commit('setState', {
      key: 'theme', 
      value: Number(params.theme)
    })
    if(params.update) {
      this.$axios.post('/appApi/settings.theme.switch', {
        theme: params.theme
      })
    }
  },
  // About
  async setAbout() {
    const { data } = await this.$axios.post('/appApi/article.about', {})
    return data.response.content
  },
  // Another request
  async sendRequest({}, params) {
    const { data } = await this.$axios.post('/appApi/request', params)
    return data
  },
  // News
  async setNews({state, commit}, params) {
    let intersect = params.intersect
    delete params.intersect
    const { data } = await this.$axios.post('/appApi/news.my', params)
    console.log(data.response)
    let results = data.response.news
    if(intersect) {
      results = state.news.concat(results)
    }
    commit('setState', {key: 'news', value: results})
  },
  // Subjects
  async setSupportSubjects({state, commit}) {
    const { data } = await this.$axios.post('/appApi/support.subjects', {})
    let subjects = this.$deepClone(state.subjects)
    subjects.support = data.response.subjects
    commit('setState', {key: 'subjects', value: subjects})
  },
  async setReportSubjects({state, commit}) {
    const { data } = await this.$axios.post('/appApi/user.report.subjects', {})
    let subjects = this.$deepClone(state.subjects)
    subjects.report = data.response.result
    commit('setState', {key: 'subjects', value: subjects})
  },
  // Support
  async sendSupport({}, params) {
    const { data } = await this.$axios.post('/appApi/support.send', params)
    if(!data.error) {
      return false
    }
    return data.error
  }
}

export const getters = {
  theme: state => state.theme,
  page: state => state.page,
  modal: state => state.modal,
  news: state => state.news,
  subjects: state => state.subjects,
}