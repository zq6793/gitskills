<template>
  <div
    class='goldegglist'
    :style="{'background-image': 'url(./static/img/goldbgc.png)'}"
  >
    <div
      class="content"
      :style="{'background-image': 'url(./static/img/glod2@2x.png)'}"
    >
      <ul class='clearfix'>
        <li
          v-for="(item,index) in eggslist"
          :key="index"
        >
          <img
            :src="'./static/img/jd.png'"
            alt=""
          >
          <button
            class='snap'
            @click="snapped(item.id)"
            :style="{'background-image': 'url(./static/img/jx@2x.png)'}"
          >{{item.price.split('.')[0]}}分抢购
            <i :style="{'background-image': 'url(./static/img/r@2x.png)'}">
            </i>
          </button>
        </li>
      </ul>
    </div>
    <div class='prompt'>
      <h2>游戏提示：</h2>
      <p>请先购买不同分数的金蛋，然后参与砸金蛋活动，奖励随机</p>
    </div>
    <v-tabbar></v-tabbar>
  </div>
</template>
<script>
import TabBar from "@/components/common/foottabbar";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard, Toast } from "vant";
import { egglist, payegg } from "../../api/api";
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
      eggslist: [], //金丹列表
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
    getlist() {
      let paramObj = { token: this.token, page: this.page };
      egglist(paramObj)
        .then(data => {
          if (data.code == 200) {
            this.eggslist = data.data.data;
          }
        })
        .catch(error => {});
    },
    snapped(id) {
      let paramObj = { token: this.token, rid: id };
      payegg(paramObj).then(data => {
        if (data.code == 200) {
          Toast(data.msg);
          setTimeout(() => {
            this.$router.push({
              path: "/goldeneggsldetails",
              query: { lid: data.data }
            });
          }, 1000);
        } else {
          Toast(data.msg);
          setTimeout(() => {
            this.$router.push({
              path: "/goldeneggsldetails",
              query: { lid: data.data }
            });
          }, 1000);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.goldegglist {
  width: 100%;
  min-height: 100%;
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
        width: 28%;
        height: 3.8rem;
        margin: 0.3rem 2.5% 0.3rem 2.5%;
        background: center top no-repeat;
        background-size: 100%;
        float: left;
        img {
          display: block;
          width: 2.2rem;
          height: 2.8rem;
          margin: 0 auto;
        }
        .snap {
          display: block;
          width: 100%;
          height: 1rem;
          font-size: 0.36rem;
          background: center no-repeat;
          background-size: 100%;
          background-color: transparent;
          color: #ffd06c;
          border: 0;
          margin: 0.3rem auto 0;
          line-height: 1rem;
          text-align: center;
          i {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            background: center top no-repeat;
            background-size: 0.15rem 0.2rem;
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
