// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index' //状态管理
import QRCode from 'qrcodejs2'//生成二维码
import scroll from 'vue-seamless-scroll'
// import canvas from './libs/js/canvas'
import $ from 'jquery'
Vue.use(scroll)
// Vue.use(canvas)
Vue.config.productionTip = false

//全局引入url
import staturl from './api/urls.js';
global.staturl = staturl;
Vue.prototype.getUrl = function () {
  let pathname = window.location.toString();
  return pathname
  console.log(pathname)
}
window.onresize = setHtmlFontSize;
import {
  Toast
} from 'vant';
function setHtmlFontSize() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  QRCode,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (store.state.usermessage == '') { //根据store里的值来确定是否已经登录存在token
      next({
        path: '/Login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next();
    }
  } else {
    next();
  }
});
// let system = {};
// let p = navigator.platform;
// let u = navigator.userAgent;
// system.win = p.indexOf("Win") == 0;
// system.mac = p.indexOf("Mac") == 0;
// system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
// if (system.win || system.mac || system.xll) { //如果是PC转
//   if (u.indexOf('Windows Phone') > -1) { //win手机端
//   } else {
//     Toast("请使用手机端登录")
//     router.push({
//       path: '/Mainten',
//     })
//     history.pushState(null, null, location.href)
//   }
// }
