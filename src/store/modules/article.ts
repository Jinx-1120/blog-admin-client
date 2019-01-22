/*
 * @Author: jhd
 * @Date: 2019-01-21 18:05:40
 * @Description: article store file
 */

import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'

interface IArt {
  author: string
  content: string
  coverImg: string
  createTime: string
  description: string
  fabulous: number
  status: number
  tags: string[]
  title: string
  updateTime: string
  viewCount: number
}
interface IState {
  arts: IArt[]
  more: boolean
  pageTotal: number
  totalNum: number
  page: number
}

const state: IState = {
  arts: [],
  more: false,
  pageTotal: 1,
  totalNum: 1,
  page: 1
}

const mutations: MutationTree<IState> = {
  'GET_ARTS' (state: IState, data: any): void {
    state.arts = data.data
    state.more = data.more
    state.pageTotal = data.pageTotal
    state.page = data.page
    state.totalNum = data.totalNum
  }
}


const actions: ActionTree<IState, any> = {
  async getArts ({ commit }, payload): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.getArts(payload)
    if (res.code === 200)  commit('GET_ARTS', res.data)
    else commit('GET_ARTS', {})
    return res
  },
  async searchArts ({commit}, payload ): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.searchArts(payload)
    if (res.code === 200) commit('GET_ARTS', res.data)
    else commit('GET_ARTS', {})
    return res
  }
}
export default {
  state,
  actions,
  mutations
}
