<template>
  <div
    class='scratchlist'
    :style="{'background-image': 'url(./static/img/bg11@2x.png)'}"
  >
    <div
      class="content"
      :style="{'background-image': 'url(./static/img/jx.png)'}"
    >
      <img
        :src="'./static/img/ggk@2x.png'"
        alt=""
      >
      <ul class='clearfix'>
        <li
          v-for="(item,index) in scratchlist"
          :key="index"
          :style="{'background-image': 'url(./static/img/bg22@2x.png)'}"
        >
          <div>
            <p><span>{{item.price.split('.')[0]}}</span>分</p>
            <p>随机得{{item.money_min.split('.')[0]}}~{{item.money_max.split('.')[0]}}分</p>
          </div>
          <button
            class='snap'
            @click="snapped(item.id)"
          >立即抢购<i :style="{'background-image': 'url(./static/img/r@2x.png)'}"></i></button>
        </li>
      </ul>
    </div>
    <div class='prompt'>
      <h2>游戏提示：</h2>
      <p>请先购买不同分数的刮刮卡，然后参与刮卡活动，金额随机</p>
    </div>
    <v-tabbar></v-tabbar>
  </div>
</template>
<script>
import TabBar from "@/components/common/foottabbar";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard, Toast } from "vant";
import { scratchlist, payscratch } from "../../api/api";
import store from "../../store/index.js";
export default {
  components: {
    "v-tabbar": TabBar,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Toast.name]: Toast
  },
  data() {
    return {
      scratchlist: [], //随机刮刮卡列表
      page: 1
    };
  },
  created() {
    this.getlist();
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    //接口队列
    //列表刮刮卡
    getlist() {
      let paramObj = { token: this.token, page: this.page };
      scratchlist(paramObj) //接口调用
        .then(data => {
          if (data.code == 200) {
            this.scratchlist = data.data.data;
          }
        })
        .catch(error => {});
    },
    //跳转详情接口
    snapped(id) {
      let paramObj = { token: this.token, rid: id };
      payscratch(paramObj)
        .then(data => {
          if (data.code == 200) {
            Toast(data.msg);
            setTimeout(() => {
              this.$router.push({
                path: "/scratchdetails",
                query: { lid: data.data }
              });
            }, 1000);
          } else {
            Toast(data.msg);
            setTimeout(() => {
              this.$router.push({
                path: "/scratchdetails",
                query: { lid: data.data }
              });
            }, 1000);
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="less" scoped>
.scratchlist {
  width: 100%;
  min-height: 100%;
  background: center top no-repeat;
  background-color: #a62430;
  background-size: 100%;
  padding: 5rem 0 1.6rem;
  box-sizing: border-box;
  .content {
    margin: 0 auto;
    width: 90%;
    min-height: 80%;
    background: center top no-repeat;
    background-size: 100% 100%;
    padding-bottom: 0.4rem;
    position: relative;
    img {
      width: 4rem;
      height: 1.5rem;
      position: relative;
      top: -0.8rem;
      left: 50%;
      margin-left: -2rem;
    }
    ul {
      width: 80%;
      height: 90%;
      background-color: #bd0a1b;
      margin: 0 auto;
      padding: 5%;
      li {
        width: 45%;
        height: 2.8rem;
        margin: 0.3rem 2% 0.5rem 3%;
        background: center top no-repeat;
        background-size: 100%;
        float: left;
        div {
          width: 100%;
          height: 1.8rem;
          padding-top: 0.2rem;
          p {
            font-size: 0.4rem;
            color: #c15b00;
            text-align: center;
            span {
              font-size: 0.7rem;
            }
          }
        }
        .snap {
          display: block;
          font-size: 0.36rem;
          background-color: transparent;
          color: #ffd06c;
          border: 0;
          margin: 0.3rem auto;
          i {
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            background: center top no-repeat;
            background-size: 0.2rem 0.3rem;
          }
        }
      }
    }
  }
  .prompt {
    width: 90%;
    height: 2rem;
    padding: 0 5%;
    margin-bottom: 1.6rem;
    h2 {
      font-size: 0.4rem;
      color: #ffecab;
      line-height: 0.6rem;
      margin-top: 0.4rem;
    }
    p {
      font-size: 0.34rem;
      color: #ffecab;
      line-height: 0.6rem;
      word-break: normal;
      white-space: pre-warp;
      word-wrapl: break-word;
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
