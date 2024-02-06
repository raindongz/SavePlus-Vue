<template>
    <div class="page-container">
    <nav>
      <ul>
        <img class="logo" alt="saveplus logo" src="../assets/logo.png">
      
        <RouterLink to="/">
          <button class="upload-button" >Shop</button>
        </RouterLink>  
      </ul>
    </nav>
    </div>

    <div>
        <img alt="userimg" class="uinform" src="@/assets/user.png">
        <h1 class="in-username">Username</h1>
    </div>

    <div>
        <button class="in-e" @click="handleButtonClick">Edit Profile</button>
        <RouterLink to="/produceUp">
            <button class="in-m">My Items</button>
        </RouterLink>
        <RouterLink to="/uploadPro">
            <button class="in-u">Upload Item</button>
        </RouterLink>
    </div>
    
    <div v-if="edit" >
    <div>
      <input type="text" v-model="firstname" placeholder="First name" class="i-t"/>
      </div>

      <div>
      <input type="text" v-model="lastname" placeholder="Last name" class="i-t"/>
      </div>

      <div>
      <input type="text" v-model="address" placeholder="Address" class="i-t"/>
    </div>

    <div>
      <input type="text" v-model="phone" placeholder="Phone number" class="i-t"/>
    </div>

      <div>
      <input type="text" v-model="email" placeholder="Email address" class="i-t"/>
    </div>
    <button @click="saveFields" class="i-savebutton">Save</button>
  
</div>
<div v-else>
    <div>
    <input type="text"  disabled v-model="firstname" placeholder="First name" class="i-t"/>
      </div>

      <div>
      <input type="text" disabled v-model="lastname" placeholder="Last name" class="i-t"/>
      </div>

      <div>
      <input type="text" disabled v-model="address" placeholder="Address" class="i-t"/>
    </div>

    <div>
      <input type="text" disabled v-model="phone" placeholder="Phone number" class="i-t"/>
    </div>

      <div>
      <input type="text" disabled v-model="email" placeholder="Email address" class="i-t"/>
    </div>
    
</div>


</template>

<script>
  export default {
      
      data() {
        return {
         
          firstname: '', // 用于保存姓名
          lastname: '',
          address: '',
          phone: '',
          email: '', 
          edit: false,  
         
          savedFields: {}, // 用于保存多个字段的对象
        };
       
      },

      methods:{
    
  
  
      saveFields() {
        // 当用户点击保存按钮时，将用户输入的字段保存到 savedFields 对象中
        this.savedFields.firstname = this.firstname;
        this.savedFields.lastname = this.lastname;
       
        this.savedFields.email = this.email;
        this.savedFields.phone = this.phone;

        this.savedFields.address = this.address;
        // 清空输入框以便用户输入下一组字段
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.phone = '';
        this.address = '';
      },

    

    handleButtonClick() {
 
        if (this.edit === false){
            this.edit = true;
        } else {
            this.edit = false;
        }
    },
   
    
  
      },
    };

    
</script>

<style>
    .uinform{
        position: absolute;
        height: 200px;
        width: 200px;
        margin-left: 150px;
        margin-top: 50px;
    }
 
    .in-username{
        position: absolute;
        height: 200px;
        width: 200px;
        color: orange;
        font-size: 25px;
        margin-left: 375px;
        margin-top: 150px;
        font-family: 'Arial';
        
    }

    .in-e{
        position: absolute; /* 将元素定位为绝对定位 */
        width: 126px;
        height: 48px;
        left: 190px;
        top: 450px;
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
        background-color: white;
        color: orange; 
    }

    .in-e:hover{
        background-color: white;
        color:rgba(255, 166, 0, 0.649);
    }
    .in-m{
        position: absolute; /* 将元素定位为绝对定位 */
        width: 126px;
        height: 48px;
        left: 190px;
        top: 520px;
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

    .in-u{
        position: absolute; /* 将元素定位为绝对定位 */
        width: 126px;
        height: 48px;
        left: 190px;
        top: 590px;
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

    .i-t{
        width: 300px;
        height: 40px;
        margin-top:40px;
        margin-left:50%;
        border-radius: 20px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 130%;
        text-align: center;
  }

  .i-savebutton{
    position: absolute;
    width: 100px;
    height: 50px;
    margin-top:50px;
    margin-left:57%;
    object-fit: contain; 
    border-radius: 10px;    
    }

   
</style>