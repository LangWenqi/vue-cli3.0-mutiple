//获取location.search参数
// 登录相关变量
import {TokenKeys} from './variable'
import {getQsParse} from './util'
// 获取活动activity_code
export const getSessionToken=()=>{
  return sessionStorage.getItem(TokenKeys.ACCESS_TOKEN)&&sessionStorage.getItem(TokenKeys.SESSION_TOKEN)&&(new Date().getTime()-sessionStorage.getItem(TokenKeys.SESSION_TOKEN)<=TokenKeys.SESSION_TIME);
};
export const setTokenCode=()=>{
	sessionStorage.setItem(TokenKeys.TOKEN_CODE,getQsParse()[TokenKeys.TOKEN_CODE])
}
