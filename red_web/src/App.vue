<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* //margin-top: 60px; */
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  background-color: #fff;
}
body{
  height: 100%;
}

.van-password-input {
    display: block!important;
    height: 1rem!important;
}
 .van-password-input .van-password-input__security {
    display: block!important;
    height: 1rem!important;
    margin-top: 0.3rem!important;
}
 .enterpass .van-password-input__security li {
    width: 1rem!important;
    height: 1rem!important;
    margin: 0 0.2rem!important;
    background-color: #ffe6e7!important;
    float: left!important;
}
.van-hairline--surround::after {
  border: 0!important;
}
.van-key {
  height: 1.2rem!important;
  line-height: 1.2rem!important;
}
.van-number-keyboard__title {
   height: 0.8rem!important;
}
.van-number-keyboard__close {
   line-height: 0.8rem!important;
}

/* 错误提示窗 */
.van-toast {
  top: 85%!important;
  z-index: 99999999999!important;
  font-size: 0.3rem!important;
}
.van-toast div{
  padding: 0.1rem 0.2rem!important;
}
.van-pull-refresh {
    width: 100%;
    height: 100%;
}
.van-pull-refresh__track {
    width: 100%;
    height: 100%;
    font-size: 0.4rem!important;
}
.van-pull-refresh__text {
    font-size: 0.4rem!important;
}
.van-pull-refresh__loading {
    font-size: 0.4rem!important;
}
</style>
