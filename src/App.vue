<template>

  <div id="app">
    <header-vue></header-vue>
    <router-view></router-view> <!-- 这里是用来渲染路由组件的地方 -->
    <foot-vue></foot-vue>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import HeaderVue from "@/HeaderVue.vue";

export default defineComponent({
  components: {HeaderVue}
})
</script>

<style>
body {
  background-color: white;
}

.produce {
  position: absolute;
  width: 227px;
  height: 77px;
  left: 100px;
  top: 200px;

  font-family: "Newsreader";
  font-style: normal;
  font-weight: 400;
  font-size: 43px;
  line-height: 120%;
  /* identical to box height, or 77px */
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.02em;

  color: #000000;
}

.time {
  position: absolute;
  width: 300px;
  height: 26px;
  left: 347px;
  top: 170px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 130%;
  /* identical to box height, or 26px */
  display: flex;
  align-items: flex-end;

  color: #000000;
}
</style>
