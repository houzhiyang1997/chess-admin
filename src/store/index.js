import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [
    createPersistedState({
      key: 'cloudadmin',
      // reducer 可以选择存储哪些state
      reducer: state => {
        return {
          adminInfo: state.adminInfo
        }
      }
    })
  ],
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
