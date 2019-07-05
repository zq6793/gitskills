<template>
    <div class="complaintcontent">
        <div class="head">
            <i class="back" @click="$router.back(-1)"></i>
            <div class="headtitle">{{typecontent}}</div>
        </div>
        <div class="content">
            <textarea class="txt" v-model="content" placeholder="请输入内容..."></textarea>
        </div>
        <button class="submit" @click="submit" :style="{'background-image': 'url(./static/img/loginbtn.png)'}">提交</button>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard,Toast,PullRefresh } from 'vant';
import { feedback } from "../../api/api";
export default {
     components: {
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard,
        [Toast.name]: Toast
    },
    data() {
        return {
            type:'',
            typecontent:'',
            content:''
        }
    },
    computed: {
        ...mapState(['token'])
    },
    mounted(){
        this.type=this.$route.query.type;
        if(this.type==1){
            this.typecontent='投诉'
        }else {
            this.typecontent='意见反馈'
        }
    },
    methods: {
        submit(){
            let paramObj={token:this.token,content:this.content,type:this.type}
            feedback(paramObj).then(data=>{
                if(data.code==200){
                    this.content=''
                    Toast(data.msg)
                }
            }).catch(error=>{

            })
        }
    },
}
</script>
<style scoped>
.complaintcontent {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.complaintcontent .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.complaintcontent .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background: url(/static/img/back.png) center no-repeat;
    background-size: 0.14rem 0.26rem;
}
.complaintcontent .headtitle {
    font-size: 0.4rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 90%;
}
.complaintcontent .content{
    width: 90%;
    height: 4rem;
    margin: 5% auto;
}
.complaintcontent .content textarea {
    width: 100%;
    height: 4rem;
    background-color: #fff;
    border: 0;
    border-radius: 0.1rem;
    font-size: 0.4rem;
    padding: 0.2rem;
    box-sizing: border-box;
}
.complaintcontent .submit {
    display: block;
    margin: 0 auto;
    width: 6.32rem;
    height: 0.9rem;
    font-size: 0.36rem;
    border: 0;
    outline: none;
    background:  center no-repeat;
    background-size: 6.32rem 0.9rem;
    color: #fff;
    margin-top: 2rem  
}
</style>
