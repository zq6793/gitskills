<template>
    <div class="login_register">
        <!-- <div class="login_head">
            <i class="back"></i>
            <h2>您好,</h2>
            <p>欢迎来到 <span>幸运红包</span></p>
        </div> -->
        <v-header></v-header>
        <div class="login_content">
            <p>新密码</p>
            <input type="password" v-model="pass1" placeholder="请输入密码">
            <p>确认密码</p>
            <input type="password" v-model="pass2" placeholder="请确认密码">           
        </div>
        <button class="login_btn" @click="confirm" :style="{'background-image': 'url(./static/img/loginbtn.png)'}">确认</button>
        <!-- <button class="register_now">立即注册</button> -->
    </div>
</template>
<script>
import header from '@/components/common/header'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";;
import store from "../../store/index.js";
import { forgetpassword } from "../../api/api";
export default {
    components: {
        "v-header": header,
    },
    name:'registernow',
    data(){
        return {
            pass1:'',
            pass2:'',
        }
    },
    store,
    computed: {
        ...mapState(["forgotData"])
    },
    created() {
        // console.log(this.forgotData)
    },
    methods: {
        confirm(){
            // console.log(this.forgotData)
            let paramObj={mobile:this.forgotData.phone,up_sign:this.forgotData.upsign,password:this.pass1,com_password:this.pass2}
                forgetpassword(paramObj).then(data=>{
                if(data.code==200){
                    this.$router.push({ path: "/"});
                }
            })
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
    margin-top: 0.6rem;
}
.login_content input{
    display: block;
    width: 100%;
    height: 1rem;
    font-size: 0.28rem;
    color: #000000;
    padding-left: 0.3rem;
    border: 0;
    border-bottom: 1px solid #d6d6d6;
    outline: none;
    background-color: #fff!important;
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
    margin-top: 2rem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ;
}
.login_register .register_now {
    background-color: #fff;
    color: #0e3851
}
</style>