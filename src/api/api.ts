/*
 * @Author: jhd
 * @Date: 2019-01-14 17:02:49
 * @Description: user ajax config file
 */
import ajax from './axios'

// 登陆
export function login ( params: any): Promise<Ajax.AjaxResponse> {
  return ajax.post('/login', params).then(res => res.data).catch(e => console.error(e))
}
// 退出登陆
export function logout (): Promise<Ajax.AjaxResponse> {
  return ajax.post('/logout').then(res => res.data).catch(e => console.error(e))
}
// info
export function getInfo (): Promise<Ajax.AjaxResponse> {
  return ajax.get('/userInfo').then(res => res.data).catch(e => console.error(e))
}
// artlist
export function getArts (params: any): Promise<Ajax.AjaxResponse> {
  return ajax.get('articleList', { params }).then(res => res.data)
}
// art
export function getArt (params: any) {
  return ajax.get(`article/${params.id}`).then(res => res.data)
}
// search
export function searchArts (params: any): Promise<Ajax.AjaxResponse> {
  return ajax.get('/search', { params }).then(res => res.data)
}
// tags
export function getTagList () {
  return ajax.get('/tagList').then(res => res.data)
}
// addTag
export function addTag (params: any) {
  return ajax.post('/addTag', params).then( res => res.data)
}
// removeTag
export function removeTag (params: any) {
  return ajax.delete(`/delTag/${params}`).then( res => res.data)
}
// 获取评价
export function getComment (params: any) {
  return ajax.get('/comments', { params }).then(res => res.data)
}
// records
export function getRecords () {
  return ajax.get('/getrecords').then(res => res.data)
}
// qiniu token
export function getQnToken (random: any) {
  return ajax.get(`/getQN?${random}`).then( res => res.data)
}
// add article
export function addArt (params: any): Promise<Ajax.AjaxResponse> {
  return ajax.post('/addArticle', params).then(res => res.data)
}
// delArticle
export function delArt (artId: string): Promise<Ajax.AjaxResponse> {
  return ajax.delete(`/delArticle/${artId}`).then(res => res.data)
}
