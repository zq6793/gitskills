<template>
    <div class="envelope" :style="{'background-image': 'url(./static/img/chb-bg.jpg)'}">
        <div class="back" @click="back">
            <img :src="'./static/img/fh.png'" alt="">
        </div>
        <div class="content" >
            <img class="anime1" @click="changeenev(1)" :src="'./static/img/1.png'" alt="">
            <img class="anime2" @click="changeenev(2)" :src="'./static/img/2.png'" alt="">
            <img class="anime3" @click="changeenev(3)" :src="'./static/img/3.png'" alt="">
            <img class="anime1" @click="changeenev(4)" :src="'./static/img/4.png'" alt="">
            <img class="anime2" @click="changeenev(5)" :src="'./static/img/5.png'" alt="">
            <img class="anime3" @click="changeenev(6)" :src="'./static/img/6.png'" alt="">
            <img class="anime1" @click="changeenev(7)" :src="'./static/img/7.png'" alt="">
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { extractred } from "../../api/api";
import store from "../../store/index.js";
export default {
    data() {
        return {
            lid:'',
        }
    },
    computed: {
        ...mapState(["token"])
    },
    methods: {
        changeenev(num){
            this.lid=this.$route.query.lid;
            let paramObj={token:this.token,lid:this.lid,red:num}
            extractred(paramObj).then(data=>{
                if(data.code==200){
                    this.$router.push({ path: "/bonusamount",query:{money:data.data} });
                }
            })
            .catch(error=>{
                // console.log(error)
            })
        },
        back(){
            this.$router.push({ path: "/index"})
        }
    },
}
</script>
<style scoped>
.envelope{
    width: 100%;
    height: 100%;
    background: center no-repeat;
    background-size: 100% 100%; 
}
.envelope .back {
    width: 0.68rem;
    height: 0.68rem;
    position: fixed;
    top: 0.5rem;
    left: 0.3rem;
    z-index: 9999;
}
.envelope .back img {
    display: block;
    width: 0.68rem;
    height: 0.68rem;
}
.envelope .content {
    width: 100%;
    height: 100%;
    position: relative;
}
.envelope .content img {
    position: absolute;
}
.envelope .content img:nth-of-type(1) {
    width: 2.4rem;
    height: 2.6rem;
    top: 5.4rem;
    left: 1.5rem;
}
.envelope .content img:nth-of-type(2) {
    width: 5.4rem;
    height: 5rem;
    top: 2rem;
    left: 4.5rem;
}
.envelope .content img:nth-of-type(3) {
    width: 2.4rem;
    height: 2.6rem;
    top: 8.4rem;
    left: 0.6rem;
}
.envelope .content img:nth-of-type(4) {
    width: 2.4rem;
    height: 2.6rem;
    top: 7.8rem;
    left: 4.5rem;
}
.envelope .content img:nth-of-type(5) {
    width: 2rem;
    height: 2.6rem;
    top: 8rem;
    right: 0;
}
.envelope .content img:nth-of-type(6) {
    width: 2.4rem;
    height: 2.6rem;
    top: 11.4rem;
    left: 1.5rem;
}
.envelope .content img:nth-of-type(7) {
    width: 2.4rem;
    height: 2.6rem;
    top: 12rem;
    left: 5rem;
}
/* 动画 */
.anime1{
	animation:anime1 1s infinite linear;
	-webkit-animation:anime1 1s infinite linear;
}
.anime2{
	animation:anime1 1.3s infinite linear;
	-webkit-animation:anime1 1.3s infinite linear;
}
.anime3{
	animation:anime1 1.5s infinite linear;
	-webkit-animation:anime1 1.5s infinite linear;
}
@keyframes anime1 {
	0% {
		transform: rotate(10deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-10deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(8deg) translate3d(0,0,0)
	}
}
@-webkit-keyframes shake {
	0% {
		transform: rotate(10deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-10deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(8deg) translate3d(0,0,0)
	}
}

@-moz-keyframes shake {
	0% {
		transform: rotate(10deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-10deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(8deg) translate3d(0,0,0)
	}
}

@-ms-keyframes shake {
	0% {
		transform: rotate(10deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-10deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(8deg) translate3d(0,0,0)
	}
}
@-o-keyframes shake {
	0% {
		transform: rotate(10deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-10deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(8deg) translate3d(0,0,0)
	}
}
</style>
