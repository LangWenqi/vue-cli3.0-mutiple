import fetch from '../request'

// 创建活动
export const saveActivity = (params) => {
  return fetch.post('/gb/save', params)
};

// 获取活动详情
export const getActivityDetail = (params) => {
  return fetch.get('/gb/getDetailById', {
    params
  })
};

// 获取单个活动详情
export const getGoodsDetail = (params) => {
  return fetch.get('/gb/getGoodsDetailById', {
    params
  })
};

// 获取我的拼单
export const getMyOrder = (params) => {
  return fetch.get('/gb/getSelfGBOrder', {
    params
  })
};

// 获取我的拼单详情
export const getMyOrderDetail = (params) => {
  return fetch.get('/gb/getGBOrderDetail', {
    params
  })
};

// 单独下单
export const payAlone = (params) => {
  return fetch.post('/gb/pay/alone', params)
};

// 开团
export const makeGroup = (params) => {
  return fetch.post('/gb/pay/group/self', params)
};

// 拼团下单
export const payGroup = (params) => {
  return fetch.post('/gb/pay/group', params)
};

// 滚动数据
export const getRollData = (params) => {
  return fetch.get('/gb/getRoll', {
    params
  })
};
