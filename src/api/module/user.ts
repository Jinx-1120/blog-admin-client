/*
 * @Author: jhd
 * @Date: 2019-01-14 17:02:49
 * @Description: user ajax config file
 */
import ajax from '../axios'

// 登陆
export function login ( params: any): Promise<Ajax.AjaxResponse> {
  return ajax.post('/login', params).then(res => res.data).catch(e => console.error(e))
}
// 退出登陆
export function logout (): Promise<Ajax.AjaxResponse> {
  return ajax.post('/logout').then(res => res.data).catch(e => console.error(e))
}
