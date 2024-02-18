<template>
  <div class="page-container">
    <nav>
      <ul>
       
        <RouterLink to="/"
          ><li><a href="shop" class="shop">Home</a></li></RouterLink
        >
        <li><a href="My profile" class="Myprofile">My profile</a></li>
        <RouterLink to="/signin">
          <button class="back-button">Back</button>
        </RouterLink>
      </ul>
    </nav>

    <body>
      <header>
        <h1 class="produce">Sign Up</h1>
        <div class="time">
          {{ formattedDate }}
        </div>
      </header>
      <div class="divider"></div>
    </body>

    <div>
      <div>
        <h1 class="findJ">Find Joy in SAFEPLUS: Affordable and Yours</h1>
      </div>

      <div>
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="signup1"
        />
      </div>

      <div>
        <input
          type="text"
          v-model="phone"
          placeholder="Phone number"
          class="signup1"
        />
      </div>

      <div>
        <input
          type="text"
          v-model="email"
          placeholder="Email address"
          class="signup1"
        />
      </div>

      <div>
        <div class="signup1">
          <input type="radio" id="zero" value="0" v-model="gender" />
          <label for="zero">Male</label>
          <input type="radio" id="one" value="1" v-model="gender" />
          <label for="one">Female</label>
        </div>
      </div>
      <div>
        <input
          type="password"
          v-model="createpass"
          placeholder="Create password"
          class="signup1"
        />
      </div>

      <div>
        <input
          type="password"
          v-model="confirmpass"
          placeholder="Confirm password"
          class="signup1"
        />
      </div>

      <button @click="comparePasswords" class="savebutton">Sign Up</button>
      <!-- <div v-if="showMessage">
        <div v-if="passwordsMatch"></div>
            <div v-else class="conpas">Passwords do not match.</div>
        </div> -->
    </div>
  </div>

  <body class="blankb"></body>
</template>

<script>
import axios from "axios";
import router from "./../main.js";
export default {
  data() {
    return {
      formattedDate: "",
      uploadedImages: [], // 存储已上传的图片
      firstname: "", // 用于保存姓名
      lastname: "",
      username: "",
      phone: "",
      email: "",
      createpass: "",
      confirmpass: "",
      address: "",
      gender: 0,
      passwordsMatch: false,
      showMessage: false,
      savedFields: {}, // 用于保存多个字段的对象
    };
  },
  created() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date();
    this.formattedDate = currentDate.toLocaleDateString(undefined, options);
  },
  methods: {
    openFileInput() {
      // 点击按钮时触发文件上传输入框的点击事件
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
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

    submitFields() {
      // 当用户点击保存按钮时，将用户输入的字段保存到 savedFields 对象中
      const baseUrl = "http://api.saveplus.link";
      var md5 = require("js-md5");

      axios
        .post(baseUrl + "/user/create", {
          username: this.username,
          password: md5(this.createpass),
          email: this.email,
          phone: this.phone,
          gender: 1,
          // avatar: "www.baidu.com",
        })
        .then(function (response) {
          if (response.statusText == "OK") {
            router.push("/signin");
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      // 清空输入框以便用户输入下一组字段
      this.username = "";
      this.email = "";
      this.confirmpass = "";
      this.createpass = "";
      this.phone = "";
    },

    comparePasswords() {
      // 检查密码是否匹配
      if (this.confirmpass === this.createpass) {
        this.passwordsMatch = true;
        this.showMessage = false;
        this.submitFields();
      } else {
        this.passwordsMatch = false;
        this.showMessage = true;
      }
    },
  },
};
</script>

<style>
nav ul {
  list-style-type: none; /* 去掉列表项的标记（点点） */
}
.logo {
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

  font-family: "Inter";
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
.Myprofile {
  position: absolute;
  width: 76px;
  height: 21px;
  right: 270px;
  top: 45px;

  font-family: "Inter";
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
  font-family: "Inter";
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
}
button:hover {
  background-color: rgba(255, 166, 0, 0.649);
}

.divider {
  height: 2px; /* 设置分隔线的高度 */
  background-color: #e6e6e6; /* 设置分隔线的背景颜色 */
  margin: 100px; /* 可选：设置分隔线上下的间距 */
}
.show {
  position: absolute;
  width: 300px;
  height: 330px;
  background-color: #e6e6e6;
  left: 110px;
  top: 250px;
  border-radius: 10px;
}

.blankphoto {
  position: absolute;
  width: 300px;
  height: 200px;
  left: 400px;
  object-fit: contain;
}
.choose {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 200px;

  font-family: "Inter";
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

.signup1 {
  width: 300px;
  height: 40px;
  margin-top: 20px;
  margin-left: 38%;
  border-radius: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}

.savebutton {
  position: absolute;
  width: 100px;
  height: 50px;
  margin-top: 50px;
  margin-left: 45%;
  object-fit: contain;
  border-radius: 10px;
}
.blankb {
  height: 100px;
}

.findJ {
  margin-left: 25%;
}
.conpas {
  margin-left: 43%;
}
</style>
