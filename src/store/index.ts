/*
 * @Author: jhd
 * @Date: 2019-01-14 16:30:04
 * @Description: index store file
 */
import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import modules from './modules'
import httpservice from '../api'

Vue.use(Vuex)
// interface IState {}

// const state: IState = {
//   login: false,
//   userInfo: {}
// }
// const actions: ActionTree<IState, any> = {}

export default new Vuex.Store({
  modules
})
