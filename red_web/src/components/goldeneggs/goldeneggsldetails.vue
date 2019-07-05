<template>
  <div
    class='goldegglist'
    :style="{'background-image': 'url(./static/img/goldbgc.png)'}"
  >
    <div
      class="back"
      @click="$router.back(-1)"
    >
      <img
        :src="'./static/img/back11.png'"
        alt=""
      >
    </div>
    <div
      class="content"
      :style="{'background-image': 'url(./static/img/glod2@2x.png)'}"
    >
      <ul class='clearfix'>
        <li>
          <img
            @click="changeagg(1)"
            :src="'./static/img/jd.png'"
            alt=""
          >
        </li>
        <li>
          <img
            @click="changeagg(1)"
            :src="'./static/img/jd.png'"
            alt=""
          >
        </li>
        <li>
          <img
            @click="changeagg(1)"
            :src="'./static/img/jd.png'"
            alt=""
          >
        </li>
      </ul>
    </div>
    <div
      class="box"
      v-if="ishidden"
    >
      <div class="chouJiang">
        <p class="chouJiangTishi">请稍等...</p>
        <img
          class="caiDai"
          :src="'./static/img/caidai.png'"
          alt="彩带"
        >
        <img
          class="imgDan"
          :src="'./static/img/jd.png'"
          alt="砸蛋"
          title="砸蛋"
        >
        <img
          class="imgChuiZi"
          :src="'./static/img/chuizi.png'"
          alt="锤子"
        >
      </div>
    </div>
    <div
      id="mask"
      v-if="hidden"
    >
      <div
        class="blin"
        :style="{'background-image': 'url(./static/img/gold.png)'}"
      ></div>
      <div
        class="caidai"
        :style="{'background-image': 'url(./static/img/dianzhui.png)'}"
      ></div>
      <div
        class="winning"
        :class="{'reback':isclass}"
      >
        <div class="red-head"></div>
        <div class="red-body"></div>
        <div
          id="card"
          :class="{'pull':isclass}"
        >
          <a
            href=""
            target="_self"
            class="win"
          >{{money}}</a>
        </div>
        <a
          target="_self"
          class="btn"
          @click="confirm"
        >确认</a>
        <!-- <span id="close" @click="close"></span> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { eggextract } from "../../api/api";
import store from "../../store/index.js";
export default {
  components: {},
  data() {
    return {
      ishidden: false,
      hidden: false,
      isclass: false,
      money: 0
    };
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    snapped() {
      this.$router.push({ path: "/scratchdetails" });
    },
    changeagg() {
      this.ishidden = true;
      if (this.ishidden) {
        this.lid = this.$route.query.lid;
        let paramObj = { token: this.token, lid: this.lid };
        eggextract(paramObj)
          .then(data => {
            if (data.code == 200) {
              this.money = data.data;
            }
          })
          .catch(error => {});
      }
      setTimeout(() => {
        this.ishidden = false;
        this.hidden = true;
        this.isclass = true;
      }, 2000);
    },
    confirm() {
      this.$router.push({ path: "/goldeneggslist" });
    }
  }
};
</script>
<style lang="less" scoped>
.goldegglist {
  width: 100%;
  height: 100%;
  background: center top no-repeat;
  background-color: #590000;
  background-size: 100%;
  padding: 5rem 0 1.6rem;
  box-sizing: border-box;
  .content {
    margin: 0 auto;
    width: 100%;
    min-height: 80%;
    background: center no-repeat;
    background-size: 80%;
    background-color: #590000;
    padding-bottom: 0.4rem;
    position: relative;
    ul {
      width: 90%;
      height: 90%;
      margin: 0 auto;
      padding: 5%;
      li {
        width: 50%;
        height: 3.8rem;
        background: center top no-repeat;
        background-size: 100%;
        float: left;
        img {
          display: block;
          width: 3rem;
          height: 3.8rem;
          margin: 0 auto;
        }
      }
      li:first-of-type {
        width: 100%;
        margin: 1.2rem auto 0;
      }
    }
  }
  .back {
    width: 0.68rem;
    height: 0.68rem;
    position: fixed;
    top: 0.5rem;
    left: 0.3rem;
    z-index: 9999;
    img {
      display: block;
      width: 0.68rem;
      height: 0.68rem;
    }
  }
  //砸金蛋特效
  .box {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    .chouJiang {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 10001;
      width: 360px;
      height: 300px;
    }
    /* line 24, ../sass/model/_alert.scss */
    .chouJiang .imgDan {
      position: absolute;
      top: 56%;
      left: 50%;
      width: 48%;
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 10001;
    }
    /* line 33, ../sass/model/_alert.scss */
    .chouJiang .caiDai {
      position: absolute;
      top: 2%;
      left: 2%;
      width: 100px;
      z-index: 10001;
      -moz-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    /* line 42, ../sass/model/_alert.scss */
    .chouJiang .chouJiangTishi {
      position: absolute;
      bottom: 10%;
      width: 100%;
      text-align: center;
      font-family: "Microsoft YaHei";
      font-size: 16px;
      background-image: -webkit-linear-gradient(#f9dba1 50%, #d0ab71 100%);
      /* Opera 11.1 - 12.0 */
      background: -o-linear-gradient(#f9dba1 50%, #d0ab71 100%);
      /* Firefox 3.6 - 15 */
      background: -moz-linear-gradient(#f9dba1 50%, #d0ab71 100%);
      /* 标准的语法 */
      background: linear-gradient(#f9dba1 50%, #d0ab71 100%);
      -webkit-background-clip: text;
      font-weight: bold;
      -webkit-text-fill-color: transparent;
    }
    /* line 62, ../sass/model/_alert.scss */
    .chouJiang .imgChuiZi {
      position: absolute;
      top: 0;
      right: 30px;
      width: 30%;
      z-index: 10002;
      -moz-transform-origin: bottom right;
      -webkit-transform-origin: bottom right;
      transform-origin: bottom 100%;
      -moz-transform: rotate(15deg);
      -ms-transform: rotate(15deg);
      -webkit-transform: rotate(15deg);
      transform: rotate(15deg);
      -moz-animation: chuizi 1.5s ease 3;
      -webkit-animation: chuizi 1.5s ease 3;
      animation: chuizi 1.5s ease 3;
    }
    @keyframes chuizi {
      0% {
        -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
      }
      30% {
        -moz-transform: rotate(-25deg);
        -ms-transform: rotate(-25deg);
        -webkit-transform: rotate(-25deg);
        transform: rotate(-25deg);
      }
      100% {
        -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
      }
    }
    @-webkit-keyframes chuizi {
      0% {
        -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
      }
      30% {
        -moz-transform: rotate(-25deg);
        -ms-transform: rotate(-25deg);
        -webkit-transform: rotate(-25deg);
        transform: rotate(-25deg);
      }
      100% {
        -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
      }
    }
    @-moz-keyframes chuizi {
      0% {
        -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
      }
      30% {
        -moz-transform: rotate(-25deg);
        -ms-transform: rotate(-25deg);
        -webkit-transform: rotate(-25deg);
        transform: rotate(-25deg);
      }
      100% {
        -moz-transform: rotate(15deg);
        -ms-transform: rotate(15deg);
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
      }
    }
  }
  /*中奖提示*/
  #mask {
    // display: none;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
  }
  #mask .blin {
    width: 100%;
    height: 100%;
    background: no-repeat center;
    background-image: url("../../../static/img/gold.png");
    background-size: 100%;
    -o-animation: circle 10s linear infinite;
    -ms-animation: circle 10s linear infinite;
    -moz-animation: circle 10s linear infinite;
    -webkit-animation: circle 10s linear infinite;
    animation: circle 10s linear infinite;
  }
  @keyframes circle {
    0% {
      -o-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -o-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  #mask .caidai {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-image: url("../../../static/img/dianzhui.png");
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  #mask .winning {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 8rem;
    height: 6.8rem;
    margin: -3.46666667rem 0 0 -4rem;
    -o-transform: scale(0.1);
    -ms-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
  }
  #mask .reback {
    -o-animation: reback 0.5s linear forwards;
    -ms-animation: reback 0.5s linear forwards;
    -moz-animation: reback 0.5s linear forwards;
    -webkit-animation: reback 0.5s linear forwards;
    animation: reback 0.5s linear forwards;
  }
  @keyframes reback {
    100% {
      -o-transform: scale(1);
      -ms-transform: scale(1);
      -moz-transform: scale(1);
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  .winning .red-head {
    position: relative;
    top: -0.33333333rem;
    width: 100%;
    height: 4.46666667rem;
    background: no-repeat center;
    background-image: url("../../../static/img/top.png");
    background-size: 100%;
  }
  .winning .red-body {
    position: relative;
    top: -2.13333333rem;
    z-index: 2;
    width: 100%;
    height: 4.8rem;
    background: no-repeat center;
    background-image: url("../../../static/img/bottom.png");
    background-size: 100%;
  }
  .winning #card {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    margin-left: -3.2rem;
    margin-top: -1.06666667rem;
    width: 80%;
    height: 4.26666667rem;
    background: no-repeat center;
    background-image: url("../../../static/img/middle.png");
    background-size: 100%;
    -o-transition: top 0.5s;
    -ms-transition: top 0.5s;
    -moz-transition: top 0.5s;
    -webkit-transition: top 0.5s;
    transition: top 0.5s;
  }
  #card .win {
    display: block;
    margin: 0.13333333rem auto;
    width: 92%;
    height: 3.86666667rem;
    background: no-repeat center;
    background-image: url("../../../static/img/bg22@2x.png");
    background-size: 100%;
    color: #c15b00;
    font-size: 0.8rem;
    text-align: center;
    line-height: 3rem;
  }
  .winning .pull {
    -o-animation: card 0.5s linear forwards;
    -ms-animation: card 0.5s linear forwards;
    -moz-animation: card 0.5s linear forwards;
    -webkit-animation: card 0.5s linear forwards;
    animation: card 0.5s linear forwards;
  }
  @keyframes card {
    100% {
      margin-top: -3.2rem;
    }
  }
  .winning .btn {
    position: absolute;
    left: 50%;
    bottom: 10%;
    z-index: 2;
    width: 4.85333333rem;
    height: 1rem;
    margin-left: -2.42666667rem;
    color: #fff;
    font-size: 0.4rem;
    line-height: 1rem;
    text-align: center;
    background: no-repeat center;
    background-image: url("../../../static/img/balance.png");
    background-size: 100%;
    -o-animation: shake 0.5s 2 linear alternate;
    -ms-animation: shake 0.5s 2 linear alternate;
    -moz-animation: shake 0.5s 2 linear alternate;
    -webkit-animation: shake 0.5s 2 linear alternate;
    animation: shake 0.5s 2 linear alternate;
  }
  @keyframes shake {
    50% {
      -o-transform: rotate(-5deg);
      -ms-transform: rotate(-5deg);
      -moz-transform: rotate(-5deg);
      -webkit-transform: rotate(-5deg);
      transform: rotate(-5deg);
    }
    100% {
      -o-transform: rotate(5deg);
      -ms-transform: rotate(5deg);
      -moz-transform: rotate(5deg);
      -webkit-transform: rotate(5deg);
      transform: rotate(5deg);
    }
  }
  #close {
    opacity: 0;
    position: absolute;
    right: 0rem;
    top: -1.06666667rem;
    z-index: 10;
    width: 0.85333333rem;
    height: 0.85333333rem;
    background: no-repeat center;
    background-image: url("../../../static/img/close.png");
    background-size: 100%;
    -o-animation: fadein 0.5s 0.5s linear forwards;
    -ms-animation: fadein 0.5s 0.5s linear forwards;
    -moz-animation: fadein 0.5s 0.5s linear forwards;
    -webkit-animation: fadein 0.5s 0.5s linear forwards;
    animation: fadein 0.5s 0.5s linear forwards;
  }
  @keyframes fadein {
    100% {
      opacity: 1;
      -o-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
// *清除浮动代码*/
.clearfix:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfix {
  zoom: 1;
}
</style>
