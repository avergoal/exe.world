export const state = () => ({
  modalOpen: false,
  modalActive: false,
  modalTarget: null,
  modalTab: 'personal'
})

export const mutations = {
  setModalOpen(state, open) {
    state.modalOpen = open
  },
  setModalActive(state, active) {
    state.modalActive = active
  },
  setModalTarget(state, target) {
    state.modalTarget = target
  },
  setModalTab(state, tab) {
    state.modalTab = tab
  }
}

export const actions = {
  setModalOpen({commit}, params) {
    if(params.open) {
      commit('setModalTarget', params.target)
      commit('setModalOpen', params.open)
      setTimeout(() => {
        commit('setModalActive', params.open)
      }, 300)
      if(typeof params.tab != 'undefined') {
        commit('setModalTab', params.tab)
      }
    } else {
      commit('setModalActive', params.open)
      commit('setModalTab', 'personal')
      setTimeout(() => {
        commit('setModalOpen', params.open)
        commit('setModalTarget', params.target)
      }, 300)
    }
  },
  setModalTab({commit}, params) {
    commit('setModalTab', params)
  }
}

export const getters = {
  modalOpen: state => state.modalOpen,
  modalActive: state => state.modalActive,
  modalTarget: state => state.modalTarget,
  modalTab: state => state.modalTab
}
