import {
  get,
  post,
  deletes,
  put
} from './axios.js'; //导入axios实例文件中方法
import qs from 'qs';
// let bsae_api = process.env.BASE_API ? './'+process.env.BASE_API :'..' //获取项目api请求地址
// 配置默认的host
// axios.defaults.baseURL = 'redht.81face.top';

//登录与注册
//注册
export const registernow = (paramObj) => {
  return post(`/redbag/login/register`, qs.stringify(paramObj));
}
//获取验证码
export const send = (paramObj) => {
  return post(`/redbag/index/send`, qs.stringify(paramObj));
}
//登录
export const login = (paramObj) => {
  return post(`/redbag/login/login`, qs.stringify(paramObj));
}
//忘记密码1
export const forgetpass = (paramObj) => {
  return post(`/redbag/user/forgetpass`, qs.stringify(paramObj));
}
//忘记密码2
export const forgetpassword = (paramObj) => {
  return post(`/redbag/user/forgetpassword`, qs.stringify(paramObj));
}

//个人中心
export const personal = (paramObj) => {
  return post(`/redbag/user/index`, qs.stringify(paramObj));
}
//平台客服
export const customer = (paramObj) => {
  return post(`/redbag/index/customer`, qs.stringify(paramObj));
}
//余额明细
export const balance = (paramObj) => {
  return post(`/redbag/user/balance`, qs.stringify(paramObj));
}
//提现二维码
export const paycode = (paramObj) => {
  return post(`/redbag/user/paycode`, qs.stringify(paramObj));
}
//提现申请
export const withdrawal = (paramObj) => {
  return post(`/redbag/user/withdrawal`, qs.stringify(paramObj));
}
//推荐码信息
export const agent = (paramObj) => {
  return post(`/redbag/user/agent`, qs.stringify(paramObj));
}
//修改支付密码1
export const setpay = (paramObj)=>{
  return post("/redbag/user/setpay",qs.stringify(paramObj))
}
//修改支付密码2
export const uppay = (paramObj) => {
  return post("/redbag/user/uppay", qs.stringify(paramObj))
}
//修改登录密码
export const uppass = (paramObj) => {
  return post("/redbag/user/uppassword", qs.stringify(paramObj))
}
//轮播1
export const getannoun = (paramObj) => {
  return post("/redbag/index/get_announ", qs.stringify(paramObj))
}
//轮播2
export const announ = (paramObj) => {
  return post("/redbag/index/announ", qs.stringify(paramObj))
}
//红包列表
export const indexlist = (paramObj) => {
  return post("/redbag/game/index", qs.stringify(paramObj))
}
//红包支付
export const payred = (paramObj) => {
  return post("/redbag/game/payred", qs.stringify(paramObj))
}
//红包抽取
export const extractred = (paramObj) => {
  return post("/redbag/game/extractred", qs.stringify(paramObj))
}
//投诉与反馈
export const feedback = (paramObj) => {
  return post("/redbag/user/feedback", qs.stringify(paramObj))
}
//刮刮卡列表
export const scratchlist = (paramObj) => {
  return post("/redbag/scratch/index", qs.stringify(paramObj))
}
//刮刮卡支付
export const payscratch = (paramObj) => {
  return post("/redbag/scratch/payred", qs.stringify(paramObj))
}
//刮刮卡抽取
export const scratchextract = (paramObj) => {
  return post("/redbag/scratch/extractred", qs.stringify(paramObj))
}
//砸金蛋列表
export const egglist = (paramObj) => {
  return post("/redbag/gold/index", qs.stringify(paramObj))
}
//砸金蛋支付
export const payegg = (paramObj) => {
  return post("/redbag/gold/payred", qs.stringify(paramObj))
}
//砸金蛋抽取
export const eggextract = (paramObj) => {
  return post("/redbag/gold/extractred", qs.stringify(paramObj))
}
// get
// export function getCode(pages) {
//     let params = {
//       page: pages
//     }
//     const res6 = getAjax(`${Host}/website/banner/?${formatParam(params)}`);
//     return res6;
//   }
//post
// export function signUpAdvance(phoneNum, code) {
//     let data = {
//       phone: phoneNum,
//       captcha: code,
//     }
//     const res4 = postAjax(`${Host}/website/login`,data);
//     return res4;
//   }
