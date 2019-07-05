import axios from 'axios';
import qs from 'qs';
import { Toast } from "vant";
import router from '../router'
// 创建axios实例
// 配置默认的host,假如你的API host是：http://api.htmlx.club
// axios.defaults.baseURL = 'http://ht.cqgcjd.net';
axios.defaults.baseURL = 'http://redht.81face.top';
const service = axios.create({
  timeout: 30000 // 请求超时时间                                   
})
// 添加request拦截器 请求
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
// 添加respone拦截器 响应
service.interceptors.response.use(
  response => {
    //console.log(response)
    let res = {};
    res.status = response.status
    res.data = response.data;
    if (response.data.code == 300) {
      window.location.href = '/'
      Toast(response.data.msg)
      return res;
    } else if (response.data.code == 404) {
      Toast(response.data.msg)
      return res;
    }else if (response.data.code == 400) {
      Toast(response.data.msg)
      return res;
    }else {
      return response.data;
    }
  },
  error => {
    Toast('系统繁忙，请稍后再试')
    if (error.response && error.response.status == 404) {
      //  router.push('/blank.vue')
    }
    return Promise.reject(error.response)
  }
)
export function get(url, params = {}) {
  params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: 'get',
    headers: {},
    params
  })
}
//封装post请求
export function post(url, data = {}) {
  //默认配置 
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject)
}
//封装put方法 (resfulAPI常用)
export function put(url, data = {}) {
  return service({
    url: url,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify(data)
  })
}
//删除方法(resfulAPI常用)
export function deletes(url) {
  return service({
    url: url,
    method: 'delete',
    headers: {}
  })
}
//不要忘记export
export {
  service
}
