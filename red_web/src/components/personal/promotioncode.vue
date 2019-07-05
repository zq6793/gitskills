<template>
    <div class="promotioncode">
         <div class="head">
            <i class="back" @click="$router.back(-1)" :style="{'background-image': 'url(./static/img/back.png)'}"></i>
            <div class="headtitle">申请代理</div>
        </div>
        <div class="promotioncode-in" v-html="content">
            <!-- <div id="qrcode"></div> -->
            <!-- <p><span></span></p> -->
            <!-- <p>推荐码：{{userlist.code}}</p> -->
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard,Toast} from 'vant';
import { personal,paycode,customer } from "../../api/api";
import QRCode from 'qrcodejs2'//生成二维码
import store from "../../store/index.js";
export default {
    components: {
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard,
        [Toast.name]: Toast
    },
    data() {
        return {
            userlist:[],
            content:''
        }
    },
    created() {
        this.getPersonal()
    },
    computed: {
        ...mapState(["token"])
    },
    methods: {
         //个人信息
        getPersonal(){
            let paramObj={token:this.token}
            personal(paramObj).then(data=>{
                if(data.code==200){
                    // console.log(data)
                    this.userlist=data.data;
                    this.qrcode()
                }
            }).catch(error=>{

            })
            let paramObj1={}
            customer(paramObj1).then(data=>{
                if(data.code==200){
                   this.content=data.data.content
                }
            }).catch(error=>{

            })
        },
        // //生成推广码
        // qrcode () {  
        //     let _this=this;
        //     //console.log(`${_this.userlist.url}?code=${_this.userlist.code}&type=1`)
        //     let qrcode = new QRCode('qrcode', {  
        //         width: 100,  
        //         height: 100, // 高度  
        //         text: `${_this.userlist.url}/#/registernow?code=${_this.userlist.code}&type=1`, // 二维码内容  
        //         render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
        //         colorDark: '#000',//http://redbag.ruiqinet.com?code=DFTW&type=2
        //         colorLight: "#fff", 
        //     }) 
        // },
    },
}
</script>
<style scoped>
.promotioncode {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.promotioncode .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.promotioncode .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background: center no-repeat;
    background-size: 0.14rem 0.26rem;
}
.promotioncode .headtitle {
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 90%;
}

.promotioncode-in {
    /* width: 3.6rem;
    height: 3.6rem;
    position: absolute;
    top: 6.8rem;
    /* left: 50%;
    margin-left: -1.8rem;
    background: url(/static/img/tjbgc1.png) center no-repeat;
    background-size: 3.6rem; */ 
    width: 100%;
    height: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
}
.promotioncode-in p {
    font-size: 0.3rem;
    text-align: center;
    margin-top: 0.5rem;
    color: #c47d00;
}
.promotioncode-in span img {
    display: block;
}
.promotioncode-in img {
    display: block!important;
    margin: 0 auto!important;
}
/* 生成二维码 */
/* #qrcode {
    width: 3.4rem;
    height: 3.4rem;
    margin: 0.25rem;
}
#qrcode img {
    width: 100%!important;
} */


</style>
