import fetch from '../request'
/******
 * ifRfresh//接口是否需要更新token
 * ifLoading//接口是否需要显示loadding
 * url//请求路径
 *
 *  *****/

//获取refresh_token
export const getRefreshToken=(params)=>{
  return fetch.get(`/user/h5/token/get`,{
	params:params,
	ifRfresh:true
  })
};
//获取用户信息
export const getUserInfoById=(params)=> {
  return fetch.get(`/user/info/get`, {
    params
  })
};
//获取完整用户信息
export const getUserInfoByCode=(params)=> {
	return fetch.get('/user/index/info/get', {
	  params
	})
};
//获取ossToken
export const getOssToken=(params)=> {
  return fetch.get('/oss/token',{
    params
  })
};
export const getByCode=(params)=> {
  return fetch.get('/activity/getByCode', {
    params
  })
};
