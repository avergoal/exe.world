export const state = () => ({
  theme: 0,
  page: 'index',
  modal: {},
  countries: [],
  cities: [],
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
  async initAppData({}, params) {
    return new Promise(async (resolve) => {
      const { response } = await this.$axios.$post('/appApi/init', params)
      let games = {},
          search = []
      for(let i = 0; i < response.length; i++) {
        for(let e in response[i]) {
          switch(e) {
            case 'guest_token':
              if(!this.getters['auth/token']) {
                this.dispatch('auth/setToken', response[i][e])
              }
              break
            case 'games_carousel':
            case 'games_new':
            case 'games_recommended':
            case 'games_all':
              games[e] = response[i][e]
              break
            case 'categories':
              let categories = {}
              for(let c = 0; c < response[i][e].length; c++) {
                if(response[i][e][c].total_games) {
                  categories[response[i][e][c].cid] = response[i][e][c]
                  categories[response[i][e][c].cid].list = []
                  categories[response[i][e][c].cid].loaded = false
                  categories[response[i][e][c].cid].offset = 0
                }
              }
              categories[0] = {
                cid: 0,
                title: 'All',
                loaded: false,
                list: [],
                offset: 0
              }
              games[e] = categories
              break
            case 'popular_search':
              search = response[i][e]
              break
          }
        }  
      }
      this.dispatch('games/setInitData', games)
      this.dispatch('search/setPopular', search)
      resolve(true)
    })
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
  // Utilities
  async setCountries({commit}) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/util.countries')
      let countries = {}
      for(let i = 0; i < data.response.countries.length; i++) {
        countries[data.response.countries[i].id] = data.response.countries[i].title
      }
      commit('setState', {key: 'countries', value: countries})
      resolve(true)
    })
  },
  async setCities({commit}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/util.cities', params)
      let cities = {}
      for(let i = 0; i < data.response.cities.length; i++) {
        cities[data.response.cities[i].id] = data.response.cities[i].title
      }
      commit('setState', {key: 'cities', value: cities})
      resolve(true)
    })
  },
  // Pages
  setPage({commit}, params) {
    commit('setState', {key: 'page', value: params})
  },
  // Theme
  setTheme({commit}, params) {
    commit('setState', {key: 'theme', value: params})
    this.$axios.post('/appApi/settings.theme.switch', {theme: params})
  },
  // About
  setAbout() {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/article.about', {})
      resolve(data.response.content)
    })
  },
  // Another request
  async sendRequest({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/request', params)
      resolve(data)
    })
  },
  // News
  async setNews({commit}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/news.my', params)
      commit('setState', {key: 'news', value: data.response.news})
      resolve(true)
    })
  },
  // Subjects
  async setSupportSubjects({commit}) {
    const { data } = await this.$axios.post('/appApi/support.subjects', {})
    let subjects = this.$deepClone(data.response.subjects)
    subjects.support = data.response.subjects
    commit('setState', {key: 'subjects', value: subjects})
  },
  async setReportSubjects({commit}) {
    const { data } = await this.$axios.post('/appApi/user.report.subjects', {})
    let subjects = this.$deepClone(data.response.subjects)
    subjects.report = data.response.result
    console.log(subjects)
    commit('setState', {key: 'subjects', value: subjects})
  }
}

export const getters = {
  theme: state => state.theme,
  page: state => state.page,
  modal: state => state.modal,
  countries: state => state.countries,
  cities: state => state.cities,
  news: state => state.news,
  subjects: state => state.subjects,
}