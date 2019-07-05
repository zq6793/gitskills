import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {
  /**
   * 次数定义数据
   */
  //登录状态
  status: '',
  //登录信息
  userData:{},
  //登录签名
  token: "",
  //忘记密码数据
  forgotData:{},
  //登录信息
  userlogin:{}

}

const actions = {
  /**
   * 跟mutations作用一致，区别是异步
   */
  addAction({ commit }) {
    setTimeout(() => {
      commit('add')
    }, 5000)
    console.log('我是异步执行')
  },
  reduceAction({ commit }) {
    setTimeout(() => {
      commit('reduce')
    }, 5000)
  }
}
const mutations = {
  /**
   *
   * 定义操作数据需要的方法
   */
  Login(state,status) {
    state.status = status
  },
  user(state,userData) {
    state.userData = userData
  },
  Token(state, token) {
    state.token = token
  },
  Forgot(state, forgotData) {
    state.forgotData = forgotData
  },
  Userlogin(state, userlogin) {
    state.userlogin = userlogin
  },
  
}

const getters = {
  /**
   *
   *有些情况下，state里的数据较多，需要进行筛选处理再输出
   */
  count(state) {
    return state.count + 100
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
})
