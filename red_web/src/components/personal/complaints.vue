<template>
    <div class="complaints">
        <div class="head">
            <i class="back" @click="$router.back(-1)"></i>
            <div class="headtitle">投诉</div>
        </div>
        <div class="list">
            <ul>
               <li @click="comcon">
                    <p>存在欺诈骗钱行为<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
                <li @click="comcon">
                    <p>此号可能被盗用了<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
                <li @click="comcon">
                    <p>存在侵权行为<span :style="{'background-image': 'url(./static/img/r.png)'}"></span></p>
                </li>
            </ul>
        </div>
        <button class="procedure" @click="procedure">投诉须知</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        procedure(){
            this.$router.push({ path: "/compla",query:{type:1} });   
        },
        comcon(){
            this.$router.push({ path: "/complaintcontent",query:{type:1} });   
        }
    },
}
</script>
<style scoped>
.complaints {
    width: 100%;
    height: 100%;
    background-color: #fff9f9;
}
.complaints .head {
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.complaints .head .back {
    float: left;
    display: block;
    width: 10%;
    height: 1rem;
    background: url(/static/img/back.png) center no-repeat;
    background-size: 0.14rem 0.26rem;
}
.complaints .headtitle {
    font-size: 0.4rem;
    color: #333333;
    text-align: center;
    line-height: 1rem;
    width: 90%;
}
.complaints .list {
    width: 100%;
    margin-top: 0.2rem;
}
.complaints .list ul {
    list-style: none;
    padding: 0 0.4rem;
    background-color: #fff;
}
.complaints .list ul li{
    width: 100%;
    height: 1.25rem;
    border-bottom: 1px solid #eeeeee;
}
.complaints .list ul li:last-of-type{
    border-bottom: 0;
}
.complaints .list ul li p{
    font-family: 'Helvetica LT Std';
    font-size: 0.4rem;
    color: #010101;
    line-height: 1.25rem;
}
.complaints .list ul li p span{
    float: right;
    display: block;
    width: 0.13rem;
    height: 0.23rem;
    background: center no-repeat;
    background-size: 0.13rem 0.23rem;
    margin: 0.5rem 0.3rem;
}
.procedure {
    display: block;
    width: 2rem;
    height: 1rem;
    border: 0;
    outline: none;
    font-size: 0.34rem;
    color: #4276fb;
    text-align: center;
    position: fixed;
    bottom: 1rem;
    left: 50%;
    margin-left: -1rem;
    background-color: #fff9f9;
}
</style>
