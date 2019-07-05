<template>
    <div class="newpassword">
        <div class="head">
            <i class="back" @click="$router.back(-1)"></i>
            <div class="headtitle">新密码</div>
            <!-- <p class="next" @click="next">下一步</p> -->
        </div>
        <div class="content">
            <div class="enterpass PasswordInput">
                <h2>请输入新密码</h2>
                <van-password-input
                :value="value"
                @focus="show = true"
                />               
            </div>
            <p><span></span>密码为6位阿拉伯数字。</p>
            <!-- 数字键盘 -->
            <van-number-keyboard
            :show="show"
            extra-key="."
            close-button-text="完成"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
            @close="onClose"
            />
        </div>
        <button class="next" @click="next" v-show="count==1">下一步</button>
        <button class="next" @click="next1" v-show="count==2">确认</button>
    </div>
</template>
<script>
import { PasswordInput, NumberKeyboard,Toast} from 'vant';
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import store from "../../store/index.js";
import { uppay } from "../../api/api";
export default {
    name: "newpassword",
    components: {
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard,
        [Toast.name]: Toast
    },
    data() {
        return {
            upsign:this.$route.params.upsign,
            count:1,
            show: false,
            hidden:false,
            value: '',
            pass1:'',
            pass2:''
        }
    },
    store,
    computed: {
        ...mapState(["token",'forgotData'])
    },
    methods: {
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        onClose() {
        //关闭时触发事件
        
        },
        //下一步
        next(){
            this.count=2;
            this.pass1=this.value
            this.value='';
        },
        //确认
        next1(){
            this.pass2=this.value  
            // console.log(this.token)
            let paramObj={token:this.token,up_sign:this.forgotData.upsign,password:this.pass1,com_password:this.pass2}
                uppay(paramObj).then(data=>{
                if(data.code==200){
                    //this.$router.push({ path: "/personal"});
                }
            })         
        }
    },
}
</script>
<style scoped>
.newpassword {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.newpassword .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.newpassword .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background: url(/static/img/back.png) center no-repeat;
    background-size: 0.14rem 0.26rem;
    margin-right: 5%;
}
.newpassword .headtitle {
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 70%;
    float: left;
}
.content {
    width: 100%;
    margin-top: 0.2rem;
}
.content .enterpass {
    width: 100%;
    height: 3.1rem;
    padding-top: 0.9rem;
     background-color: #fff;
}
.content .enterpass h2 {
    font-size: 0.34rem;
    color: #101010;
    margin: 0 0.53rem  0.88rem;
    font-weight: normal;
}
.content p {
    font-size: 0.26rem;
    color: #a5afbc;
    padding: 0.47rem;
}
.content p span {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(/static/img/infor.png) center no-repeat;
    background-size: 0.32rem;
    margin: 0 0.08rem;
    vertical-align: middle;
}
.newpassword .next { 
    display: block;
    margin: 0 auto;
    width: 6.32rem;
    height: 0.9rem;
    font-size: 0.32rem;
    border: 0;
    outline: none;
    background: url(/static/img/loginbtn.png) center no-repeat;
    background-size: 6.32rem 0.9rem;
    color: #fff;
    margin-top: 2rem  
}

</style>

