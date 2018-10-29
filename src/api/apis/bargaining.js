import fetch from '../request'
//获取砍价列表
export const getBargainList=(params)=>{
	return fetch.post(`/activity/bargain/productlist`,params)
};
//我的砍价列表
export const getSelfBargainList=(params)=>{
	return fetch.post(`/activity/bargain/myBargainList`,params)
};
//获取帮砍列表
export const getHelpBargainList=(params)=>{
	return fetch.post(`/activity/bargain/helperList`,params)
};
//砍价
export const wantBargain=(params)=>{
	return fetch.post(`/activity/bargain/join`,params)
};
//砍价详情
export const bargainDetail=(params)=>{
	return fetch.post(`/activity/bargain/detailInfo`,params)
};
//帮砍一刀
export const doBargain=(params)=>{
	return fetch.post(`/activity/bargain/do`,params)
};
//是否帮砍过
export const ifBargained=(params)=>{
  return fetch.post(`/activity/bargain/checkHelp`,params)
};
//生成订单
export const createOrder=(params)=>{
  return fetch.post(`/activity/bargain/saveOrder`,params)
};
//获取微信签名
export const getWxSign=(params)=>{
  return fetch.get(`/activity/bargain/wx/pay`,{
    params
  })
};

