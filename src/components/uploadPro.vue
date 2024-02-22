<template>
  <div class="page-container">
    <nav>
      <ul>
        <li><RouterLink to="/" class="shop">Home</RouterLink></li>

        <li>
          <RouterLink to="/p-information" class="Myprofile"
            >My profile</RouterLink
          >
        </li>
        <RouterLink to="/produceUp">
          <button class="back-button">Back</button>
        </RouterLink>
      </ul>
    </nav>

    <body>
      <header>
        <h1 class="produce">Product</h1>
        <div class="time">
          {{ formattedDate }}
        </div>
      </header>
      <div class="divider"></div>
    </body>

    <div class="image-container">
      <img
        @click="openFileInput"
        src="@/assets/upload.png"
        class="imagechange"
      />

      <input
        type="file"
        id="fileInput"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        multiple
        style="display: none"
      />
      <!-- <div v-for="(image, index) in uploadedImages" :key="index" class="image-wrapper">
      <img :src="image" alt="Uploaded Image"  class="up-choosephoto" />
    </div> -->

      <!-- <img
        v-if="uploadedImages.length > 0"
        @click="openFileInput"
        :src="uploadedImages[0]"
        alt="Uploaded Image"
        class="up-choosephoto"
      /> -->

      <img
        v-if="uploadedImages.length > 0"
        @click="openFileInput"
        :src="currentImage"
        alt="Uploaded Image"
        class="up-choosephoto"
      />
      <button @click="prevImage" class="pre">Previous</button>
      <button @click="nextImage" class="nex">Next</button>
    </div>

    <div>
      <div>
        <h1 class="utext1">Title:</h1>
      </div>
      <div>
        <input
          type="text"
          v-model="this.state.title"
          placeholder="Enter title..."
          class="vname"
        />
        <span class="warn" v-if="v$.title.$error">
          {{ v$.title.$errors[0].$message }}
        </span>
      </div>
      <div>
        <h1 class="ttext2">Content:</h1>
      </div>
      <div>
        <textarea
          type="text"
          v-model="this.state.content"
          placeholder="Enter description..."
          class="vdescribe"
        />
        <span class="warn" v-if="v$.content.$error">
          {{ v$.content.$errors[0].$message }}
        </span>
      </div>
      <div>
        <h1 class="ttext2">TotalPrice:</h1>
      </div>
      <div>
        <input
          type="text"
          v-model="this.state.price"
          placeholder="Enter price..."
          class="vprice"
        />
        <span class="warn" v-if="v$.price.$error">
          {{ v$.price.$errors[0].$message }}
        </span>
      </div>
      <div>
        <label for="selectItem" class="ttext3">Delivery Method:</label>
      </div>
      <div>
        <select v-model="deliveryType" id="selectItem" class="vstate">
          <option value="0">Local Pick Up</option>
          <option value="1">mail</option>
        </select>
      </div>
      <div>
        <label for="selectItem" class="ttext3">Negotiable:</label>
      </div>
      <div>
        <select v-model="nigotiable" id="selectItem" class="vstate">
          <option value="0">nigotiable</option>
          <option value="1">not nigotiable</option>
        </select>
      </div>
      <div>
        <h1 class="ttext2">Area:</h1>
      </div>
      <div>
        <input
          type="text"
          v-model="this.state.area"
          placeholder="Enter area..."
          class="vaddress"
        />
        <span class="warn" v-if="v$.area.$error">
          {{ v$.area.$errors[0].$message }}
        </span>
      </div>
      <div>
        <h1 class="ttext2">Item Num:</h1>
      </div>
      <div>
        <input
          type="number"
          v-model="itemNum"
          placeholder="Enter Item Number..."
          class="vaddress"
        />
      </div>
      <body class="pxb"></body>
      <button @click="createOrUpdateInfo" class="savebutton">Save</button>
    </div>
  </div>

  <body class="blankb"></body>
</template>

<script>
import { app } from "./../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage, ref } from "firebase/storage";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import {
  createPost,
  updatePost,
  getPostInfo,
} from "@/utils/product.operations.js";
// import ToastMsg from "@/components/tools/ToastMsg.vue";
import router from "./../main.js";
// import { toRaw } from "vue";

export default {
  setup() {
    const state = reactive({
      postId: null,
      title: "", // 用于保存姓名
      content: "",
      area: "",
      price: "",
    });
    const rules = computed(() => {
      return {
        title: { required, minLength: minLength(6) },
        content: { required, minLength: minLength(6) },
        area: { required, minLength: minLength(2) },
        price: { required, minLength: minLength(1) },
      };
    });
    const v$ = useValidate(rules, state);

    return { state, v$ };
  },
  data() {
    return {
      postId: null,
      formattedDate: "",
      uploadedImages: [], // 存储已上传的图片
      title: "", // 用于保存姓名
      content: "",
      area: "",
      price: "",
      itemNum: 1,
      deliveryType: 0,
      nigotiable: 0,

      upimage: "",
      selectedItem: "",
      savedFields: {}, // 用于保存多个字段的对象
      currentIndex: 0,
    };
  },

  created() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date();
    this.formattedDate = currentDate.toLocaleDateString(undefined, options);

    // check if this is update operation or create operation
    // if update, call get post info api to fill the post info
    if (history.state.id) {
      this.postId = history.state.id;
      this.getPostInfoReq(this.postId);
    }
  },

  computed: {
    currentImage() {
      return this.uploadedImages[this.currentIndex];
    },
  },

  methods: {
    createOrUpdateInfo() {
      if (history.state.id) {
        this.updatePostReq();
      } else {
        this.createPostReq();
      }
    },

    async getPostInfoReq(id) {
      const response = await getPostInfo(id);
      if (response.status !== 200 || !response["data"]) {
        // errorToastRef.value["showToast"]("Whoops! Something wrong!");
        console.log(" get post info error occurs");
      } else {
        const data = response.data;
        this.uploadedImages = data.images.split(",");
        this.state.postId = data.id;
        this.state.content = data.content;
        this.state.area = data.area;
        this.deliveryType = data.delivery_type;
        this.nigotiable = data.negotiable;
        this.state.title = data.title;
        this.state.price = data.total_price;
        this.itemNum = data.item_num;
        console.log(data);
      }
    },
    async updatePostReq() {
      const createPostBody = {
        post_id: this.state.postId,
        title: this.state.title,
        content: this.state.content,
        area: this.state.area,
        total_price: this.state.price,
        delivery_type: this.deliveryType,
        item_num: this.itemNum,
        post_status: 0,
        negotiable: this.nigotiable,
        images: this.uploadedImages.join(","),
      };
      this.v$.$validate();
      if (this.uploadedImages.length === 0) {
        alert("upload at least one image");
        return;
      }

      if (this.v$.$errors.length === 0) {
        console.log("this is update req:  " + createPostBody);
        try {
          const response = await createPost(createPostBody);
          console.log(response);
          if (response.status !== 200 || !response["data"]) {
            // errorToastRef.value["showToast"]("Whoops! Something wrong!");
          } else {
            router.push("/produceUp");
          }
        } catch (error) {}
        console.log(error);
      }
      // errorToastRef.value["showToast"]("Whoops! Something wrong!");
    },

    async createPostReq() {
      // let errorToastRef = ref(null);
      const createPostBody = {
        title: this.state.title,
        content: this.state.content,
        area: this.state.area,
        total_price: this.state.price,
        delivery_type: this.deliveryType,
        item_num: this.itemNum,
        post_status: 0,
        negotiable: this.nigotiable,
        images: this.uploadedImages.join(","),
      };
      this.v$.$validate();
      if (this.uploadedImages.length === 0) {
        alert("upload at least one image");
        return;
      }

      if (this.v$.$errors.length == 0) {
        console.log("this is create req :    " + createPostBody);
        const response = await createPost(createPostBody);
        console.log(response);
        if (response.status !== 200 || !response["data"]) {
          // errorToastRef.value["showToast"]("Whoops! Something wrong!");
        } else {
          router.push("/produceUp");
        }
      }
      // errorToastRef.value["showToast"]("Whoops! Something wrong!");
    },
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.uploadedImages.length) %
        this.uploadedImages.length;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.uploadedImages.length;
    },
    openFileInput() {
      // 点击按钮时触发文件上传输入框的点击事件
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.uploadedImages = [];
      this.currentIndex = 0;
      const files = event.target.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          // const reader = new FileReader();
          // reader.onload = (e) => {
          //   this.uploadedImages.push(e.target.result); // 添加新选择的图片
          // };
          // reader.readAsDataURL(files[i]);
          const file = files[i];

          //upload picture to firebase
          const fileName = new Date().getTime() + file.name;
          //const task = storageRef.child(name).put;
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                this.uploadedImages.push(downloadURL);
                console.log(this.uploadedImages);
              });
            }
          );
        }
        // console.log("hello those are: " + this.uploadedImages);
        // 重置文件上传输入框的值，以允许再次选择相同的文件
        // event.target.value = null;
      }
    },
  },
};
</script>

<style>
.warn {
  color: crimson;
}
.changenew {
  margin-top: 200px;
}
.up-choosephoto {
  position: absolute;
  top: 370px;
  margin-left: 35%;
  height: 300px;
  width: 300px;
  display: flex;
}

.pre {
  position: absolute;
  width: 140px;
  height: 40px;
  left: 300px;

  top: 500px;
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

.nex {
  position: absolute;
  width: 150px;
  height: 40px;
  left: 930px;
  top: 500px;

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

.imagechange {
  position: absolute;
  top: 370px;
  margin-left: 35%;
  height: 300px;
  width: 300px;
}

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
  border: 0;
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

.utext1 {
  margin-top: 400px;
  margin-left: 200px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

.ttext2 {
  margin-top: 20px;
  margin-left: 200px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}
.ttext3 {
  margin-top: 10px;
  margin-left: 200px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}

.pxb {
  height: 5px;
}

.vname {
  width: 300px;
  height: 40px;
  margin-left: 200px;
  border-radius: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}
.vdescribe {
  width: 500px;
  height: 270px;

  margin-left: 200px;
  border-radius: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 200%;
  border: 2px solid black;
  text-align: start;
}

.vprice {
  width: 300px;
  height: 40px;

  margin-left: 200px;
  border-radius: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}

.vphone {
  width: 300px;
  height: 40px;

  margin-left: 200px;
  border-radius: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}
nav ul {
  list-style-type: none; /* 去掉列表项的标记（点点） */
}

.vaddress {
  width: 300px;
  height: 40px;

  margin-left: 200px;
  border-radius: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: start;
}
.vstate {
  width: 300px;
  height: 40px;

  margin-left: 200px;
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
  margin-left: 75%;
  object-fit: contain;
  border-radius: 10px;
  text-align: center;
}
.blankb {
  height: 100px;
}
</style>
