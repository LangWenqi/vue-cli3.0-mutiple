import fetch from '../request'
import fetch from '../request'
/***************七夕活动********************/
export const getActiveInfo=(params)=> {
	return fetch.get('/activity/index', {
	  params
	})
  };
  export const getActiveQuestion=(params)=> {
	return fetch.get('/activity/qixiQuestion', {
	  params
	})
  };
  export const saveActiveAnswer=(params)=>{
	return fetch.post('/activity/saveQixiAnswer',params)
  };
  export const checkPhone=(params)=> {
	return fetch.get('/user/check/ifBindMobile', {
	  params
	})
  };
  export const sendMsg=(params)=> {
	return fetch.get('/sms/send', {
	  params
	})
  };
  export const checkCode=(params)=> {
	return fetch.get('/sms/check', {
	  params
	})
  };
  export const activityClick=(params)=> {
	return fetch.get('/activity/activityClick', {
	  params
	})
  };