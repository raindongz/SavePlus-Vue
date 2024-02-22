<template>
    <div id="app">
      <Topbar></Topbar>
      <nav-bar></nav-bar>
      <bottombar></bottombar>
      <Breadcrumb></Breadcrumb>
      <Myaccount></Myaccount>
      <router-view></router-view>
      <footer-bar></footer-bar>
      <footerbottom></footerbottom>
    </div>
  </template>
  
  <script>
  import Topbar from '@/components/Topbar.vue';
  import NavBar from '@/components/NavBar.vue'
  import FooterBar from '@/components/Footer.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import bottombar from '@/components/bottombar.vue';
  import Myaccount from '@/components/Myaccount.vue';
  import Footerbottom from '@/components/footerbottom.vue';
  export default {
    name: 'App',
    components: {
    Topbar,
    NavBar,
    Myaccount,
    FooterBar,
    Breadcrumb,
    bottombar,
    Footerbottom,
    
}
  }
  </script>
  
  <style>
 
  </style>