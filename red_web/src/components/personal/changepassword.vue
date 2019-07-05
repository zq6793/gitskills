<template>
    <div class="changepassword">
        <div class="head">
            <i class="back" @click="$router.back(-1)" :style="{'background-image': 'url(./static/img/back.png)'}"></i>
            <div class="headtitle">修改登录密码</div>
        </div>
        <div class="passlist">
            <ul>
                <li>
                    <input type="password" v-model="oldpass" placeholder="请输入原密码">
                </li>
                <li>
                    <input type="password" v-model="newpass1" placeholder="请输入新密码">
                </li>
                <li>
                    <input type="password" v-model="newpass2" placeholder="请确认密码">
                </li>
            </ul>
            <p><span :style="{'background-image': 'url(./static/img/infor.png)'}"></span>密码需为数字和字母组合，且不少于6位。</p>
        </div>
        <button class="submit" @click="submit" :style="{'background-image': 'url(./static/img/loginbtn.png)'}">确定</button>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import store from "../../store/index.js";
import { uppass } from "../../api/api";
export default {
    data() {
        return {
            oldpass:'',
            newpass1:'',
            newpass2:'',
        }
    },
    store,
    computed: {
        ...mapState(["token"])
    },
    methods: {
        submit(){
            let paramObj={token:this.token,old_password:this.oldpass,password:this.newpass1,com_password:this.newpass2}
                uppass(paramObj).then(data=>{
                if(data.code==200){
                    this.$router.push({ path: "/personal"});
                }
            }) 
        }
    },
}
</script>
<style scoped>
.changepassword {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.changepassword .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.changepassword .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background:  center no-repeat;
    background-size: 0.14rem 0.26rem;
}
.changepassword .headtitle {
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 90%;
}
.changepassword .passlist {
    width: 100%;
    margin-top: 0.2rem;
}
.changepassword .passlist li{
    height: 1rem;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
}
.changepassword .passlist li input {
    width: 100%;
    height: 1rem;
    border: 0;
    outline: none;
    font-size: 0.28rem;
    color: #999999;
    float: left;
    padding-left: 0.36rem;
}
.changepassword .passlist li input::-webkit-input-placeholder{
    color: #999999;
}
.changepassword .passlist li input::-moz-placeholder{
    color: #999999;    
}    
.changepassword .passlist li input:-ms-input-placeholder{
    color: #999999;        
}
.changepassword .passlist p {
    font-size: 0.26rem;
    color: #a5afbc;
    padding: 0.47rem;
}
.changepassword .passlist p span {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background:  center no-repeat;
    background-size: 0.32rem;
    margin: 0 0.08rem;
    vertical-align: middle;
}
.changepassword .submit {
    width: 6.1rem;
    height: 0.85rem;
    position: fixed;
    bottom: 5rem;
    left: 50%;
    margin-left: -3.05rem;
    background:  center no-repeat;
    background-size: 6.1rem 0.85rem;
    border: 0;
    outline: none;
    font-size: 0.32rem;
    color: #fff;
}
</style>

