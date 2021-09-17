export const state = () => ({
  open: false,
  active: false,
  target: null,
  message: null,
  tab: 'personal'
})

export const mutations = {
  setOpen(state, open) {
    state.open = open
  },
  setActive(state, active) {
    state.active = active
  },
  setTarget(state, target) {
    state.target = target
  },
  setMessage(state, message) {
    state.message = message
  },
  setTab(state, tab) {
    state.tab = tab
  }
}

export const actions = {
  setOpen({commit}, params) {
    commit('setMessage', params.message)
    if(params.open) {
      commit('setTarget', params.target)
      commit('setOpen', params.open)
      setTimeout(() => {
        commit('setActive', params.open)
      }, 300)
      if(typeof params.tab != 'undefined') {
        commit('setTab', params.tab)
      }
    } else {
      commit('setActive', params.open)
      commit('setTab', 'personal')
      setTimeout(() => {
        commit('setOpen', params.open)
        commit('setTarget', params.target)
      }, 300)
    }
  },
  setTab({commit}, params) {
    commit('setTab', params)
  }
}

export const getters = {
  open: state => state.open,
  active: state => state.active,
  target: state => state.target,
  message: state => state.message,
  tab: state => state.tab
}
