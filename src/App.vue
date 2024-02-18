<template>

  <div id="app">
    <router-view></router-view> <!-- 这里是用来渲染路由组件的地方 -->

  </div>
</template>

<script>

</script>

<style>
body {
  background-color: white;
}

.produce{
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
