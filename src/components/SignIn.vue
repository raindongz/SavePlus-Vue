<template>
   <div class="page-container">
  <nav>
    <ul>
      <img class="logo" alt="saveplus logo" src="@/assets/logo.png">
      <RouterLink to="/">
      <button class="back-button" >Back</button>
      </RouterLink>
      
    </ul>


    <div>

      <div v-if="userData">
        <h2>User Information</h2>
        <p>First Name: {{ userData.firstName }}</p>
        <p>Last Name: {{ userData.lastName }}</p>
      </div>
      <div v-else>
        <h2>No user data available.</h2>
      </div>
    </div>
    <div class="box">
     
          <img alt="userimg" class="userimg" src="@/assets/user1.png">
        

        <div >
          <h1 class="userlogin">User Login</h1>
          <input type="text" v-model="username" placeholder="Username" class="signin1"/>
          <input type="password" v-model="pass" placeholder="Password" class="signin2"/>
          <button @click="saveFields" class="signinbutton">Login</button>
          <RouterLink to="/signup" class="tosignup">Click here to Sign Up</RouterLink>
        </div>


       
    </div>
  </nav>
  </div>
  
 
  </template>
  

<script>
  import axios from 'axios';
   export default {
      
      data() {
        return {
          username: '',
          pass:'',
          savedFields: {}, // 用于保存多个字段的对象
          userData: null,
        };

       
      },

      methods:{
      saveFields() {
        this.savedFields.username = this.username;
        this.savedFields.pass = this.pass;

        this.username = '';
        this.pass = '';
      },

      loginUser() {
        const baseUrl = 'http://api.saveplus.link';
        const requestData = {
          username: 'Fred',
          fullName: 'Flintstone'
        };

        axios.post(`${baseUrl}/post/unInterest`, requestData)
        .then(response => {
            this.userData = response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
      }

     
    },

      mounted() {
        this.loginUser();
      }

     




    }

</script>

<style>
  .box{
    position: relative;
    height: 350px;
    width: 600px;
    margin-top:50px;
    margin-left:30%;
   
   
    border: 2px solid orange;
    border-radius: 40px;
    
  }
  
  .box::before {
  content: "";
  position: absolute; /* 设置绝对定位，相对于父元素 .box 定位 */
  
  left: 280px;
  width: 2px; /* 竖线的宽度 */
  height: 100%; /* 竖线的高度，与 .box 相同 */
  background-color: orange; /* 竖线的颜色 */
}

.userimg {
     position: absolute;
    margin-left: 40px;
    margin-top: 75px;
    background-color: aqua;
    width: 200px;
    height: 200px;
  }

  .userlogin {
    position: absolute;
    
    height: 50px;
    width: 200px;
    margin-left: 370px; /* 调整间距以适应需求 */
    margin-top: 50px;
    
  }

  .signin1{
    position: absolute;
    height: 25px;
    width: 200px;
    margin-left: 330px;
    margin-top: 100px;
    border-radius: 30px;
    background-color:bisque;
    text-align: center;
    border: 0;
    transition: background-color 0.3s;
  }

  .signin1:focus {
  background-color: #fff; /* 点击输入框时背景颜色变为白色 */
  }
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

  .signin2{
    position: absolute;
    height: 25px;
    width: 200px;
    margin-left: 330px;
    margin-top: 155px;
    border-radius: 30px;
    background-color:bisque;
    text-align: center;
    border: 0;
    transition: background-color 0.3s;
  }

  .signin2:focus {
  background-color: #fff; /* 点击输入框时背景颜色变为白色 */
  }

  .signinbutton{
    position: absolute;
    height: 25px;
    width: 205px;
    margin-left: 330px;
    margin-top: 220px;
    border-radius: 20px;
  }
  
  .tosignup{
    position: absolute;
    color: orange;
    margin-left: 362px;
    margin-top: 320px;
  }

  .tosignup:hover{
    color: rgba(255, 166, 0, 0.649);
  }


</style>