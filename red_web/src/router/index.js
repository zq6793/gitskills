import Vue from 'vue'
import Router from 'vue-router'

//公共
import header from '@/components/common/header'
//底部导航
import TabBar from '@/components/common/foottabbar'
//登录
import login from '@/components/login/login'
//忘记密码
//手机验证
import registernow from '@/components/login/registernow'
//确认密码
import confirmpassword from '@/components/login/confirmpassword'
//立即注册
import forgotpassword from '@/components/login/forgotpassword'

//首页红包金额
import index from '@/components/envelope/index'
//选取随机红包
import envelope from '@/components/envelope/envelope'
//随机红包金额
import bonusamount from '@/components/envelope/bonusamount'

//个人中心
import personal from '@/components/personal/personal'
//余额明细
import balance from '@/components/personal/balance'
//佣金记录
import promotioncode from '@/components/personal/promotioncode'
//修改登录密码
import changepassword from '@/components/personal/changepassword'
//修改支付密码
import modifypayment from '@/components/personal/modifypayment'
//新密码
import newpassword from '@/components/personal/newpassword'
//投诉与意见反馈
import complaints from '@/components/personal/complaints'
//投诉与意见反馈内容
import complaintcontent from '@/components/personal/complaintcontent'
//投诉与意见反馈内容
import compla from '@/components/personal/compla'
import Mainten from '@/components/login/Maintenance.vue'
//刮刮乐
import scratchlist from '@/components/scratch/scratchlist.vue'
//刮刮乐中奖
import scratchdetails from '@/components/scratch/scratchdetails.vue'
//砸金蛋
import goldeneggslist from '@/components/goldeneggs/goldeneggslist.vue'
//砸金蛋中奖
import goldeneggsldetails from '@/components/goldeneggs/goldeneggsldetails.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login 
    },
    {
      path: '/registernow',
      name: 'registernow',
      component: registernow
    },
    {
      path: '/confirmpassword',
      name: 'confirmpassword',
      component: confirmpassword
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: forgotpassword
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/envelope',
      name: 'envelope',
      component: envelope
    },
    {
      path: '/bonusamount',
      name: 'bonusamount',
      component: bonusamount
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/balance',
      name: 'balance',
      component: balance
    },
    {
      path: '/promotioncode',
      name: 'promotioncode',
      component: promotioncode
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: changepassword
    },
    {
      path: '/modifypayment',
      name: 'modifypayment',
      component: modifypayment,
    },
    {
      path: '/newpassword',
      name: 'newpassword',
      component: newpassword
    },
    {
      path: '/complaints',
      name: 'complaints',
      component: complaints
    },
    {
      path: '/complaintcontent',
      name: 'complaintcontent',
      component: complaintcontent
    },
    {
      path: '/compla',
      name: 'compla',
      component: compla
    },
    {
      path: '/Mainten',
      name: 'Mainten',
      component: Mainten,
    },
    {
      path: '/scratchlist',
      name: 'scratchlist',
      component: scratchlist,
    },
    {
      path: '/scratchdetails',
      name: 'scratchdetails',
      component: scratchdetails,
    },
    {
      path: '/goldeneggslist',
      name: 'goldeneggslist',
      component: goldeneggslist,
    },
    {
      path: '/goldeneggsldetails',
      name: 'goldeneggsldetails',
      component: goldeneggsldetails,
    },
  ]
})
