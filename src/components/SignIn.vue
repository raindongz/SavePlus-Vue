<template>
  <div class="page-container">
    <nav>
      <ul>
        
        <RouterLink to="/">
          <button class="back-button">Back</button>
        </RouterLink>
        <RouterLink to="/p-information">
          <button class="back-button">Back</button>
        </RouterLink>
      </ul>

      <body>
        <header>
          <h1 class="produce">Welcome!</h1>
          <div class="time">
            {{ formattedDate }}
          </div>
        </header>
        <div class="divider"></div>
      </body>
      <div class="box">
        <img alt="userimg" class="userimg" src="@/assets/user1.png" />

        <div>
          <h1 class="userlogin">User Login</h1>
          <div>
            <input
              type="text"
              v-model="state.email"
              placeholder="email"
              class="signin1"
            />
          </div>
          <input
            type="password"
            v-model="state.pass"
            placeholder="Password"
            class="signin2"
          />
          <span class="validation1" v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
          <span class="validation2" v-if="v$.pass.$error">
            {{ v$.pass.$errors[0].$message }}
          </span>
          <button @click="loginUser" class="signinbutton">Login</button>
          <RouterLink to="/signup" class="tosignup">
            Click here to Sign Up</RouterLink
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import router from "./../main.js";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
const baseUrl = "/api"
export default {
  
  setup() {
    const state = reactive({
      email: "",
      pass: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required, minLength: minLength(6) },
      };
    });
    const v$ = useValidate(rules, state);

    return { state, v$ };
  },
  data() {
    return {
      email: "",
      pass: "",
      savedFields: {}, // 用于保存多个字段的对象
      userData: null,
    };
  },
  created() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date();
    this.formattedDate = currentDate.toLocaleDateString(undefined, options);
  },
  methods: {
    logInUserApiCall() {
      var md5 = require("js-md5");
      console.log("haha: " + this.state.email);
      console.log("haha: " + this.state.pass);
      // Store hash in your password DB.
      const requestData = {
        email: this.state.email,
        password: md5(this.state.pass),
      };
      const instance = axios.create();
      instance
        .post(baseUrl + "/user/login", requestData, {
          headers: {
            Authorization: null,
          },
        })
        .then((response) => {
          if (response.statusText == "OK") {
            const token = JSON.stringify(response.data.accessToken);
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + JSON.parse(token);
            router.push("/");
          }
          this.userData = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.email = "";
          this.pass = "";
        });
    },
    loginUser() {
      this.v$.$validate();
      if (this.v$.$errors.length == 0) {
        this.logInUserApiCall();
      }
    },
  },
};
</script>

<style>
.produce {
  position: absolute;
  width: 227px;
  height: 77px;
  left: 100px;
  top: 200px;

  font-family: "Newsreader";
  font-style: normal;
  font-weight: 400;
  font-size: 43px;
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
  margin-top: 75px;

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
.box {
  position: relative;
  height: 350px;
  width: 600px;
  margin-top: 50px;
  margin-left: 30%;

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
  font-size: 25px;
}

.signin1 {
  position: absolute;
  height: 25px;
  width: 200px;
  margin-left: 330px;
  margin-top: 100px;
  border-radius: 30px;
  background-color: bisque;
  text-align: center;
  border: 0;
  transition: background-color 0.3s;
}
.validation1 {
  position: absolute;
  height: 25px;
  width: 200px;
  margin-left: 550px;
  margin-top: 100px;
  border-radius: 30px;
  border: 0;
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

.signin2 {
  position: absolute;
  height: 25px;
  width: 200px;
  margin-left: 330px;
  margin-top: 155px;
  border-radius: 30px;
  background-color: bisque;
  text-align: center;
  border: 0;
  transition: background-color 0.3s;
}

.validation2 {
  position: absolute;
  height: 25px;
  width: 200px;
  margin-left: 550px;
  margin-top: 155px;
  border-radius: 30px;
  border: 0;
}

.signin2:focus {
  background-color: #fff; /* 点击输入框时背景颜色变为白色 */
}

.signinbutton {
  position: absolute;
  height: 25px;
  width: 205px;
  margin-left: 330px;
  margin-top: 220px;
  border-radius: 20px;
}

.tosignup {
  position: absolute;
  color: orange;
  margin-left: 362px;
  margin-top: 320px;
}

.tosignup:hover {
  color: rgba(255, 166, 0, 0.649);
}

</style>
