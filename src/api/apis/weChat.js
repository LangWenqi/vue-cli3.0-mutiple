//获取微信sdk签名
import fetch from '../request'

export const getWeixinTicket = (params) => {
  return fetch.get('/activity/kill/startTime', {
    params
  })
};
