/**
 * 是否已经登录或者 token 超时
 *
 * @export
 * @returns { boolean }
 */
export function loginIn (): boolean {
  if (!window.localStorage.getItem('Admin-Token')) return false
  const lifeTime = JSON.parse(window.localStorage.getItem('Admin-Token') || '').lifeTime * 1000
  const nowTime = (new Date()).getTime()
  if (nowTime > lifeTime) return false
  return true
}
