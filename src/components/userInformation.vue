<template>
  <div class="page-container">
    <nav>
      <ul>
        <RouterLink to="/">
          <button class="upload-button">Shop</button>
        </RouterLink>
      </ul>
    </nav>
  </div>

  <div>
    <img alt="userimg" class="uinform" src="@/assets/user.png" />
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
    <RouterLink to="/interest">
      <button class="in-interst">Interst List</button>
    </RouterLink>
  </div>
  <div class="allblank">
    <div v-if="edit">
      <div>
        <input type="text" v-model="fullname" placeholder="Name" class="i-t" />
      </div>

      <div>
        <input
          type="text"
          v-model="phone"
          placeholder="Phone number"
          class="i-t"
        />
      </div>

      <div>
        <input
          type="text"
          v-model="email"
          placeholder="Email address"
          class="i-t"
        />
      </div>
      <button @click="saveFields" class="i-savebutton">Save</button>
    </div>
    <div v-else>
      <div>
        <input
          type="text"
          disabled
          v-model="fullname"
          placeholder="Name"
          class="i-t"
        />
      </div>

      <div>
        <input
          type="text"
          disabled
          v-model="phone"
          placeholder="Phone number"
          class="i-t"
        />
      </div>

      <div>
        <input
          type="text"
          disabled
          v-model="email"
          placeholder="Email address"
          class="i-t"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullname: "",
      phone: "",
      email: "",
      avatar: "",
      edit: false,

      savedFields: {}, // 用于保存多个字段的对象
    };
  },

  beforeMount() {
    console.log("hello ");
    const requestData = {};
    const instance = axios.create();
    instance
      .post("api/user/getUserInfo", requestData)
      .then((response) => {
        if (response.statusText === "OK" || response.status === 200) {
          console.log(response.data);
          (this.fullname = response.data.user_info.full_name),
            (this.phone = response.data.user_info.phone),
            (this.email = response.data.user_info.email),
            (this.avatar = response.data.user_info.avatar);
        } else if (response.status == 401) {
          localStorage.clear();
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  },

  methods: {
    saveFields() {
      // 当用户点击保存按钮时，将用户输入的字段保存到 savedFields 对象中
      this.savedFields.firstname = this.firstname;
      this.savedFields.lastname = this.lastname;

      this.savedFields.email = this.email;
      this.savedFields.phone = this.phone;

      this.savedFields.address = this.address;
      // 清空输入框以便用户输入下一组字段
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.phone = "";
      this.address = "";
    },

    handleButtonClick() {
      if (this.edit === false) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    },
  },
};
</script>

<style>
.allblank {
  margin-top: 100px;
}
.uinform {
  position: absolute;
  height: 200px;
  width: 200px;
  margin-left: 150px;
  margin-top: 50px;
}

.in-username {
  position: absolute;
  height: 200px;
  width: 200px;
  color: orange;
  font-size: 25px;
  margin-left: 375px;
  margin-top: 150px;
  font-family: "Arial";
}

.in-e {
  position: absolute; /* 将元素定位为绝对定位 */
  width: 126px;
  height: 48px;
  left: 190px;
  top: 490px;
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
  background-color: white;
  color: orange;
}

.in-e:hover {
  background-color: white;
  color: rgba(255, 166, 0, 0.649);
}
.in-m {
  position: absolute; /* 将元素定位为绝对定位 */
  width: 126px;
  height: 48px;
  left: 190px;
  top: 560px;
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

.in-u {
  position: absolute; /* 将元素定位为绝对定位 */
  width: 126px;
  height: 48px;
  left: 190px;
  top: 630px;
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

.i-t {
  width: 300px;
  height: 40px;
  margin-top: 40px;
  margin-left: 50%;
  border-radius: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
}

.in-interst {
  position: absolute; /* 将元素定位为绝对定位 */
  width: 126px;
  height: 48px;
  left: 190px;
  top: 700px;
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

.i-savebutton {
  position: absolute;
  width: 100px;
  height: 50px;
  margin-top: 50px;
  margin-left: 57%;
  object-fit: contain;
  border-radius: 10px;
}
</style>
