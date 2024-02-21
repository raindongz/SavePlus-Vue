<template>
    <div id="app">
      <Topbar></Topbar>
      <nav-bar></nav-bar>
      <bottombar></bottombar>
      <Breadcrumb></Breadcrumb>
      <wishlist></wishlist>
      <search-bar></search-bar>
      <router-view></router-view>
      <footer-bar></footer-bar>
      
    </div>
  </template>
  
  <script>
  import Topbar from '@/components/Topbar.vue';
  import NavBar from '@/components/NavBar.vue'
  import SearchBar from '@/components/SearchBar.vue'
  import FooterBar from '@/components/Footer.vue'
  import Breadcrumb from '@/components/Breadcrumb.vue'
  import bottombar from '@/components/bottombar.vue';
  import Wishlist from '@/components/Wishlist.vue'
  
  export default {
    name: 'App',
    components: {
      Topbar,
      NavBar,
      SearchBar,
      FooterBar,
      Breadcrumb,
      bottombar,
      Wishlist,
    }
  }
  </script>
  
  <style>
 
  </style>