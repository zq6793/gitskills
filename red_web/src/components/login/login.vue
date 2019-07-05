<template>
    <div class="login">
        <!-- <div class="login_head">
            <i class="back"></i>
            <h2>您好,</h2>
            <p>欢迎来到 <span>幸运红包</span></p>
        </div> -->
        <v-header></v-header>
        <div class="login_content">
            <p>登录</p>
            <input type="text" v-model="userphone" placeholder="请输入手机号码">
            <p>密码</p>
            <input type="password" v-model="userpass" placeholder="请输入登录密码">
            <p class="forgot_password" @click="forgot_password">忘记密码 ?<i></i></p>
        </div>
        <button class="login_btn" @click="login" :style="{'background-image': 'url(./static/img/loginbtn.png)'}">登录</button>
        <button class="paybtn" @click='paybtn'>立即下载APP</button>
        <!-- <button class="register_now" @click="registerNow">立即注册</button> -->
    </div>
</template>
<script>
import header from '@/components/common/header'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard,Toast} from 'vant';
import { login } from "../../api/api";
export default {
    components: {
        "v-header": header,
       [Toast.name]: Toast
    },
    name:'Login',
    data(){
       return {
           userphone:'',
           userpass:'',
           code:''
       }
    },
    computed: {
        ...mapState(['userlogin'])
    },
    mounted() {
        this.userphone=this.userlogin.username;
        this.userpass=this.userlogin.password;
    },
    methods: {
        ...mapMutations(["Token","user","Userlogin"]),
        registerNow(){
            this.$router.push({ path: "/registernow",query:{code:this.code}});
        },
        forgot_password(){
            this.$router.push({ path: "/forgotpassword" });
        },
        login(){
            if(!(/^1[34578]\d{9}$/.test(this.userphone))){ 
                Toast("手机号码有误，请重填");  
                return false; 
            }else {
                let paramObj={username:this.userphone,password:this.userpass}
                login(paramObj)
                .then(data => {
                    //console.log(data);
                    if (data.code == 200) {
                        let userData = data.data;
                        let todata=data.data.token;
                        let userlogin={username:this.userphone,password:this.userpass}
                        this.user(userData);
                        this.Token(todata);
                        this.Userlogin(userlogin);
                        this.$router.push({
                            path: "/index",
                            name: "index"
                            });
                    }else {
                        Toast(data.data.msg);  
                    }
                })
                .catch(error => {
                    
                });
            }     
        },
        paybtn(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid){
                window.location.href="http://game.wechat5.top/pig.apk"
            }else if(isiOS){
                window.location.href="https://fir.im/pig3"
            }
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
    background: url(/static/img/back1.png) no-repeat;
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
.login_content {
    padding:  0 0.6rem;
}
.login_content p {
    font-size: 0.34rem;
    color: #000000;
    margin-left: 0.3rem;
    margin-top: 0.6rem;
}
.login_content input{
    display: block;
    width: 100%;
    height: 1rem;
    font-size: 0.3rem;
    color: #000000;
    padding-left: 0.3rem;
    border: 0;
    border-bottom: 1px solid #d6d6d6;
    outline: none;
    background-color: #fff!important;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.login_content .forgot_password {
    text-align: right;
    color: #162a66;
}
.login button { 
    display: block;
    margin: 0 auto;
    width: 6.32rem;
    height: 0.9rem;
    font-size: 0.36rem;
    border: 0;
    outline: none;
}
.login .login_btn {
    background:  center no-repeat;
    background-size: 6.32rem 0.9rem;
    color: #fff;
    margin-top: 2rem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ;
}
.login .paybtn{
    display: block;
    width: 3.07rem;
    height: 0.82rem;
    border: 0;
    outline: none;
    margin: 0.6rem auto;
    font-size: 0.36rem;
    color: #162a66;
    background-color: #fff;
}
.login .register_now {
    background-color: #fff;
    color: #0e3851;
}
</style>
