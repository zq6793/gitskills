<template>
    <div class="bonusamount" :style="{'background-image': 'url(./static/img/bg11.png)'}">
        <div class="back" @click="$router.back(-1)">
            <img :src="'./static/img/fh.png'" alt="">
        </div>
        <div class="checkbox" :class="isclass" v-show="hidden" :style="{'background-image': 'url(./static/img/38.png)'}"></div>
        <div class="money" v-show="!hidden" >
            <div class="moneyin" :style="{'background-image': 'url(./static/img/hb1.png)'}">
                <p><span>¥</span>{{money}}</p>
            </div>   
            <button class="continu" @click="continu" :style="{'background-image': 'url(./static/img/balance.png)'}">继续抽奖</button>
        </div>
        <button class="balance" @click="balance">查看积分</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hidden: true,
            money:'',
            isclass:'checkbox',
        }
    },
    created() {
        this.money=this.$route.query.money;
       
    },
    mounted() {
        this.enevbtn();
    },
    methods: {
        enevbtn(){
            // var ele=document.getElementsByClassName("checkbox")
            // console.log(ele)
            // ele[0].classList.add("shake");
            this.isclass="shake";
            setTimeout(()=>{
                //this.isclass=''
                //ele[0].classList.remove("shake");
                this.hidden=false
		    },1000);
        },
        balance(){
            this.$router.push({ path: "/personal" });
        },
        //返回首页继续抽奖
        continu(){
             this.$router.push({ path: "/index" });
        }
    },
}
</script>
<style scoped>
.bonusamount{
    width: 100%;
    height: 100%;
    background:  center no-repeat;
    background-size: 100% 100%;
}
.bonusamount .back {
    width: 0.68rem;
    height: 0.68rem;
    position: fixed;
    top: 0.5rem;
    left: 0.3rem;
}
.bonusamount .back img {
    display: block;
    width: 0.68rem;
    height: 0.68rem;
}
.bonusamount .checkbox {
    width: 4.18rem;
    height: 100%;
    background: top no-repeat;
    background-size: 4.18rem;
    position: fixed;
    top: 4rem;
    left: 50%;
    margin-left: -2rem;
}
.bonusamount .money {
    width: 4.18rem;
    height: 100%;
    position: fixed;
    top: 4rem;
    left: 50%;
    margin-left: -2rem;
}
.bonusamount .moneyin {
    width: 4.18rem;
    height: 6.06rem;
    background: top no-repeat;
    background-size: 4.18rem 6.06rem;
}
.bonusamount .moneyin p{
    font-size: 0.6rem;
    color: #e37f14;
    text-align: center;
    line-height: 2.5rem;
}
.bonusamount .moneyin p span{
    font-size: 0.56rem;
}
.bonusamount .continu {
    width: 3.79rem;
    height: 0.85rem;
    background: top no-repeat;
    background-size: 3.79rem 0.85rem;
    font-size: 0.38rem;
    color: #fff1c7;
    outline: none;
    border: 0;
}
.bonusamount .balance {
    /* width: 3.79rem; */
    /* height: 0.85rem; */
    font-size: 0.38rem;
    background-color:transparent;
    color: #fff1c7;
    outline: none;
    border: 0;
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
}
.shake{
	animation:shake .2s infinite linear;
	-webkit-animation:shake .2s infinite linear;
}
@-webkit-keyframes shake {
	0% {
		-webkit-transform: rotate(2deg) translate3d(0,0,0)
	}

	50% {
		-webkit-transform: rotate(-2deg) translate3d(0,0,0)
	}

	100% {
		-webkit-transform: rotate(2deg) translate3d(0,0,0)
	}
}

@-moz-keyframes shake {
	0% {
		transform: rotate(2deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-2deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(2deg) translate3d(0,0,0)
	}
}

@-ms-keyframes shake {
	0% {
		transform: rotate(2deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-2deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(2deg) translate3d(0,0,0)
	}
}
@-o-keyframes shake {
	0% {
		transform: rotate(2deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-2deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(2deg) translate3d(0,0,0)
	}
}
@keyframes shake {
	0% {
		transform: rotate(2deg) translate3d(0,0,0)
	}

	50% {
		transform: rotate(-2deg) translate3d(0,0,0)
	}

	100% {
		transform: rotate(2deg) translate3d(0,0,0)
	}
}

</style>
