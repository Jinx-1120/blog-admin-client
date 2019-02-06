// import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'
// Vue.use(Vuex)

interface IState {
  login: boolean
  userInfo: object,
  token: string
}

const state: IState = {
  login: false,
  userInfo: {},
  token: ''
}
const mutations: MutationTree<IState> = {
  'TOGGLE_LOGOUT' (state: IState, flag: boolean): void {
    state.login = flag
  },
  'SET_TOKEN' (state: IState, token: string): void {
    state.token = token
    window.localStorage.setItem('TOKEN', token)
  },
  'SET_USERINFO' (state: IState, info: any): void {
    state.userInfo = info
  }
}
const actions: ActionTree<IState, any> = {
  async login ({ commit }, user): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.login({ ...user })
    if (res.code === 200) {
      commit('TOGGLE_LOGOUT', true)
      commit('SET_TOKEN', res.data.token)
      const info: Ajax.AjaxResponse = await httpservice.getInfo()
      if (info.code === 200) commit('SET_USERINFO', info.data)
      else commit('SET_USERINFO', {})
    } else {
      commit('TOGGLE_LOGOUT', false)
    }
    return res
  },
  async logout ({ commit }): Promise<Ajax.AjaxResponse> {
    const res = await httpservice.logout()
    commit('TOGGLE_LOGOUT', false)
    return res
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
