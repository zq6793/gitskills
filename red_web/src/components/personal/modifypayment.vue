<template>
    <div class="modifypayment">
        <div class="head">
            <i class="back" @click="$router.back(-1)"></i>
            <div class="headtitle">身份验证</div>
            <p class="next" @click="next">下一步</p>
        </div>
        <div class="content">
            <input type="text" v-model="phone" placeholder="请输入手机号码">
            <div class="register">
                <input type="text" v-model="code" placeholder="请输入验证码">   
                <button  @click="sendcode">{{countdown}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import store from "../../store/index.js";
import { send,setpay } from "../../api/api";
export default {
    data() {
        return {
            phone:'',
            code:'',
            countdown:"获取验证码",
            totaltime:10,
            canClick: true, //添加canClick
            Interval:null
        }
    },
    store,
    computed: {
        ...mapState(["token"])
    },
    methods: {
        ...mapMutations(["Forgot"]),
        //获取验证码
        sendcode(){
            if(this.canClick){
                this.canClick = false
                this.Interval = setInterval(() => {
                    this.totaltime--;
                    this.countdown = '('+this.totaltime + 's)'
                    //console.log(this.totaltime )
                    if(this.totaltime <= 0){
                        clearInterval(this.Interval)
                        this.countdown = '获取验证码'
                        this.totaltime = 10
                        this.canClick = true
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
        //下一步
        next(){
            if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
                alert("手机号码有误，请重填");  
                return false; 
            }else if(this.code==""){ 
                alert("手机验证码不能为空");  
                return false; 
            }else{
                let paramObj={token:this.token,mobile:this.phone,code:this.code}
                setpay(paramObj).then(data=>{
                    if(data.code==200){
                        let forgotData={upsign: data.data.up_sign,phone:this.phone}
                        this.Forgot(forgotData)
                        this.$router.push({ path: "/newpassword"});
                    }
                })
                
            }
        }
    },
}
</script>
<style scoped>
.modifypayment {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.modifypayment .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.modifypayment .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background: url(/static/img/back.png) center no-repeat;
    background-size: 0.14rem 0.26rem;
    margin-right: 5%;
}
.modifypayment .headtitle {
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 70%;
    float: left;
}
.modifypayment .next{
    display: block;
    float: right;
    width: 15%;
    height: 1rem;
    font-size: 0.28rem;
    color: #c5242a;
    text-align: center;
    line-height: 1rem;
}
.content {
    width: 100%;
    height: 2rem;
    margin-top: 0.2rem;
    background-color: #fff;
}
.content p {
    font-size: 0.3rem;
    color: #000000;
    margin-left: 0.3rem;
    margin-top: 0.6rem;
}
.content input{
    display: block;
    width: 100%;
    height: 1rem;
    font-size: 0.28rem;
    color: #000000;
    padding-left: 0.4rem;
    border: 0;
    border-bottom: 1px solid #d6d6d6;
    outline: none;
}
.content .register input{
    width: 65%;
    float: left;
    border: 0;
}
.content .register button{
    width: 2.5rem;
    height: 0.8rem;
    float: right;
    color: #fff;
    background: url(/static/img/topup.png) center no-repeat;
    background-size: 2.5rem 0.8rem;
    outline: none;
    text-align: center;
    border: 0;
    font-size: 0.28rem;
    margin: 0.1rem 0.3rem;
}

</style>

