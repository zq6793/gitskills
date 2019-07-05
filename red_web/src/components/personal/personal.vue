<template>
    <div class="personal">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="user" :style="{'background-image': 'url(./static/img/my-bg.png)'}">
            <p>您好，{{userlist.nick}}</p>
            <p @click="account">{{userlist.mobile}}<span :style="{'background-image': 'url(./static/img/qh1.png)'}"></span></p>
        </div>
        <div class="userbalance">
            <p>我的积分<span @click="balance">查看明细</span></p>
            <p><em>¥</em> {{userlist.balance}}</p>
            <button class="top-up" @click="topup" :style="{'background-image': 'url(./static/img/topup.png)'}">上分</button>
            <button class="withdrawal" @click="withdrawal"  :style="{'background-image': 'url(./static/img/topup.png)'}">下分</button>
        </div>
        <div class="userlist">
            <ul>
                <!-- <li @click="commissionrecord">
                    <p>佣金记录<span></span></p>
                </li> -->
                <!-- <li @click="modifypayment">
                    <p>设置支付密码<span></span></p>
                </li> -->
                <li @click="contact">
                    <p>联系代理<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
                <li @click="changepassword">
                    <p>修改登录密码<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
                <li @click="promotioncode">
                    <p>申请成为代理<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
                <li @click="commissionrecord">
                    <p>制作一款同样的小游戏<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
                <li @click="opinion">
                    <p>意见反馈<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
            </ul>
        </div>
        <!-- <div class="switchaccount" @click="backindex">
            <p><span :style="{'background-image': 'url(./static/img/backindex1.png)'}"></span>返回首页</p>
        </div> -->
        <div class="topup" v-show="hidden">
            <div class="topup-in shang" v-show="status==1"  
            :style="{'background-image': 'url(./static/img/shangbg.png)'}">
                <img class="shutdown" @click="shutdown" :src="'./static/img/out.png'" alt="">
                <p>请扫码添加代理微信上分</p>
                <img :src="imgsrc2" alt="">
                <!-- <p>029-88443659 <span>一键拨号</span></p> -->
                <p>代理人：<span>{{userlist.agent_nickname}}</span></p>
                <p>(该代理已通过平台认证)</p>
            </div>
            <div class="topup-in tixian" v-show="status==2">
                <img class="shutdown" @click="shutdown" :src="'./static/img/out.png'" alt="">
                <div class="money">
                    下分数：<input type="text" v-model="money" placeholder="10的倍数">
                </div>
                <div class="paymentcode">
                    <span>收款码</span>
                    <img :src="imgsrc" alt="">
                </div>
                <p><span><input
                    type="file"
                    @change="getFile"
                    ref="file"
                    id="file">
                  <label for="file">点击上传收款码</label>
                </span></p>
                <button class="paysub" @click="paysub" :style="{'background-image': 'url(./static/img/tixianbtn.png)'}">确定</button>
                <p>请及时联系代理下分</p>
            </div>
            <div class="topup-in promotioncode" v-show="status==4" :style="{'background-image': 'url(./static/img/tk.png)'}">
                <img class="shutdown" @click="shutdown" :src="'./static/img/out.png'" alt="">
                <img :src="imgsrc2" alt="">
                <p><span></span></p>
                <p>请联系代理</p>
            </div>
            <div class="topup-in" v-show="status==5" :style="{'background-image': 'url(./static/img/tk.png)'}"> 
                <img class="shutdown" @click="shutdown" :src="'./static/img/out.png'" alt="">
                <img :src="'./static/img/pterweima.png'" alt="">
                <!-- <p>029-88443659 <span>一键拨号</span></p> -->
                <p>扫二维码加微信客服</p>
            </div>
        </div>
        <!-- <div class="pass" v-show="hidden1" @click.stop="hidden1=false,value=''"> -->
            <!-- 密码输入框 -->
            <!-- <div class="enterpass PasswordInput" @click.stop="show = true">
                <h2>请输入密码</h2>
                 <van-password-input
                :value="value"
                @focus="show = true"
                />
                <button class="paybtn" @click.stop="paybtn">支付</button>
            </div> -->
            <!-- 数字键盘 -->
            <!-- <van-number-keyboard
            :show="show"
            extra-key="."
            close-button-text="完成"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
            @close="onClose"
            />
        </div> -->
        <!-- <div class="backindex" >
            <img :src="'./static/img/backindex.png'" alt="">
        </div> -->
        <v-tabbar></v-tabbar>
        </van-pull-refresh>
    </div>
</template>
<script>
import TabBar from '@/components/common/foottabbar'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard,Toast,PullRefresh } from 'vant';
import { personal,paycode,agent,customer,withdrawal } from "../../api/api";
import QRCode from 'qrcodejs2'//生成二维码
import store from "../../store/index.js";
export default {
    components: {
        "v-tabbar": TabBar,
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard,
        [Toast.name]: Toast,
        [PullRefresh.name]: PullRefresh
    },
    data() {
        return {
            //弹窗
            value: '',
            show: false,
            status:null,
            hidden:false,
            hidden1:false,
            //个人信息
            userlist:{},
            //提现二维码图片
            base64:'',
            imgsrc:'',
            //给后台图片路径
            phpimg:'',
            //是否上传提现二维码
            imgfalse:false,
            //提现金额
            money:"",
            //客服二维码
            imgsrc1:'',
            //代理充值
            imgsrc2:'',
            //url地址
            url:'http://redht.81face.top',
            weburl:'',
            isLoading: false
        }
    },
    store,
    created() {
        this.getPersonal()                                             
    },
    computed: {
        ...mapState(["token"])
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.getPersonal();
            }, 500);
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        onClose(){},
        //个人信息
        getPersonal(){
            let paramObj={token:this.token}
            personal(paramObj).then(data=>{
                if(data.code==200){
                    // console.log(data)
                    this.isLoading=false;
                    this.userlist=data.data;
                    if(data.data.paycode==''){
                        this.imgsrc="/static/img/moren.png"
                        this.imgfalse=false;
                    }else {
                        this.imgsrc=`http://redht.81face.top${data.data.paycode}`
                        this.phpimg=data.data.paycode;
                        this.imgfalse=true;
                    }
                    this.qrcode()
                }
            }).catch(error=>{

            })
        },
        //切换账号
        account(){
            this.$router.push({ path: "/" });
        },
        //查看明细
        balance(){
            this.$router.push({ path: "/balance" });
        },
        //关闭弹窗
        shutdown(){
            this.hidden=false;
            this.status=null;
            this.money=''
        },
        //充值
        topup(){
            this.hidden=true;
            this.status=1;
            let paramObj={token:this.token}
            agent(paramObj).then(data=>{
                if(data.code==200){
                    this.imgsrc2=`${this.url}${data.data.wx}`
                    
                }
            }).catch(error=>{
                
            })
        },
        //显示提现弹窗
        withdrawal(){
            this.hidden=true;
            this.status=2;    
        },
        //确定提现
        paysub(){
            if(!this.imgfalse) {
                Toast("请上传提现二维码")
            }else if(this.money % 10 !=0) {
                Toast("请输入正确的金额")
            }else if(this.imgfalse && this.money % 10 ==0){
                let paramObj={token:this.token,money:this.money,paycode:this.phpimg}
                withdrawal(paramObj).then(data=>{
                    // this.imgfalse=false;
                    if(data.code==200){
                        Toast(data.msg)
                    }else {
                    }
                    this.hidden1=false;
                    this.value='';
                    this.money=''
                }).catch(error=>{
                    
                })
            }
        },
        //提现输入密码
        paybtn(){
            
        },
        //推广码
        promotioncode(){
           this.$router.push({ path: "/promotioncode" });
        },
         
        //小游戏
        commissionrecord(){
            this.hidden=true;
            this.status=5; 
            // this.$router.push({ path: "/commissionrecord" });
        },
        // //修改支付密码
        // modifypayment(){
        //     this.$router.push({ path: "/modifypayment" });
        // },
        //修改登录密码
        changepassword(){
            this.$router.push({ path: "/changepassword" });
        },
        //联系客服
        contact(){
            this.hidden=true;
            this.status=4;  
            // let paramObj={}
            // customer(paramObj).then(data=>{
            //     if(data.code==200){
            //         this.weburl=data.data.url;
            //         this.imgsrc1=`${this.url}${data.data.img1}`
            //     }
            // }).catch(error=>{
                
            // })
            let paramObj={token:this.token}
            agent(paramObj).then(data=>{
                if(data.code==200){
                    this.imgsrc2=`${this.url}${data.data.wx}`
                    
                }
            }).catch(error=>{
                
            })
        },
        getFile(e) {
            let _this = this;
            var files = e.target.files[0];
            if (!e || !window.FileReader) return; // 看支持不支持FileReader
            let reader = new FileReader();
            reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
            reader.onloadend = function() {
                _this.imgfalse=true;
                _this.base64 = this.result;
                // 逻辑
                _this.uploadimg(_this.base64);
                // console.log(_this.base64)
            };
        },
        uploadimg(baseurl){
            let paramObj={token:this.token,image:baseurl}
            paycode(paramObj).then(data=>{
                if(data.code==200){
                    this.imgsrc=`http://redht.81face.top${data.data}`;
                    // console.log(this.imgsrc)
                    this.phpimg=data.data;
                }
            })
            .catch(error=>{
                // console.log(error)
            })
        },
        //返回首页
        backindex(){
            this.$router.push({ path: "/index"});
        },
        opinion(){
             this.$router.push({ path: "/complaintcontent",query:{type:2} });  
        }
    },
}
</script>
<style scoped>

.personal{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.personal .user{
    width: 100%;
    height: 3.2rem;
    background:  center no-repeat;
    background-size: 100% 4.3rem;
    padding-top: 1.1rem
}
.personal .user p:first-of-type{
    font-size: 0.52rem;
    color: #fff;
    padding-left: 0.5rem;
}
.personal .user p:last-of-type{
    font-size: 0.35rem;
    color: #ff8686;
    margin: 0.5rem 0;
    padding-left: 0.5rem;
}
.personal .user p:last-of-type span{
    display: inline-block;
    width: 0.21rem;
    height: 0.18rem;
    background: center no-repeat;
    background-size: 0.21rem 0.18rem;
    margin: 0.04rem 0.1rem;
}
.personal .userbalance {
    width: 85%;
    height: 2.4rem;
    margin: -1rem auto 0;
    background-color: #fff3f3;
    border-radius: 0.1rem;
    padding: 0.48rem 0.37rem;
    position: relative;
}
.personal .userbalance p {
    font-size: 0.4rem;
    color: #250101;
}
.personal .userbalance p span {
    float: right;
    color: #4276fb;
}
.personal .userbalance p span::after {
    content: "";
    display: inline-block;
    width: 0.11rem;
    height: 0.17rem;
    background:  center no-repeat;
    background-size: 0.11rem 0.17rem;
    margin:  0 0.06rem;
}
.personal .userbalance p:nth-of-type(2){
    font-size: 0.7rem;
    font-weight: 600;
    color: #250101;
    margin: 0.3rem 0;
}
.personal .userbalance p:nth-of-type(2) em{
    font-style: normal;
    font-weight: normal;
    font-size: 0.4rem;
}
.personal .userbalance button{
    width: 2.8rem;
    height: 0.78rem;
    background: center no-repeat;
    background-size: 2.8rem 0.78rem;
    position: absolute;
    bottom: 0.34rem;
    border: 0;
    outline: none;
    font-size: 0.4rem;
    color: #fffcf1;
}
.personal .userbalance .top-up{
    left: 0.68rem;
}
.personal .userbalance .withdrawal{
    right: 0.68rem;
}
.personal .userlist ul {
    list-style: none;
    padding: 0.4rem;
}
.personal .userlist ul li{
    width: 100%;
    height: 1.25rem;
    border-bottom: 1px solid #eeeeee;
}
.personal .userlist ul li:last-of-type{
    border-bottom: 0;
}
.personal .userlist ul li p{
    font-family: 'Helvetica LT Std';
    font-size: 0.4rem;
    color: #010101;
    line-height: 1.25rem;
}
.personal .userlist ul li p span{
    float: right;
    display: block;
    width: 0.13rem;
    height: 0.23rem;
    background: center no-repeat;
    background-size: 0.13rem 0.23rem;
    margin: 0.5rem 0.3rem;
}
.switchaccount {
    position: fixed;
    bottom: 1.3rem;
    left: 42%;
    z-index: 9999;
}
.switchaccount p{
    font-size: 0.4rem;
    color: #a7a7a7;
}
.switchaccount p span {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background:center no-repeat;
    background-size: 0.4rem;
    margin: 0 0.1rem;
}
/* 充值 提现*/
.topup{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}
.topup-in {
    width: 5.9rem;
    height: 6.72rem;
    background:  center no-repeat;
    background-size: 5.9rem 6.72rem;
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -2.95rem;
}
/* 充值 */
.topup .shang {
    width: 6.9rem;
    height: 8.6rem;
    /* background: url(/static/img/tixian.png) center no-repeat;
    background-size: 6.9rem 8.5rem; */
    background-size: 6.9rem 8.7rem;
    background-color: #fff;
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -3.45rem;
    border-radius: 0.16rem;
}
.topup .shang img{
    margin: 0.4rem auto;
}
.topup .shang p:first-of-type {
    margin-top: 0.7rem;
} 
.topup .shang p:nth-of-type(2) {
    margin-top: 0.3rem;
    font-size: 0.36rem;
    text-align: center;
    color: #9c6300;
}
.topup .shang p:nth-of-type(2) span{
    font-size: 0.46rem;
    text-align: center;
    color: #8a5800;
}
.topup .shang p:last-of-type {
    margin-top: 0.3rem;
}
.topup .shang .shutdown {
    display: block;
    width: 0.53rem;
    height: 1rem;
    position: absolute;
    top: -1.4rem;
    right: 0;
}
.topup .tixian {
    width: 6.9rem;
    height: 8.5rem;
    /* background: url(/static/img/tixian.png) center no-repeat;
    background-size: 6.9rem 8.5rem; */
    background-color: #fff;
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -3.45rem;
    border-radius: 0.16rem;
}
.topup img {
    display: block;
    width: 2.8rem;
    height: 2.8rem;
    margin: 1.5rem auto 1rem;
}
.topup .shutdown {
    display: block;
    width: 0.53rem;
    height: 1rem;
    position: absolute;
    top: -2.5rem;
    right: 0;;
}
.topup p:first-of-type {
    font-size: 0.42rem;
    color: #8a5800;
    text-align: center;
}
.topup p:first-of-type span {
    font-size: 0.3rem;
    color: #256bf9;
}
.topup p:last-of-type {
    font-size: 0.34rem;
    color: #c47d00;
    text-align: center;
    margin-top: 0.5rem;
}
/* 提现 */
.topup .money{
    font-size: 0.36rem;
    color: #333;
    /* position: absolute;
    top: 0.8rem;
    left: 0.4rem; */
    padding: 0.9rem 0.7rem 0;
    height: 1rem;
}
.topup .money input{
    border: 0;
    background-color: transparent;
    outline: none;
    width: 70%;
    color: #d0d0d0;
    font-size: 0.4rem;
    border-bottom: 1px solid #d0d0d0;
    padding: 0.06rem;
}
.topup .money input::-webkit-input-placeholder{
    color: #d0d0d0;
}
.topup .money input::-moz-placeholder{
    color: #d0d0d0;    
}    
.topup .money input:-ms-input-placeholder{
    color: #d0d0d0;        
}
.topup .paymentcode {
    width: 72%;
    height: 2.4rem;
    padding: 0rem 0.7rem 0.5rem;
}
.topup .paymentcode span {
    font-size: 0.4rem;
    color: #333;
    float: left;
}
.topup .paymentcode img{
    float: left;
    margin: 0 0.45rem;
}
.topup label{
    width: 100%;
    display: block;
    color: #af7e1f;
    text-align: center;
    font-size: 0.34rem;
    margin-top: 0.1rem;
}
.topup #file {
    display: none!important;
    z-index: 10;
    width: 120px;
    font-size: 0;
    height: 30px;
}
.topup .tixian p {
    color: #acacac;
}
.paysub {
    display: block;
    width: 4.07rem;
    height: 1.2rem;
    background:  center no-repeat;
    background-size: 4.07rem 1.2rem;
    border: 0;
    outline: none;
    margin: 0.4rem auto 0.3rem;
    font-size: 0.36rem;
    color: #fff;
}

/* 输入密码 */
.pass {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}
.pass .enterpass{
    width: 90%;
    height: 4.46rem;
    background-color: #fff;
    margin: 5rem auto;
    border-radius: 0.1rem;
    padding-top: 0.2rem;
}
.pass .enterpass h2 {
    font-size: 0.34rem;
    font-weight: normal;
    color: #101010;
    text-align: center;
    line-height: 1.1rem;
    /* margin-bottom: 0.6rem; */
}
.pass .enterpass .paybtn{
    display: block;
    width: 3.07rem;
    height: 0.82rem;
    background: url(/static/img/pay.png) center no-repeat;
    background-size: 3.07rem 0.82rem;
    border: 0;
    outline: none;
    margin: 0.6rem auto;
    font-size: 0.36rem;
    color: #fff;
}
/* 返回首页 */
.backindex {
    width: 1rem;
    height: 1rem;
    position: fixed;
    bottom: 2rem;
    right: 0.3rem;
}
.backindex img {
    width: 1rem;
    height: 1rem;
}

</style>

