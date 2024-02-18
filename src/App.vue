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
import FootVue from "@/FootVue.vue";

export default defineComponent({
  components: {FootVue, HeaderVue}
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
  top: 110px;
  margin-top: 30px;

  font-family: 'Newsreader';
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 120%;
  /* identical to box height, or 77px */
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.02em;

  color: #000000;
}
</style>
