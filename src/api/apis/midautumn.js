import fetch from '../request'
export const saveActivity = (params) => {
    return fetch.post('/save/mid/autumn/info',params)
};

export const createRedPacket = (params) => {
    return fetch.get('/user/redPacket/create/mid/autumnOrder',{
        params
    })
};

// export const getRedPacket = (params) => {
//     return fetch.post('/get/mid/autumn/red/packet/info',params)
// };

export const getRedPacket = (params) => {
    return fetch.get('/get/mid/autumn/red/packet/info',{
        params
    })
};

export const wxPay = (params) => {
    return fetch.get('/wx/pay/pre',{
        params
    })
};

export const helpHongbao = (params) => {
    return fetch.get('/user/redPacket/create/helpOrder',{
        params
    })
};


export const helpInfo = (params) => {
    return fetch.post('/save/help/info',params)
};

export const autumnInfo = (params) => {
    return fetch.get('/get/mid/autumn/info',{
        params
    })
};
export const helpList = (params) => {
    return fetch.get('/get/mid/autumn/help/list',{
        params
    })
};

export const activityInfo = (params) => {
    return fetch.get('/get/mid/autumn/activity/info',{
        params
    })
};

// 获取中秋活动列表
export const allList = (params) => {
    return fetch.get('/get/mid/autumn/list', {
        params
    })
};

// 分享朋友圈接口
export const shareLog = (params) => {
    return fetch.get('/save/mid/autumn/friendsO', {
        params
    })
};
export const clickGood = (params) => {
    return fetch.get('/save/mid/autumn/click/good', {
        params
    })
};
