<template>
  <div class="page-container">
    <nav>
      <ul>
        <img class="logo" alt="saveplus logo" src="@/assets/logo.png" />
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
          v-model="state.username"
          placeholder="Username"
          class="signup1"
        />
        <span v-if="v$.username.$error">
          {{ v$.username.$errors[0].$message }}
        </span>
      </div>

      <div>
        <input
          type="text"
          v-model="state.phone"
          placeholder="Phone number"
          class="signup1"
        />
        <span v-if="v$.phone.$error">
          {{ v$.phone.$errors[0].$message }}
        </span>
      </div>

      <div>
        <input
          type="text"
          v-model="state.email"
          placeholder="Email address"
          class="signup1"
        />
        <span v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
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
          v-model="state.createpass"
          placeholder="Create password"
          class="signup1"
        />
        <span v-if="v$.createpass.$error">
          {{ v$.createpass.$errors[0].$message }}
        </span>
      </div>

      <div>
        <input
          type="password"
          v-model="state.confirmpass"
          placeholder="Confirm password"
          class="signup1"
        />
        <span v-if="v$.confirmpass.$error">
          {{ v$.confirmpass.$errors[0].$message }}
        </span>
      </div>

      <button @click="comparePasswords" class="savebutton">Sign Up</button>
      <div v-if="showMessage">
        <div v-if="passwordsMatch"></div>
        <div v-else class="conpas">Passwords do not match.</div>
      </div>
    </div>
  </div>

  <body class="blankb"></body>
</template>

<script>
import axios from "axios";
import router from "./../main.js";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      username: "",
      phone: "",
      email: "",
      createpass: "",
      confirmpass: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        phone: { required },
        username: { required },
        createpass: { required, minLength: minLength(6) },
        confirmpass: { required, minLength: minLength(6) },
      };
    });
    const v$ = useValidate(rules, state);

    return { state, v$ };
  },
  data() {
    return {
      formattedDate: "",
      uploadedImages: [], // 存储已上传的图片
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
  // validations() {
  //   return {
  //     username: { required },
  //     email: { required },
  //     createpass: { required },
  //     confirmpass: { required },
  //     phone: { required },
  //   };
  // },
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

    signupRequest() {
      // 当用户点击保存按钮时，将用户输入的字段保存到 savedFields 对象中
      var md5 = require("js-md5");

      const instance = axios.create();
      instance
        .post("/user/create", {
          username: this.state.username,
          password: md5(this.state.createpass),
          email: this.state.email,
          phone: this.state.phone,
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
    submitFields() {
      this.v$.$validate();
      if (this.v$.$errors.length == 0) {
        this.signupRequest();
      }
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
.produce {
  position: absolute;
  width: 227px;
  height: 77px;
  left: 100px;
  top: 110px;

  font-family: "Newsreader";
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
.time {
  position: absolute;
  width: 300px;
  height: 26px;
  left: 347px;
  top: 190px;

  font-family: "Inter";
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
