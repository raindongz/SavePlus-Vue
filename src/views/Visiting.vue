<template>
    <div id="app">
      <Topbar/>
      <NavBar></NavBar>
      <success/>
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
  import NavBar from '@/components/NavBar.vue';
  import success from '@/components/success.vue';

  import feature from '@/components/feature.vue'
  import category from '@/components/category.vue'
  import action from '@/components/action.vue'
  import featureproduce from '@/components/featureproduce.vue';
  import newsletter from '@/components/newsletter.vue'
  import recentproduct from '@/components/recentproduct.vue'
  import review from '@/components/review.vue'
  import Footer from '@/components/Footer.vue'
  import footerbottom from '@/components/footerbottom.vue'
import Success from '@/components/success.vue';

  export default {
    name: 'App',
    components: {
    Topbar,
    NavBar,
    success,
    feature,
    category,
    action,
    featureproduce,
    newsletter,
    recentproduct,
    review,
    Footer,
    footerbottom,
    Success,
    
}
  };
  </script>
  