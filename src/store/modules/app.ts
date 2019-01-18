/*
 * @Author: jhd
 * @Date: 2019-01-15 11:31:50
 * @Description: app store file
 */
import Vue from 'vue'
import Cookies from 'js-cookie'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'

interface ISidebar {
  opend: boolean
  withoutAnimation: boolean
}
interface IState {
  sidebar: ISidebar
  device: string
}
const state: IState = {
  sidebar: {
    opend: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop'
}
const mutations: MutationTree<IState> = {
  'TOGGLE_SIDEBAR' (state: IState): void {
    if (state.sidebar.opend) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opend = !state.sidebar.opend
    state.sidebar.withoutAnimation = false
  },
  'CLOSE_SIDEBAR' (state: IState, withoutAnimation: boolean): void {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opend = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  'TOGGLE_DEVICE' (state: IState, device: string): void {
    state.device = device
  }
}
const actions: ActionTree<IState, any> = {
  toggleSiderBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
