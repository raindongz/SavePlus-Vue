<template>

  <div id="app">
    <header-vue></header-vue>
    <router-view></router-view> <!-- 这里是用来渲染路由组件的地方 -->

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
</style>
