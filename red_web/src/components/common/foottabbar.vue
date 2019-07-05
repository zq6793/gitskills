<template>
    <div class="tabbar">
       <ul>
            <li @click="tomodels(1)">
                <!-- <router-link :to="{path:'/course'}"> -->
                <i :style="{'background-image':(tmactive==1 ? 'url(./static/img/1.1@2x.png)':'url(./static/img/1@2x.png)')}"></i>
                抢红包
                <!-- </router-link> -->
            </li>
            <li @click="tomodels(2)">
                <!-- <router-link :to="{path:'/examination'}"> -->
                <i :style="{'background-image':(tmactive==2 ? 'url(./static/img/2.2@2x.png)':'url(./static/img/2@2x.png)')}"></i>
                刮刮乐
                <!-- </router-link> -->
            </li>
            <li @click="tomodels(3)">
                <!-- <router-link :to="{path:'/cases'}"> -->
                <i :style="{'background-image':(tmactive==3 ? 'url(./static/img/3.1@2x.png)':'url(./static/img/3@2x.png)')}"></i>
                砸金蛋
                <!-- </router-link> -->
            </li>
            <li @click="tomodels(4)">
                <!-- <router-link :to="{path:'/personal'}"> -->
                <i :style="{'background-image':(tmactive==4 ? 'url(./static/img/4.1@2x.png)':'url(./static/img/5@2x.png)')}"></i>
                我的
                <!-- </router-link> -->
            </li>
       </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tmactive:1,
        }
    },
    created() {
        this.modelInit()
    },
    methods: {
        //路由跳转事件
        tomodels(tm) {
            // console.log(tm)
            this.tmactive = tm;
            switch (tm) {
                case 1:
                this.$router.push({ path: "/index" });
                break;
                case 2:
                this.$router.push({ path: "/scratchlist" });
                break;
                case 3:
                this.$router.push({ path: "/goldeneggslist" });
                break;
                case 4:
                this.$router.push({ path: "/personal" });
                this.tmactive = 4;
                break;
            }
        },
        modelInit() {
            let url = this.getUrl();
            if (url.indexOf("index") > 0) {
                this.tmactive = 1;
            }
            if (url.indexOf("scratchlist") > 0) {
                this.tmactive = 2;
            }
            if (url.indexOf("goldeneggslist") > 0) {
                this.tmactive = 3;
            }
            if (url.indexOf("personal") > 0) {
                this.tmactive = 4;
            }
        }
    },
}
</script>
<style lang="less" scoped>
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.6rem;
    background-color: #fbe8ca;
    ul{
        width: 100%;
        height: 100%;
        li {
            float: left;
            width: 25%;
            height: 100%;
            font-size: 0.4rem;
            text-align: center;
            color: #2d0002;
            i {
                display: block;
                width: 100%;
                height: 0.9rem;
                background: no-repeat center top;
                background-size: 0.9rem;
                margin-top: 0.08rem;
            }
        }
    }
}
</style>
