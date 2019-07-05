<template>
  <div class="maintenance_content">
    <img
      :src="'./static/img/time.png'"
      alt=""
    >
    <div>
        <p>请使用手机端打开</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  created(){
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });
  },
};
</script>
<style scoped>
img {
    width:100%;
    margin: 0 auto;
}
.maintenance_content p{
  line-height: 6rem;
  color: #333333;
  font-size: 0.3rem;
  text-align:center;
}
</style>