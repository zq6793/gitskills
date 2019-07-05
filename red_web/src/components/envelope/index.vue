df<template>
    <div class="content">
        <div class="header">
            <img :src="'./static/img/bg1.jpg'" alt="">
        </div>
        <!-- 抽奖轮播 -->
        <div class="banner">
            <!-- <vue-seamless-scroll :data="newsList" :class-option="optionLeft" class="seamless-warp2" v-if="newsList.lenght!=0"> -->
                <ul class="item shakes" :style="{'width':6.22*newsListlength+'rem',}">
                    <li v-for="(item,index) in newsList" :key="index" v-text="item.content"></li>
                </ul>
            <!-- </vue-seamless-scroll> -->
        </div>   
        <!-- 抽奖 -->
        <div class="conin" :style="{'background-image': 'url(./static/img/bg3.jpg)'}">
            <ul>
                <li  @click.stop="change(list.id)" v-for="(list,index) in indexlist" :key="index" :style="{'background-image': 'url(./static/img/hb.png)'}">
                    <p>可抽{{list.money_min}}-{{list.money_max}}分</p>
                    <p><span>¥</span>{{list.price}}</p>
                </li>
                
            </ul>
        </div>
        <!-- <div class="accountbalance" @click="personal">
            <p>个人中心<span :style="{'background-image': 'url(./static/img/right.png)'}"></span></p>
        </div> -->
        <div class="footer">
            <img :src="'./static/img/bg2.jpg'" alt="">
            <v-tabbar></v-tabbar>
        </div>
        <!-- <div class="audio"  :class="Rotation" @click="play" :style="{'background-image': bgi}">
            <audio :src="'./static/audio/222.mp3'" id="audio" loop="loop"></audio>
        </div> -->
        <button class="tousu" @click="tousu">投诉</button>
        <!-- <div class="pass" v-show="hidden" @click.stop="hidden=false,value=''"> -->
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
    </div>
</template>
<script>
import TabBar from '@/components/common/foottabbar';
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard,Toast} from 'vant';
import { indexlist,payred,announ,getannoun } from "../../api/api";
import store from "../../store/index.js";
export default {
    name: "index",
    name: "Aplayer",
    components: {
        "v-tabbar": TabBar,
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard,
        [Toast.name]: Toast,
    },
    data() {
        return {
            //密码输入
            value: '',
            show: false,
            hidden:false,
            //红包
            indexlist:[],
            rid:'',
            //轮播信息
            newsList:[],
            newsListlength:4,
            //定时器
            timer:'',
            leftnum:0,
            //音频播放
            isPlaying: false,
            bgi:"url(./static/img/audio.png)",
            Rotation:'Rotation'
        };
    },
    created() {
        this.getData();
        this.timer=setInterval(() => {
            this.announ()
        },4000);
    },
    mounted() {
    },
    computed: {
        ...mapState(["token"]),
        optionLeft () {
            return {
                step: 1,
                direction: 2,
                limitMoveNum: 2,
                waitTime: 1000, //单步停止等待时间
                isPlaying: false,
            }
        },
    },
    methods: { 
        // play() {
        //     var audio = document.getElementById("audio");
        //     if (!this.isPlaying) {
        //         this.isPlaying = true;
        //         this.bgi="url(./static/img/audio.png)"
        //         audio.play(); 
        //         this.Rotation='Rotation'
        //     }else {
        //          this.isPlaying = false;
        //         this.bgi="url(./static/img/audio1.png)"
        //         audio.pause();
        //         this.Rotation=''
        //     }
        // },
        //获取红包数据
        getData(){
            let paramObj={token:this.token}
            indexlist(paramObj).then(data=>{
                if(data.code==200){
                    this.indexlist=data.data.data
                }
            })
            .catch(error=>{
                // console.log(error)
            })
            let paramObj1={}
            getannoun(paramObj1).then(data=>{
                if(data.code==200){
                    this.newsList=data.data
                }
            })
            .catch(error=>{
                // console.log(error)
            })
        },
        //轮播数据更新
        announ(){
            let paramObj1={}
            announ(paramObj1).then(data=>{
                if(data.code==200){
                    // this.newsList=this.curtail(this.newsList)
                    this.newsList.push(data.data)
                    this.newsListlength=this.newsList.length
                    // console.log(this.newsList)
                }
            })
            .catch(error=>{
                //console.log(error)
            })
        },
        // 数组删除
        curtail(arr) {
            var m = arr.slice(0);
            m.splice(0,1);
            return m;
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        onClose(){},
        //选择红包
        change(id){
            console.log(id)
            // this.hidden=true;
            this.rid=id;
            let paramObj={token:this.token,rid:this.rid,password:this.value}
            payred(paramObj).then(data=>{
                if(data.code==200){
                    // this.hidden=false;
                    // this.value='';
                    Toast(data.msg)
                    setTimeout(() => {
                        this.$router.push({ path: "/envelope",query:{lid:data.data}});
                    }, 1000);
                    
                }
            })
            .catch(error=>{
                // console.log(error)
            })
        },
        //支付
        // paybtn(){
        //     let paramObj={token:this.token,rid:this.rid,password:this.value}
        //     payred(paramObj).then(data=>{
        //         if(data.code==200){
        //             this.hidden=false;
        //             this.value='';
        //             this.$router.push({ path: "/envelope",query:{lid:data.data}});
        //         }
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //     })
            
        // },
        //个人中心查看账户余额
        personal(){
            this.$router.push({ path: "/personal" });
        },
        tousu(){
            this.$router.push({ path: "/complaints",query:{type:1} });
        }
    },
    beforeDestroy() {
        if(this.timer){
            clearInterval(this.timer)
        }
        
    },
    destroyed() {
        // this.play()
    },
}
</script>
<style scoped>
.content{
    height: 100%;
}
.header{
    width: 100%;
    height: 6.15rem;
    position: fixed;
	top: 0;
	left: 0;
}
.header img {
    width: 100%;
    height: 6.15rem;
}
.footer {
    width: 100%;
    height: 1.55rem;
    position: fixed;
	bottom: 0;
    left: 0;
}
.footer img {
    width: 100%;
    height: 1.55rem;
}
/* 轮播 */
.banner {
    overflow: hidden;
    height: 1rem;
    width: 100%;    
    position: fixed;
    top: 4rem;
    left: 0;
}
.banner ul {
    height: 1rem;
    position: absolute;
    top: 0;
    left: 0;
} 
.shakes{
	animation:mymove 10000s infinite linear;
	-webkit-animation:mymove 10000s infinite linear;
}

@keyframes mymove{
    from {left:0px;}
    to {left:-400000px;}
}

@-webkit-keyframes mymove /*Safari and Chrome*/{
    from {left:0px;}
    to {left:-400000px;}
} 
.banner ul li{
    /* width: 6.22rem; */
    height: 1rem;
    float: left;
    margin-right: 12rem; 
    background-color: rgba(0,0,0,0.56); 
    font-size: 0.28rem;
    color: #fff;
    line-height: 1rem;
    padding: 0 0.4rem;
    border-radius: 0.5rem;
} 
/* .seamless-warp2 ul.item li:last-of-type{
    margin-right: 1.12rem; 
} */
.conin{
    width: 100%;
    height: 100%;
    background: center repeat-y;
    background-size: 100% 1px;
    position: fixed;
	top: 6.1rem;
	left: 0;
}
.conin ul {
    list-style: none;
    /* width: 100%; */
    height: 100%;
    padding: 0.3rem;
}
.conin ul li {
    width: 31%;
    height: 2.2rem;
    background: center no-repeat;
    background-size: 100% 2.2rem;
    margin: 0.1rem;
    float: left;
}
.conin ul li p:first-of-type{
    color: #846b43;
    font-size: 0.3rem;
    text-align: center;
    margin: 0.08rem 0 0;
}
.conin ul li p:last-of-type{
    color: #ce0406;
    font-size: 0.51rem;
    text-align: center;
}
.conin ul li p:last-of-type span {
    font-size: 0.22rem;
}
.accountbalance {
    position: fixed;
    bottom: 1.3rem;
    left: 42%;
    z-index: 9999;
}
.accountbalance p{
    font-size: 0.36rem;
    color: #fdcf43;
}
.accountbalance p span {
    display: inline-block;
    width: 0.14rem;
    height: 0.16rem;
    background: center no-repeat;
    background-size: 0.14rem 0.16rem;
    margin: 0.06rem;
}
.pass {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
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
    font-size: 0.3rem;
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
    font-size: 0.32rem;
    color: #fff;
}
/* 背景音乐 */
.audio{
    width: 0.88rem;
    height: 0.88rem;
    background: center no-repeat;
    background-size: 0.88rem;
    position: fixed;
    top: 5.2rem;
    left: 0.4rem;
    border-radius: 50%;
}
@-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
@keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
.Rotation{
    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
}
/* 投诉 */
.tousu {
    background-color: transparent;
    font-size: 0.46rem;
    color: #fff;
    position: fixed;
    top: 0.4rem;
    right: 0.4rem;
    border: 0;
} 
</style>
