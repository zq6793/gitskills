<template>
    <div class="balance">
        <div class="head">
            <i class="back" @click="$router.back(-1)"></i>
            <div class="headtitle">余额明细</div>
        </div>
        <div class="list" >
            <van-list
                v-model="loading"
                :finished="finished"
                :loading-text="loadingword"
                @load="onLoad"
                :immediate-check="false"
                :offset="50"
            >
            <!-- <van-cell v-for="(list,index) in balancelist" :key="index" :title="list"/> -->
            <ul>
                <li v-for="(list,index) in balancelist" :key="index">
                    <div class="list-l">
                        <p>{{list.money}}</p>
                    </div>
                    <div class="list-r">
                        <p>{{list.remark}}</p>
                        <p>{{list.ctime}}</p>
                    </div>
                </li>
            </ul>
            </van-list>
        </div>
       
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { balance } from "../../api/api";
import store from "../../store/index.js";
import { List } from 'vant';
export default {
    components: {
        [List.name]: List,
    },
    data() {
        return {
            page:1,
            balancelist:[],
            loading: false,
            finished: false,
            loadingword: "加载中",
            goodlistpage: "", //总页数
            isShowwords: false,
        }
    },
    store,
    created() {
        this.getBalance();
    },
    computed: {
        ...mapState(["token"])
    },
    methods: {
        onLoad() {
            this.page++
            // 异步更新数据
            setTimeout(() => {
                this.page++;
                this.finished = false;
                this.getBalance();
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.page > this.goodlistpage) {
                    this.finished = true;
                    this.isShowwords = true;
                }
            }, 500);
        },
        //余额明细
        getBalance(){
            let paramObj={token:this.token,page:this.page}
            balance(paramObj).then(data=>{
                if(data.code==200){
                    // console.log(data)
                    //this.balancelist=data.data.data;
                    this.balancelist = this.balancelist.concat(data.data.data);
                    this.goodlistpage = data.data.last_page;
                }
            })
            .catch(error=>{

            })
        },
    }
}
</script>
<style scoped>
.balance {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.balance .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
}
.balance .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background: url(/static/img/back.png) center no-repeat;
    background-size: 0.14rem 0.26rem;
}
.balance .headtitle {
    font-size: 0.34rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 90%;
}
.balance .list {
    width: 100%;
    /* height: 100%; */
    padding-top: 1.2rem;
    overflow-y: scroll;
    background-color: #fff9f9;
}
.balance .list li {
    height: 1.38rem;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
}
.balance .list li:last-of-type {
    border-bottom: 0;
}
.balance .list .list-l {
    width: 50%;
    float: left;
}
.balance .list .list-l p {
    font-size: 0.38rem;
    color: #000000;
    line-height: 1.38rem;
    padding-left: 0.36rem;
}
.balance .list .list-r {
    width: 45%;
    float: right;
    padding-right: 0.36rem;
}
.balance .list .list-r p:first-of-type{
    font-size: 0.34rem;
    color: #000000;
    text-align: right;
    line-height: 0.6rem;
    margin-top: 0.2rem;
}
.balance .list .list-r p:last-of-type{
    font-size: 0.3rem;
    color: #999;
    text-align: right;
    line-height: 0.6rem;
}
</style>

