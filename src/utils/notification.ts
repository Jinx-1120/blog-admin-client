/*
 * @Author: jhd
 * @Date: 2019-01-23 14:43:38
 * @Description: notification file content
 */
import { Notification } from 'element-ui'

export function error (message: string): void {
  Notification.error({
    title: '错误',
    message
  })
}

export function success (message: string): void {
  Notification.success({
    title: '成功',
    duration: 2000,
    message
  })
}
