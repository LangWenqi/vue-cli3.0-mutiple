import axios from './config'
import {getType, getQsParse} from '@/common/js/util'
import {getApiSign} from '@/common/js/apiSign'
import {getSessionToken} from '@/common/js/auth'
import {TokenKeys} from '@/common/js/variable'
import {getRefreshToken} from './apis/auth'
import Vue from 'vue'
import {Toast} from 'cube-ui'

Vue.use(Toast)
let loadingToast=null;
// 请求拦截
axios.interceptors.request.use(function (config) {

  config.params = config.params ? config.params : {}
  if (config.loading) {
    loadingToast = Toast.$create({
      txt: '加载中...',
      time: 0,
      type: 'loading',
      zIndex: 99
    })
    loadingToast.show()
  }
  //判断token是否过期
  if (!getSessionToken() && !config.ifRfresh) {
    console.log('获取token')
    let tokenCode = getQsParse()[TokenKeys.TOKEN_CODE] ? getQsParse()[TokenKeys.TOKEN_CODE] : sessionStorage.getItem(TokenKeys.TOKEN_CODE)
    return getRefreshToken({userCode: tokenCode}).then(res => {
      sessionStorage.setItem(TokenKeys.SESSION_TOKEN, new Date().getTime())
      sessionStorage.setItem(TokenKeys.ACCESS_TOKEN, res.data ? res.data : '')
      return continueDone()
    }).catch(res => {
      console.log(res)
      return continueDone()
    })
  } else {
    return continueDone()
  }

  function continueDone () {
    let access_token = sessionStorage.getItem(TokenKeys.ACCESS_TOKEN)
    if (config.method === 'get') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      let api_sign = getApiSign(config.params)
      config.params = Object.assign(config.params, {api_sign})
    } else if (config.method === 'post') {
      let api_sign = getApiSign(config.data)
      config.data = Object.assign(config.data, {api_sign})
    }
    config.headers['access_token'] = access_token
    return config
  }
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(function (response) {
  response = response.data
  if (getType(response) == 'string') {
    response = JSON.parse(response)
  }
  if (response.code != 10000) {
    if ([50004, 50005, 50006, 50007, 40001, 30204, 30500].indexOf(response.code) <= -1) {
      if (response.msg) {
        let errorToast = Toast.$create({
          txt: response.msg,
          time: 1000,
          type: 'error',
          zIndex: 99
        })
        errorToast.show()
      }
    }
  }
  if (loadingToast) {
    setTimeout(() => {
      loadingToast.hide();
    }, 1000)
  }
  return response

}, function (error) {
  if(loadingToast){
    setTimeout(() => {
      loadingToast.hide();
    }, 1000)
  }
  return Promise.reject(error)
})
export default axios
