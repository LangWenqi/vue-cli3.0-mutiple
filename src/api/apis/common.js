import fetch from '../request'
// 根据code值获取活动模板
export const getActivityTemByCode=(params)=> {
	return fetch.get('/activity/getByCode', {
	  params
	})
};
// 创建和修改活动
export const saveActivity=(params)=>{
	return fetch.post('/activity/dial/saveOrUpdate',params)
};
// 根据活动id获取活动详情
export const getActivityDetailById=(params)=> {
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
//获取产品列表
export const getProductList=(params)=> {
	return fetch.get('/company/product/list', {
	  params
	})
};
