<template>
   <div class="page-container">
  <nav>
    <ul>
      <img class="logo" alt="saveplus logo" src="@/assets/logo.png">
      <RouterLink to="/">
      <button class="back-button" >Back</button>
      </RouterLink>
      
    </ul>
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
   export default {
      
      data() {
        return {
          username: '',
          pass:'',
          savedFields: {}, // 用于保存多个字段的对象
        };

       
      },

      methods:{
      saveFields() {
        this.savedFields.username = this.username;
        this.savedFields.pass = this.pass;

        this.username = '';
        this.pass = '';
      },
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