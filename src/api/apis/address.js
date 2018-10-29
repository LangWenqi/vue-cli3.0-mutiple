import fetch from '../request'
//收货地址列表
export const getAddressList=(params)=>{
	return fetch.get(`/get/user/address`,{
		loading:true,
	  params
	})
};
//新增地址
export const addAddress=(params)=>{
	return fetch.post(`/save/user/address`,params)
};
//编辑地址
export const editAddress=(params)=>{
	return fetch.post(`/update/user/address`,params)
};
//编辑地址获取信息
export const getAddressDetail=(params)=>{
	return fetch.get(`/get/user/address/info`,{
	  params
	})
};
//列表设置默认地址
export const setAddressDefault=(params)=>{
	return fetch.get(`/set/user/default/address`,{
	  params
	})
};
//删除地址
export const delAddress=(params)=>{
	return fetch.get(`/delete/user/address`,{
	  params
	})
};