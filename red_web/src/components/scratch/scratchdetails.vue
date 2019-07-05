<template>
  <div
    class='scratchdetails'
    :style="{'background-image': 'url(./static/img/bg11@2x.png)'}"
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
      :style="{'background-image': 'url(./static/img/jx.png)'}"
    >
      <img
        class='imghead'
        :src="'./static/img/ggk@2x.png'"
        alt=""
      >
    </div>
    <div id='guaJiang'>
      <div
        class='bjc'
        :style="{'background-image': 'url(./static/img/bg22@2x.png)'}"
      >萌赚送你{{money}}</div>
      <canvas
        id="myCanvas"
        class='guaCanvas'
        width="240"
        height="70"
      ></canvas>
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
import $ from "jquery";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { scratchextract } from "../../api/api";
import store from "../../store/index.js";
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      hidden: false,
      isclass: false,
      isget: true,
      lid: "",
      money: 0
    };
  },
  computed: {
    ...mapState(["token"])
  },
  created() {},
  mounted() {
    var clientWidth = document.documentElement.clientWidth;
    if (clientWidth * 1 > 0) {
      document.querySelector("#guaJiang .bjc").style.left =
        (clientWidth - 240) / 2 + "px";
      document.querySelector("#guaJiang .guaCanvas").style.left =
        (clientWidth - 240) / 2 + "px";
    }
    // 得到画笔
    var cvs = document.getElementById("myCanvas"),
      ctx = cvs.getContext("2d"),
      touchRadius = 15; // 默认手指触摸半径，可以自定义设置

    // 默认填充灰色来遮住文字
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, 240, 70); // fillRect，用矩形填充
    ctx.font = "15px arial";
    ctx.fillStyle = "white";
    ctx.fillText("您获得一次刮奖机会", 56, 40);

    // 画园的方法
    // @param { integer } 圆心的x坐标
    // @param { integer } 圆心的y坐标
    // @param { integer } 圆心半径
    // @param { string } 填充的颜色（本例中会通过其余代码设置为‘透明’，所以这个设置可以忽略）
    var fillCircle = function(x, y, radius, fillColor) {
      this.fillStyle = fillColor || "#eee";
      this.beginPath();
      this.moveTo(x - 90, y - 300);
      this.arc(x - 90, y - 300, radius, 0, Math.PI * 2, false); // 标准画圆
      this.fill();
    };

    // 得到涂抹的百分比
    var getTransparentPercent = function(ctx, width, height) {
      var imgData = ctx.getImageData(0, 0, width, height), // 得到canvas的像素信息
        pixles = imgData.data,
        transPixs = [];
      for (var i = 0, j = pixles.length; i < j; i += 4) {
        // 因为存储的结构为[R, G, B, A]，所以要每次跳4个长度
        var a = pixles[i + 3]; // 拿到存储alpha通道的值
        if (a === 0) {
          // alpha通道为0，就代表透明
          transPixs.push(i);
        }
      }
      return ((transPixs.length / (pixles.length / 4)) * 100).toFixed(2);
    };

    // 需要判断是PC还是手机
    var device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent.toLowerCase()
      ),
      clickEvtName = device ? "touchstart" : "mousedown",
      moveEvtName = device ? "touchmove" : "mousemove";

    // 判断是不是开始触摸等
    if (!device) {
      var isMouseDown = false;
      document.addEventListener(
        "mouseup",
        function(e) {
          isMouseDown = false;
        },
        false
      );
    } else {
      document.addEventListener(
        "touchmove",
        function(e) {
          if (isMouseDown) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
      document.addEventListener(
        "touchend",
        function(e) {
          isMouseDown = false;
        },
        false
      );
    }

    // 开始移动
    cvs.addEventListener(
      clickEvtName,
      function(e) {
        isMouseDown = true;
        var x = device ? e.touches[0].clientX : e.clientX;
        var y = device ? e.touches[0].clientY : e.clientY;
        ctx.globalCompositeOperation = "destination-out"; // 关键部分，描述当在canvas上再次绘画时候的情况，这个设置便是之前所说的透明
        fillCircle.call(ctx, x, y, touchRadius);
      },
      false
    );

    // 移动中
    cvs.addEventListener(
      moveEvtName,
      e => {
        if (!device && !isMouseDown) {
          return false;
        }
        var x = device ? e.touches[0].clientX : e.clientX;
        var y = device ? e.touches[0].clientY : e.clientY;
        ctx.globalCompositeOperation = "destination-out";
        fillCircle.call(ctx, x, y, touchRadius);
        var num = getTransparentPercent(ctx, 240, 70);
        if (num > 30) {
          this.changeenev();
        }
      },
      false
    );
  },
  methods: {
    changeenev() {
      this.lid = this.$route.query.lid;
      if (this.isget) {
        this.isget = false;
        let paramObj = { token: this.token, lid: this.lid };
        scratchextract(paramObj)
          .then(data => {
            if (data.code == 200) {
              this.money = data.data;
            } else {
              Toast(data.data.msg);
            }
            this.hidden = true;
            this.isclass = true;
          })
          .catch(error => {});
      }
    },
    confirm() {
      this.$router.push({ path: "/scratchlist" });
    }
  }
};
</script>
<style lang="less" scoped>
.scratchdetails {
  width: 100%;
  height: 100%;
  background: center top no-repeat;
  background-color: #a62430;
  background-size: 100%;
  padding: 5rem 0 1.6rem;
  box-sizing: border-box;
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
  .content {
    margin: 0 auto;
    width: 90%;
    min-height: 80%;
    background: center top no-repeat;
    background-size: 100% 100%;
    padding-bottom: 0.4rem;
    position: relative;
    .imghead {
      width: 4rem;
      height: 1.5rem;
      position: relative;
      top: -0.8rem;
      left: 50%;
      margin-left: -2rem;
    }
  }
  #guaJiang .bjc {
    color: black;
    height: 2.5rem;
    width: 7rem;
    text-align: center;
    line-height: 2.5rem;
    font-size: 0.4rem;
    color: #c15b00;
    position: absolute;
    top: 7rem;
    left: 50% !important;
    margin-left: -3.5rem;
    background: center top no-repeat;
    background-size: 100% 100%;
  }
  #guaJiang .guaCanvas {
    z-index: 3;
    height: 2.5rem;
    width: 7rem;
    position: absolute;
    top: 7rem;
    left: 50% !important;
    margin-left: -3.5rem;
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
</style>
