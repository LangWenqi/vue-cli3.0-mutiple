import {TokenKeys} from './variable'
import {sort} from './util'
import md5 from './md5'
const data = {};
export const getApiSign = (params = {}, tokens ={}) => {
  params = Object.assign({}, params, tokens, data);
  const queryString = Object.keys(params).sort(sort).map(i => `${i}=${params[i]}`).join('&');
  const signStr = `${TokenKeys.SALT}${queryString}${TokenKeys.SALT}`;
  return md5(signStr);
};


