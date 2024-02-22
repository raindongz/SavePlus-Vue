<template>
  <div class="page-container">
    <nav>
      <ul>
        <RouterLink to="/uploadPro">
          <button class="upload-button">UPLOAD</button>
        </RouterLink>
      </ul>
    </nav>

    <body>
      <header>
        <h1 class="produce">Items</h1>
        <div class="time">
          {{ formattedDate }}
        </div>
      </header>
      <div class="divider"></div>
    </body>

    <!-- <body class="show">
        <RouterLink to="/pro-info">
      
        <img class="pro1" alt="pro1" src="../assets/logo.png">
        <p class="name">Table</p>
        <p class="price">$5.99</p>
        </RouterLink>
    
    </body> -->

    <div class="product-container" v-if="dataFromServer">
      <div v-for="item in dataFromServer" :key="item.id" class="product-item">
        <RouterLink to="/pro-info">
          <img
            :src="item.images.split(',')[0]"
            alt="Product Image"
            class="product-image"
          />

          <div class="product-info">
            <h3 class="name">{{ item.title }}</h3>
            <p class="price">${{ item.total_price }}</p>
            <span class="address">{{ item.area }}</span>
          </div>
        </RouterLink>
        <div class="thr">
          <button
            class="team1"
            @click="
              $router.push({ name: 'createProduct', state: { id: item.id } })
            "
          >
            Update
          </button>
          <button class="team1">Sold out</button>
          <button class="team1" @click="deletData(item.id)">Delet</button>
        </div>
      </div>
    </div>

    <div v-else>
      <div></div>
    </div>
    <div class="col-md-12">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(currentPage - 1)"
              tabindex="-1"
              >Previous</a
            >
          </li>
          <!-- 动态生成分页项，这里只是示例 -->

          <a class="page-link" href="#">{{ currentPage }}</a>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(currentPage + 1)"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>

    <body class="test"></body>
  </div>
</template>

<script>
// import { getProductList } from "@/utils/product.info";
import axios from "axios";
import { getProductHis } from "@/utils/product.info";
import { DeletProduct } from "@/utils/product.info";
export default {
  data() {
    return {
      formattedDate: "",
      productList1: null,
      testimg: "../assets/logo.png",
      dataFromServer: null,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页数据量
      totalPages: 3,
    };
  },
  created() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date();
    this.formattedDate = currentDate.toLocaleDateString(undefined, options);
  },
  methods: {
    saveFields() {
      this.savedFields.username = this.username;
      this.savedFields.pass = this.pass;

      this.username = "";
      this.pass = "";
    },
    deletData(item_id) {
      DeletProduct(item_id)
        .then((response) => {
          console.log("Product deleted successfully", response);
        })
        .catch((error) => {
          console.error("Request error:", error);
        });
      this.getData();
    },
    getData() {
      getProductHis()
        .then((response) => {
          this.dataFromServer = response.data.post_list;
        })
        .catch((error) => {
          console.error("Request error:", error);
        });
    },
    changePage(pageNum) {
      this.dataFromServer = null;
      this.currentPage = pageNum;
      this.getData();
    },
  },

  mounted() {
    this.getData(); // 在组件挂载后调用获取数据的方法
  },
};
</script>

<style scoped>
.team1 {
  border: 0.2px solid black;
  border-radius: 8px;
}
.thr {
  position: absolute;
  right: 0;
  bottom: 0;
}
.show {
  width: 300px;
  height: 330px;
  background-color: #e6e6e6;

  border-radius: 10px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  /* 允许产品项换行 */
}

.product-item {
  width: calc(33.33% - 10px);
  /* 每行显示三个产品项，减去间距 */
  margin-bottom: 50px;
  /* 设置产品项之间的垂直间距 */
  margin-left: 100px;
  margin-right: 60px;

  width: 300px;
  height: 330px;
  background-color: #e6e6e6;
  position: relative;
}

@media (max-width: 768px) {
  .product-item {
    width: calc(50% - 10px);
    /* 在小屏设备上每行显示两个产品项 */
  }
}

@media (max-width: 480px) {
  .product-item {
    width: 100%;
    /* 在超小屏幕设备上每行只显示一个产品项 */
  }
}

/* .product-item {
  display: flex;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 300px;
   height: 330px;
   background-color: #E6E6E6;
} */

.product-image {
  position: absolute;
  width: 300px;
  height: 200px;
  object-fit: contain;
}

/* 在每三个商品后添加换行 */
/* .product-item:nth-child(3n+1) {
  clear: both;
} */

.product-item:hover {
  background-color: orange;
  /* 鼠标悬停时的背景颜色 */
}

nav ul {
  list-style-type: none;
  /* 去掉列表项的标记（点点） */
}

.logo {
  width: 125px;
  /* 修改图片宽度 */
  height: auto;
  /* 保持高度与宽度的比例 */
  margin-left: 50px;
  margin-top: 15px;
  display: block;
  /* 让图片居中生效 */
  backdrop-filter: blur(2px);
}

.shop:hover,
.Myprofile:hover {
  color: orange;
  /* 鼠标悬停时的颜色 */
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
.upload-button {
  position: absolute;
  /* 将元素定位为绝对定位 */
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
  justify-content: center;
  /* 水平居中对齐文本 */
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
  height: 2px;
  /* 设置分隔线的高度 */
  background-color: #e6e6e6;
  /* 设置分隔线的背景颜色 */
  margin: 100px;
  /* 可选：设置分隔线上下的间距 */
}

.pro1 {
  position: absolute;
  width: 300px;
  height: 200px;
  object-fit: contain;
}

.name {
  position: absolute;
  width: 162px;
  height: 26px;
  left: 24px;
  top: 220px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;

  color: #000000;
}

.address {
  position: absolute;
  width: 162px;
  height: 26px;
  left: 24px;
  top: 290px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;

  color: #000000;
}

.price {
  position: absolute;
  width: 57px;
  height: 26px;
  left: 24px;
  top: 245px;
  margin-top: 10px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  /* identical to box height, or 26px */

  color: #426b1f;
}

.test {
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
