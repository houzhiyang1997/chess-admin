import { createStore } from 'vuex'
export default createStore({
  state: {
    adminInfo: {}
  },
  getters: {},
  mutations: {
    // 用户信息控制
    setAdminInfo(state, val) {
      state.adminInfo = val
      state.adminInfo.password = ''
    }
  },
  actions: {},
  modules: {}
})
