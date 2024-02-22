<template>
    <div id="app">
      <Topbar/>
      <NavBar></NavBar>
      <bottombar/>
      <MainSlider/>
      <feature/>
      <category/>
      <action/>
      <featureproduce/>
      <newsletter/>
      <recentproduct/>
      <review/>
      <Footer></Footer>
      <footerbottom/>
    </div>
    
  </template>
  
  <script>
  import Topbar from '@/components/Topbar.vue';
  import bottombar from '@/components/bottombar.vue';
  import MainSlider from '@/components/MainSlider.vue';
  import NavBar from '@/components/NavBar.vue';
  import feature from '@/components/feature.vue'
  import category from '@/components/category.vue'
  import action from '@/components/action.vue'
  import featureproduce from '@/components/featureproduce.vue';
  import newsletter from '@/components/newsletter.vue'
  import recentproduct from '@/components/recentproduct.vue'
  import review from '@/components/review.vue'
  import Footer from '@/components/Footer.vue'
  import footerbottom from '@/components/footerbottom.vue'
  
  export default {
    name: 'App',
    components: {
    Topbar,
    NavBar,
    bottombar,
    MainSlider,
    feature,
    category,
    action,
    featureproduce,
    newsletter,
    recentproduct,
    review,
    Footer,
    footerbottom,
    
}
  };
  </script>
  