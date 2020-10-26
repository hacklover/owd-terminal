export default {
  namespaced: true,

  state: {
    mode: ''
  },

  getters: {
    instanceMode(state) {
      return state.mode
    }
  }
}