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
  art: object
  qntoken: string
}

const state: IState = {
  arts: [],
  more: false,
  pageTotal: 1,
  totalNum: 1,
  page: 1,
  art: {},
  qntoken: ''
}

const mutations: MutationTree<IState> = {
  'GET_ARTS' (state: IState, data: any): void {
    state.arts = data.data
    state.more = data.more
    state.pageTotal = data.pageTotal
    state.page = data.page
    state.totalNum = data.totalNum
  },
  'GET_ART' (state: IState, data: any): void {
    state.art = data
  },
  'SET_QNTOKEN' (state: IState, token: string): void {
    state.qntoken = token
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
  },
  async getArt ({commit}, payload): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.getArt(payload)
    if (res.code === 200) commit('GET_ART', res.data)
    else commit('GET_ART', {})
    return res
  },
  async getQnToken ({commit}): Promise<Ajax.AjaxResponse> {
    const random: number = Math.random() * 10000
    const res: Ajax.AjaxResponse = await httpservice.getQnToken(random)
    if (res.code === 200) commit('SET_QNTOKEN', res.data.token)
    else commit('SET_QNTOKEN', '')
    return res
  },
  async addArt ({}, payload): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.addArt(payload)
    return res
  },
  async delArt ({}, payload): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.delArt(payload)
    return res
  }
}
export default {
  state,
  actions,
  mutations
}
