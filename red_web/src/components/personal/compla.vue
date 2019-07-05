<template>
    <div class="promotioncode">
         <div class="head">
            <i class="back" @click="$router.back(-1)" :style="{'background-image': 'url(./static/img/back.png)'}"></i>
            <div class="headtitle">投诉须知</div>
        </div>
        <div class="promotioncode-in">
           <p>你应保证你的投诉行为基于善意，并代表你本人真实意思。腾讯作为中立的平台服务者，收到你投诉后，会尽快按照相关法律法规的规定独立判断并进行处理。腾讯将会采取合理的措施保护你的个人信息；除法律法规规定的情形外，未经用户许可腾讯不会向第三方公开、透露你的个人信息</p>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { personal,paycode,customer } from "../../api/api";
import store from "../../store/index.js";
export default {
    data() {
        return {
            userlist:[],
            content:''
        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        
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
    font-size: 0.36rem;
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
    padding: 0.2rem;
}
.promotioncode-in p {
    font-size: 0.4rem;
    text-align: center;
    margin-top: 0.2rem;
    color: #333;
    text-indent: 0.2rem;
    line-height: 0.8rem;
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
