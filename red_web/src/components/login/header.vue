<template>
    <div class="login_head" :style="{'background-image': 'url(./static/img/wjmm-bg.png)'}">
        <i class="back" @click="back" :style="{'background-image': 'url(./static/img/back1.png)'}"></i>
        <h2>您好,</h2>
        <p>欢迎来到 <span>小猪红包</span></p>
    </div>
</template>
<script>
export default {
    name:'Login',
    data(){
       return {
       }
    },
    methods: {
        back(){
            this.$router.go(-1);//返回上一层
        }
    },
}
</script>
<style scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.login_head {
    width: 100%;
    height: 4.36rem;
    background: center no-repeat;
    background-size: 100% 5.12rem;
    padding-top: 0.76rem;
    position: relative;
}
.login_head i{
    display: inline-block;
    width: 0.16rem;
    height: 0.28rem;
    background: no-repeat;
    background-size: 0.16rem 0.28rem;
    position: absolute;
    top: 0.76rem;
    left: 0.62rem;
}
.login_head h2 {
    font-size: 0.52rem;
    font-weight: normal;
    color: #fff;
    margin: 0.8rem 0 0.3rem;
    padding:  0 0.56rem;
}
.login_head p{
    font-size: 0.36rem;
    color: #fff;
    padding:  0 0.56rem;
}
.login_head p span {
    color: #ffd012;
}

</style>
