/*
 * @Author: jhd
 * @Date: 2019-01-22 14:04:56
 * @Description: tag store file
 */
import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'
interface ITag {
  author: string
  count: number
  description: string
  tagName: string
  time: string
}
interface IState {
  tags: ITag[]
}
const state: IState = {
  tags: []
}
const actions: ActionTree<IState, any> = {
  async getTags ({commit}): Promise<void> {
    const res: Ajax.AjaxResponse = await httpservice.getTagList()
    if (res.code === 200) commit('SET_TAG', res.data)
    else commit('SET_TAG', [])
  }
}
const mutations: MutationTree<IState> = {
  'SET_TAG' (state: IState, payload: any[]) {
    state.tags = payload
  }
}
export default {
  state,
  actions,
  mutations
}
