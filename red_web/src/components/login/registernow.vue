<template>
    <div class="login_register">
        <!-- <div class="login_head">
            <i class="back"></i>
            <h2>您好,</h2>
            <p>欢迎来到 <span>幸运红包</span></p>
        </div> -->
        <v-header></v-header>
        <div class="login_content">
            <p>昵称</p>
            <input type="text" v-model="username" placeholder="创建我的昵称(五个字以内)">
            <p>手机号</p>
            <input type="text" v-model="phone" placeholder="请输入手机号码">
            <div class="register">
                <p>验证码</p>
                <input type="text" v-model="code" placeholder="请输入验证码">   
                <button  @click="sendcode">{{countdown}}</button>
            </div>            
            <p>登录密码</p>
            <input type="text" v-model="password" placeholder="请设置登录密码">
            <p>推荐人码</p>
            <input type="text" v-model="partner" readonly>
        </div>
        <button class="login_btn" @click="confirm" :style="{'background-image': 'url(./static/img/loginbtn.png)'}">注册</button>
        <button class="register_now" @click="login">登录</button>
    </div>
</template>
<script>
import header from '@/components/common/header'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { registernow } from "../../api/api";
import { send } from "../../api/api";
export default {
    components: {
        "v-header": header,
    },
    name:'registernow',
    data(){
        return {
            username:'',
            phone:'',
            code:'',
            password:'',
            countdown:"发送验证码",
            totaltime:60,
            canClick: true, //添加canClick
            Interval:null,
            partner:"",
            type:''
        }
    },
    created() {
         this.geturl()
    },
    methods: {
        geturl(){
            let code=this.getQueryString()
            console.log(code)
            this.partner=code.code
            this.type=code.type
        },
        getQueryString(name) { 
            let urll=window.location.href
            let url=urll.split("?")[1]
            var strs = url.split("&");
            var theRequest={};
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
            return theRequest;
        },
        //获取验证码
        sendcode(){
            if(this.canClick){
                this.canClick = false
                this.Interval = setInterval(() => {
                    this.totaltime--;
                    this.countdown = '('+this.totaltime + 's)'
                    // console.log(this.totaltime )
                    if(this.totaltime <= 0){
                        clearInterval(this.Interval)
                        this.countdown = '重新发送验证码'
                        this.totaltime = 60
                        this.canClick = true
                        // console.log(this.canClick )
                        // console.log(this.totaltime )
                        // console.log(this.countdown )
                    }
                },1000)
                if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
                    alert("手机号码有误，请重填");  
                    return false; 
                }else {
                    let paramObj={phone:this.phone}
                    send(paramObj).then(data=>{
                        if(data.code==200){
                            
                        }
                    })
                    .catch(error=>{

                    })
                }
            }
        },
        //注册
        confirm(){
            if(this.username==''){ 
                alert("请输入昵称");  
                return false; 
            }else if(this.username.length>5){ 
                alert("输入的昵称不能超过五个字");  
                return false; 
            }else if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
                alert("手机号码有误，请重填");  
                return false; 
            }else {
                let paramObj={nick:this.username,mobile:this.phone,code:this.code,
                password:this.password,partner:this.partner,type:this.type}
                registernow(paramObj)
                .then(data => {
                    // console.log(data);
                    if (data.code == 200) {
                        this.$router.push({path: "/",});
                    }
                })
                .catch(error => {
                    
                });
            }
        },
        //登录
        login(){
            this.$router.push({ path: "/" });
        }

    }  
}
</script>
<style scoped>
.login_register {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.login_content {
    padding:  0 0.6rem;
}
.login_content p {
    font-size: 0.3rem;
    color: #000000;
    margin-left: 0.3rem;
    margin-top: 0.4rem;
}
.login_content input{
    display: block;
    width: 97%;
    height: 1rem;
    font-size: 0.28rem;
    color: #000000;
    padding-left: 0.3rem;
    border: 0;
    border-bottom: 1px solid #d6d6d6;
    outline: none;
    background-color: #fff!important;
}
.login_content .register {
    width: 100%;
    height: 1.5rem;
    border-bottom: 1px solid #d6d6d6;
}
.login_content .register input{
    width: 65%;
    float: left;
    border: 0;
}
.login_content .register button{
    width: 30%;
    float: right;
    color: #162a66;
    background-color: #fff;
    outline: none;
    text-align: center;
}
.login_content .forgot_password {
    text-align: right;
    color: #162a66;
}
.login_register button { 
    display: block;
    margin: 0 auto;
    width: 6.32rem;
    height: 0.9rem;
    font-size: 0.32rem;
    border: 0;
    outline: none;
}
.login_register .login_btn {
    background: url(/static/img/loginbtn.png) center no-repeat;
    background-size: 6.32rem 0.9rem;
    color: #fff;
    margin-top: 1rem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ;
}
.login_register .register_now {
    background-color: #fff;
    color: #0e3851
}
</style>