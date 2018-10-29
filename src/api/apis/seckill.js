import fetch from '../request'

//创建活动
export const createSeckill = (params) => {
    return fetch.post('/activity/kill/create', params)
};
//活动详情
export const detailSeckill = (params) => {
    return fetch.get('/activity/kill/startTime', {
        params
    })
};
//产品列表
export const productList = (params) => {
    return fetch.get('/activity/kill/product', {
        params
    })
};
export const saveOrder = (params) => {
    return fetch.post('/activity/kill/save/order',params)
};

export const wxPay = (params) => {
    return fetch.get('/activity/kill/wx/pay',{
        params
    })
};
//名单购买
export const winList = (params) => {
    return fetch.get('/get/order/pay/success', {
        params
    })
};
