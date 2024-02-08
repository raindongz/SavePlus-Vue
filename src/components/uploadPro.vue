<template>
  <div class="page-container">
  <nav>
    <ul>
      <img class="logo" alt="saveplus logo" src="@/assets/logo.png">
       <li><RouterLink to="/" class="shop">Home</RouterLink></li>
    
    <li><RouterLink to="/p-information" class="Myprofile">My profile</RouterLink></li>
    <RouterLink to="/produceUp">
    <button class="back-button" >Back</button>
    </RouterLink>
    
   
    
    
    </ul>
  </nav>
  


  <body>
    <header>
      <h1 class="produce"> Product </h1>
      <div class="time">
        {{ formattedDate }}
      </div>
    </header>
    <div class="divider"></div>
  </body>

  <div class="image-container">
    
    <img @click="openFileInput" src="@/assets/add.png" class="imagechange">
    
    <input type="file" id="fileInput" ref="fileInput" @change="handleFileChange" accept="image/*" multiple style="display: none;" />
    <!-- <div v-for="(image, index) in uploadedImages" :key="index" class="image-wrapper">
      <img :src="image" alt="Uploaded Image"  class="up-choosephoto" />
    </div> -->

    <img v-if="uploadedImages.length > 0"  @click="openFileInput" :src="currentImage" alt="Uploaded Image" class="up-choosephoto" />
    <button @click="prevImage" class="pre">Previous</button>
    <button @click="nextImage" class="nex">Next</button>
    
  </div>

  <div>
    <div>
      <h1 class="utext1">Type:</h1>
      </div>
    <div>
    
    <input type="text" v-model="name" placeholder="Enter Type..." class="vname"/>
    </div>
    <div>
      <h1 class="ttext2">Decribe:</h1>
      </div>
    <div>
    <textarea type="text" v-model="describe" placeholder="Enter describe..." class="vdescribe"/>
  </div>
  <div>
      <h1 class="ttext2">Price:</h1>
      </div>
    <div>
    <input type="text" v-model="price" placeholder="Enter price..." class="vprice"/>
  </div>
  <div>
      <h1 class="ttext2">Phone Number:</h1>
      </div>
    <div>
    <input type="text" v-model="phone" placeholder="Enter phone number..." class="vphone"/>
  </div>
  <div>
      <h1 class="ttext2">Address:</h1>
      </div>
    <div>
    <input type="text" v-model="address" placeholder="Enter address..." class="vaddress"/>
  </div>
  <body class="pxb"></body>
  <div>
      <label for="selectItem" class="ttext3">State:</label>
  </div>
  <div>
      <select v-model="selectedItem" id="selectItem" class="vstate">
          <option value="item1">Available</option>
          <option value="item2">In progress</option>
          <option value="item3">Completed</option>
      </select>
  </div>



    <button @click="saveFields" class="savebutton">Save</button>
    
  </div>
  
</div>

<body class="blankb"></body>

</template>

<script>

  export default {
    
    data() {
      return {
        formattedDate: '' ,
        uploadedImages: [], // 存储已上传的图片
        name: '', // 用于保存姓名
        discribe: '',
        price: '',
        address: '', // 用于保存地址
        phone: '', // 用于保存电话号码
        upimage: '',
        selectedItem: '',
        savedFields: {}, // 用于保存多个字段的对象
        currentIndex: 0,
      };
     
    },
    

    
    created() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const currentDate = new Date();
      this.formattedDate = currentDate.toLocaleDateString(undefined, options);
    },

    computed: {
    currentImage() {
      return this.uploadedImages[this.currentIndex];
    }
  },


    methods:{
      prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.uploadedImages.length) % this.uploadedImages.length;
      },
      nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.uploadedImages.length;
      },
      openFileInput() {
      // 点击按钮时触发文件上传输入框的点击事件
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.uploadedImages=[];
      this.currentIndex = 0;
      const files = event.target.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.uploadedImages.push(e.target.result); // 添加新选择的图片
          };
          reader.readAsDataURL(files[i]);
        }
        // 重置文件上传输入框的值，以允许再次选择相同的文件
        event.target.value = null;
      }
    },

    saveFields() {
      // 当用户点击保存按钮时，将用户输入的字段保存到 savedFields 对象中

      this.savedFields.name = this.name;
      this.savedFields.describe = this.describe;
      this.savedFields.price = this.price;
      this.savedFields.address = this.address;
      this.savedFields.phone = this.phone;
      this.savedFields.selectedItem = this.selectedItem;
      
      // 清空输入框以便用户输入下一组字段
      this.name = '';
      this.discribe = '';
      this.price = '';
      this.address = '';
      this.phone = '';
      this.selectedItem = '';
    },

    },
  };



</script>

<style>
.up-choosephoto{
  position: absolute;
  top: 250px;
  margin-left: 30%;
  height: 300px;
  width: 450px;
  display: flex;
}

.pre{
  position: absolute;
    width: 140px;
    height: 40px;
    left: 520px;
    
    top:580px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 130%;
    /* identical to box height, or 26px */
    display: flex;
    
    align-items: center;
    justify-content: center; /* 水平居中对齐文本 */
    text-align: center;
    border-radius: 20px;
}

.nex{
  position: absolute;
    width: 150px;
    height: 40px;
    left: 710px;
    top:580px;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 130%;
    /* identical to box height, or 26px */
    display: flex;
    
    align-items: center;
    justify-content: center; /* 水平居中对齐文本 */
    text-align: center;
    border-radius: 20px;
}

.imagechange{
  position: absolute;
  top: 250px;
  margin-left: 30%;
  height: 300px;
  width: 450px;
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
.back-button {
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


.blankphoto{
  position: absolute;
  width: 300px;
  height: 200px;
  left: 400px;
  object-fit: contain; 
}


.utext1{
  margin-top:400px;
  margin-left: 200px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

.ttext2{
  margin-top:20px;
  margin-left:200px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}
.ttext3{
  margin-top: 10px;
  margin-left:200px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

.pxb{
  height: 5px;
}


.vname{
  width: 300px;
  height: 40px;
  margin-left: 200px;
  border-radius: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}
.vdescribe{
  width: 500px;
  height: 270px;
  
  margin-left: 200px;
  border-radius: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 200%;
  border: 2px solid black;
  text-align: start;
  
}

.vprice{
  width: 300px;
  height: 40px;
  
  margin-left: 200px;
  border-radius: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}

.vphone{
  width: 300px;
  height: 40px;
 
  margin-left: 200px;
  border-radius: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}
nav ul {
  list-style-type: none; /* 去掉列表项的标记（点点） */
}


.vaddress{
  width: 300px;
  height: 40px;
 
  margin-left: 200px;
  border-radius: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}
.vstate{
  width: 300px;
  height: 40px;
 
  margin-left: 200px;
  border-radius: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}
.savebutton{
  position: absolute;
  width: 100px;
  height: 50px;
  margin-top:50px;
  margin-left:75%;
  object-fit: contain; 
  border-radius: 10px;
  text-align: center;
}
.blankb{
  height: 100px;
}

</style>

