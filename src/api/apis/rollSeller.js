import fetch from '../request'
/******
 * ifRfresh//接口是否需要更新token
 * ifLoading//接口是否需要显示loadding
 * url//请求路径
 *
 *  *****/
//url变量

/***************大转盘活动********************/

// 获取中奖名单
export const getJoinLogsByOwnId=(params)=>{
  return fetch.post('/activity/dial/getJoinLogsByOwnId',params)
};
// 获取抽奖次数
export const getDialChangceNum=(params)=>{
  return fetch.post('/activity/dial/getDialChangceNum',params)
};
// 抽奖
export const doLucky=(params)=>{
  return fetch.post('/activity/dial/doLucky',params)
};
// 查看今日产品被查看次数
export const shareNum=(params)=>{
  return fetch.post('/activity/product/shareNum',params)
};
// 领取奖品
export const recievePrize=(params)=>{
  return fetch.post('/activity/recievePrize',params)
};
// 根据code值获取活动模板
export const getByCode=(params)=> {
  return fetch.get('/activity/getByCode', {
    params
  })
};
//根据用户id获取用户信息
export const getInfo=(params)=> {
  return fetch.get('/user/index/info/get', {
    params
  })
};
//获取产品列表
export const companyInfo=(params)=> {
  return fetch.get('/company/index/info', {
    params
  })
};
// 创建和修改活动
export const saveOrUpdate=(params)=>{
  return fetch.post('/activity/dial/saveOrUpdate',params)
};
// 根据活动id获取活动详情
export const getDialInfoById=(params)=> {
  return fetch.get('/activity/getDialInfoById', {
    params
  })
};
//关闭活动
export const closeActivity=(params)=> {
  return fetch.get('/activity/dial/close', {
    params
  })
};