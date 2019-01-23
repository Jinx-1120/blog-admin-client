/*
 * @Author: jhd
 * @Date: 2019-01-22 16:44:28
 * @Description: filter file content
 */

/**
 * 时间转化
 *
 * @export
 * @param {Date} time
 * @param {string} format
 * @returns {string}
 */
export function format (times: string, format: string) {
  let res: string = ''
  const time = Date.parse(times)
  if (time) {
    const between: number = (Date.now() - Number(time)) / 1000
    if (between < 3600 && ((between / 60) < 1)) {
      return '刚刚'
    } else if (between < 3600) {
      return pluralize((between / 60), '分钟')
    } else if (between < 86400) {
      return pluralize((between / 3600), '小时')
    }
  } else {
    return '-'
  }
  const date = new Date(time)
  const o: any = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    res = format.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      res = res.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  }
  return res
}
function pluralize (time: any, label: any) {
  return `${Math.floor(time)}${label}以前`
}

