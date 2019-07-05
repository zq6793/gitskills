<template>
    <div class="commission">
        <div class="head">
            <i class="back" @click="$router.back(-1)"></i>
            <div class="headtitle">佣金记录</div>
        </div>
        <div class="list">
            <ul>
                <li>
                    <div class="list-l">
                        <p>20.00</p>
                    </div>
                    <div class="list-r">
                        <p>张三</p>
                        <p>133****1245</p>
                    </div>
                </li>
                <li>
                    <div class="list-l">
                        <p>20.00</p>
                    </div>
                    <div class="list-r">
                        <p>张三</p>
                        <p>133****1245</p>
                    </div>
                </li>
                <li>
                    <div class="list-l">
                        <p>20.00</p>
                    </div>
                    <div class="list-r">
                        <p>张三</p>
                        <p>133****1245</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.commission {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.commission .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.commission .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background: url(/static/img/back.png) center no-repeat;
    background-size: 0.14rem 0.26rem;
}
.commission .headtitle {
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 90%;
}
.commission .list {
    width: 100%;
    margin-top: 0.2rem;
}
.commission .list li {
    height: 1.38rem;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
}
.commission .list li:last-of-type {
    border-bottom: 0;
}
.commission .list .list-l {
    width: 65%;
    float: left;
}
.commission .list .list-l p {
    font-size: 0.38rem;
    color: #000000;
    line-height: 1.38rem;
    padding-left: 0.36rem;
}
.commission .list .list-r {
    width: 30%;
    float: right;
    padding-right: 0.36rem;
}
.commission .list .list-r p:first-of-type{
    font-size: 0.3rem;
    color: #000000;
    text-align: right;
    line-height: 0.6rem;
    margin-top: 0.2rem;
}
.commission .list .list-r p:last-of-type{
    font-size: 0.24rem;
    color: #999;
    text-align: right;
    line-height: 0.6rem;
}
</style>
