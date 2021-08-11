export const state = () => ({
  pageTitle: 'Perfect Fantasy',
  pageData: '/games/frame.html'
})

export const mutations = {
  setPageTitle(state, title) {
    state.pageTitle = title
  },
  setPageData(state, data) {
    state.pageData = data
  }
}

export const actions = {
  setPageTitle({commit}, params) {
    commit('setPageTitle', params)
  },
  setPageData({commit}, params) {
    commit('setPageData', params)
  }
}

export const getters = {
  pageTitle: state => state.pageTitle,
  pageData: state => state.pageData
}
