import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'
Vue.use(Vuex)

interface IState {
  login: boolean
  userInfo: object
}

const state: IState = {
  login: false,
  userInfo: {}
}
const mutations: MutationTree<IState> = {
  'TOGGLE_LOGOUT' (state: IState, flag: boolean): void {
    state.login = flag
  }
}
const actions: ActionTree<IState, any> = {
  async login ({ commit }, user): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.login({ ...user })
    commit('TOGGLE_LOGOUT', true)
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
