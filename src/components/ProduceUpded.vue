<template>
    <div class="page-container">
    <nav>
      <ul>
        <img class="logo" alt="saveplus logo" src="../assets/logo.png">
        <li><RouterLink to="/" class="shop">Home</RouterLink></li>
      
        <li><RouterLink to="/p-information" class="Myprofile">My profile</RouterLink></li>
        <RouterLink to="/uploadPro">
          <button class="upload-button" >UPLOAD</button>
        </RouterLink>
     
      
      
      </ul>
    </nav>
    
  
  
    <body>
      <header>
        <h1 class="produce"> Items </h1>
        <div class="time">
          {{ formattedDate }}
        </div>
      </header>
      <div class="divider"></div>
    </body>
  
    
    <body class="show">
        <RouterLink to="/pro-info">
      <!-- <a href="https://cn.vuejs.org/tutorial/#step-5" style="display: block; width: 100%; height: 100%; position: static; top: 0; left: 0;"> -->
        <img class="pro1" alt="pro1" src="../assets/logo.png">
        <p class="name">Table</p>
        <p class="price">$5.99</p>
        </RouterLink>
      <!-- </a> -->
    </body>
    


    
  </div>

  <body class="test">
    

  </body>
  
  </template>
  
  <script>

    export default {
      
      data() {
        return {
          formattedDate: '' 
        };
      },
      created() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date();
        this.formattedDate = currentDate.toLocaleDateString(undefined, options);
      }
      
    };
  
  
  
  </script>
  
  <style>
  
  
  
  .page-container {
    
    overflow-y: auto; /* 启用垂直滚动条 */
  }
  
  nav ul {
    list-style-type: none; /* 去掉列表项的标记（点点） */
  }
  
  
  .logo{
    width: 125px; /* 修改图片宽度 */
    height: auto; /* 保持高度与宽度的比例 */
    margin-left: 50px;
    margin-top: 15px;
    display: block; /* 让图片居中生效 */
    backdrop-filter: blur(2px);
  }
  
  
  .shop {
    position: absolute;
    width: 39px;
    height: 21px;
    right: 379px;
    top: 45px;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    /* identical to box height, or 21px */
    display: flex;
    align-items: center;
    text-align: center;
  
    color: #000000;
  
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
   
  .Myprofile{
    position: absolute;
    width: 76px;
    height: 21px;
    right: 270px;
    top: 45px;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    /* identical to box height, or 21px */
    display: flex;
    align-items: center;
    text-align: center;
  
    color: #000000;
  
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  /* 设置元素的位置和样式 */
  .upload-button {
    
    position: absolute; /* 将元素定位为绝对定位 */
    width: 126px;
    height: 48px;
    right: 115px;
    top: 35px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    display: flex;
    align-items: center;
    justify-content: center; /* 水平居中对齐文本 */
    text-align: center;
    border-radius: 10px;
    
  }
  
  button {
    background-color: orange;
    color: white; 
    border: 0;
  }
  
  button:hover{
    background-color: rgba(255, 166, 0, 0.649);
  }
  
  
  
  .produce{
    position: absolute;
    width: 227px;
    height: 77px;
    left: 100px;
    top: 110px;
  
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
  
  .time{
    position: absolute;
    width: 300px;
    height: 26px;
    left: 347px;
    top: 190px;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 130%;
    /* identical to box height, or 26px */
    display: flex;
    align-items: flex-end;
  
    color: #000000;
  }
  
  .divider {
    height: 2px; /* 设置分隔线的高度 */
    background-color: #E6E6E6; /* 设置分隔线的背景颜色 */
    margin: 100px; /* 可选：设置分隔线上下的间距 */
  }
  
  
  
  .show{
    position: absolute;
    width: 300px;
    height: 330px;
    background-color: #E6E6E6;
    left: 110px;
    top: 250px;
    border-radius: 10px;
  }
  
  .pro1{
    position: absolute;
    width: 300px;
    height: 200px;
    object-fit: contain; 
    
  }
  
  .name{
    position: absolute;
    width: 162px;
    height: 26px;
    left: 24px;
    top: 220px;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 130%;
  
  
    color: #000000;
  
  }
  
  .price{
    position: absolute;
    width: 57px;
    height: 26px;
    left: 24px;
    top: 245px;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 130%;
    /* identical to box height, or 26px */
  
    color: #426B1F;
  
  }
  
  .test{
    height: 700px;
  }
  
  </style>
  
  
  <!-- <script setup>
  import { ref } from 'vue'
  
  const text = ref('')
  </script>
  
  <template>
    <input v-model="text" placeholder="Type here">
    <p>{{ text }}</p>
  </template> -->