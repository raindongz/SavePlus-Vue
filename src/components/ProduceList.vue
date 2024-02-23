<template>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>save plus</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta content="eCommerce HTML Template Free Download" name="keywords"/>
    <meta
        content="eCommerce HTML Template Free Download"
        name="description"
    />

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400|Source+Code+Pro:700,900&display=swap"
        rel="stylesheet"
    />

    <!-- CSS Libraries -->
    <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        rel="stylesheet"
    />
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
    />
    <!-- <link href="lib/slick/slick.css" rel="stylesheet" />
    <link href="lib/slick/slick-theme.css" rel="stylesheet" /> -->

    <!-- Template Stylesheet -->
    <!-- <link href="css/style.css" rel="stylesheet" /> -->
  </head>

  <body>
  <!-- Bottom Bar Start -->
  <div class="bottom-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="search">
            <input type="text" placeholder="Search"/>
            <button><i class="fa fa-search"></i></button>
          </div>
        </div>

        <div v-if="token == '' || token == null">
          <RouterLink to="/signin">
            <button class="pl-signin">Sign in</button>
          </RouterLink>
        </div>
        <div v-else>
          <button @click="logout" class="pl-signin">log out</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Bottom Bar End -->

  <!-- Product List Start -->
  <div class="product-view">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8">
          <div class="row">
            <!-- product list starts here  -->
            <div
                class="col-md-4"
                v-for="item in dataFromServer"
                :key="item.id"
            >
              <div class="product-item">
                <div class="product-title">
                  <!--                  传入物品id-->
                  <router-link
                      :to="{ name: 'proInfo', query: { prod: item.id } }"
                  >{{ item.title }}
                  </router-link
                  >
                </div>

                <div class="product-image">
                  <a href="product-detail.html">
                    <img
                        :src="item.images.split(',')[0]"
                        alt="Product Image"
                    />
                  </a>

                  <div v-if="item.liked === 0" class="product-action">
                    <a @click="interest(item.id)"
                    ><i class="fa fa-heart"></i
                    ></a>
                    <a href="#"><i class="fa fa-search"></i></a>
                  </div>
                  <div v-else class="product-action1">
                    <a @click="interest(item.id)"
                    ><i class="fa fa-heart"></i
                    ></a>
                    <a href="#"><i class="fa fa-search"></i></a>
                  </div>
                  <div class="product-price">
                    <h3><span>$</span>{{ item.total_price }}</h3>

                    <h3 class="btn">{{ item.area }}</h3>
                  </div>
                </div>
                <!-- Pagination Start -->
              </div>
            </div>
          </div>
        </div>

        <!-- Side Bar Start -->
        <div class="col-lg-4 sidebar">
          <div class="sidebar-widget category">
            <h2 class="title">Category</h2>
            <nav class="navbar bg-light">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#"
                  ><i class="fa fa-female"></i>Fashion & Beauty</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"
                  ><i class="fa fa-child"></i>Kids & Babies Clothes</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"
                  ><i class="fa fa-tshirt"></i>Men & Women Clothes</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"
                  ><i class="fa fa-mobile-alt"></i>Gadgets &
                    Accessories</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"
                  ><i class="fa fa-microchip"></i>Electronics &
                    Accessories</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- Side Bar End -->

      </div>
    </div>
    <!-- Product List End -->

    <!-- Back to Top -->
    <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>

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
  </div>
  </body>
  </html>
</template>

<script>
import axios from "axios";

import {getProductList} from "@/utils/product.info";
import {interestOrUninterestPost} from "@/utils/product.operations";

export default {
  data() {
    return {
      token: JSON.parse(localStorage.getItem("token")),
      formattedDate: "",
      uploadedImages: [], // 存储已上传的图片
      name: "", // 用于保存姓名
      discribe: "",
      price: "",
      address: "321", // 用于保存地址
      phone: "", // 用于保存电话号码
      upimage: "",
      selectedItem1: "",
      selectedItem2: "",
      selectedItem3: "",
      savedFields: {}, // 用于保存多个字段的对象
      dataFromServer: null,
      currentPage: 1,
    };
  },
  created() {
    const options = {year: "numeric", month: "long", day: "numeric"};
    const currentDate = new Date();
    this.formattedDate = currentDate.toLocaleDateString(undefined, options);
  },
  methods: {
    async interest(id) {
      const body = {
        post_id: id,
      };
      const response = await interestOrUninterestPost(body);
      if (!response) {
        console.log("response undefined");
        return;
      }

      if (response.status !== 200 || !response.data) {
        console.log("response return error");
        return;
      }

      router.go();
    },
    getData() {
      getProductList(this.currentPage)
          .then((response) => {
            this.dataFromServer = response.data;
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

    logout() {
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = "";
      this.token = "";
    },
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

    saveFields() {
      // 当用户点击保存按钮时，将用户输入的字段保存到 savedFields 对象中

      this.savedFields.name = this.name;
      this.savedFields.describe = this.describe;
      this.savedFields.price = this.price;
      this.savedFields.address = this.address;
      this.savedFields.phone = this.phone;
      this.savedFields.selectedItem1 = this.selectedItem1;
      this.savedFields.selectedItem2 = this.selectedItem2;
      this.savedFields.selectedItem3 = this.selectedItem3;

      // 清空输入框以便用户输入下一组字段
      this.name = "";
      this.discribe = "";
      this.price = "";
      this.address = "";
      this.phone = "";
      this.selectedItem1 = "";
      this.selectedItem2 = "";
      this.selectedItem3 = "";
    },

    beforeMount() {
      if (localStorage.getItem("reloaded")) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem("reloaded");
      } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem("reloaded", "1");
        location.reload();
      }
    },
  },
  mounted() {
    this.getData(); // 在组件挂载后调用获取数据的方法
  },
};
</script>

<style scoped>
/* newadd */
.pl-signin {
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

.logo {
  width: 125px; /* 修改图片宽度 */
  height: auto; /* 保持高度与宽度的比例 */
  margin-left: 50px;
  margin-top: 15px;
  display: block; /* 让图片居中生效 */
  backdrop-filter: blur(2px);
}

body {
  color: #353535;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
}

a {
  color: #ff9901;
}

a:hover,
a:active,
a:focus {
  color: #353535;
  outline: none;
  text-decoration: none;
}

h1 {
  font-family: "Source Code Pro", monospace;
  font-weight: 900;
}

h2 {
  font-family: "Source Code Pro", monospace;
  font-weight: 700;
}

@media (min-width: 992px) {
  .container-fluid {
    padding-right: 60px;
    padding-left: 60px;
  }
}

/**********************************/
/********** Top Bar CSS ***********/
/**********************************/
.top-bar {
  padding: 3px 0;
  font-size: 14px;
  color: #ff9901;
  background: #000000;
}

.top-bar i {
  margin-right: 5px;
}

.top-bar .col-sm-6:first-child {
  text-align: left;
}

.top-bar .col-sm-6:last-child {
  text-align: right;
}

@media (max-width: 575.98px) {
  .top-bar {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .top-bar .col-sm-6:first-child,
  .top-bar .col-sm-6:last-child {
    text-align: center;
  }
}

/**********************************/
/*********** Nav Bar CSS **********/
/**********************************/
.nav {
  position: relative;
}

@media (min-width: 992px) {
  .nav .container-fluid {
    padding-left: 52px;
    padding-right: 52px;
  }
}

.nav .navbar {
  height: 100%;
  padding: 0;
}

.nav .dropdown-menu {
  margin-top: 0;
  border: 0;
  border-radius: 0;
  background: #ff9901;
}

.nav .dropdown-menu a.active {
  color: #353535;
  background: #f8f9fa;
}

@media (min-width: 768px) {
  .nav,
  .nav .navbar {
    background: #ff9901 !important;
  }

  .nav .navbar-brand {
    display: none;
  }

  .nav .navbar-dark a.nav-link {
    color: #ffffff;
    font-size: 14px;
    text-transform: uppercase;
  }

  .nav .navbar-dark a.nav-link:hover,
  .nav .navbar-dark a.nav-link.active {
    color: #000000;
  }
}

@media (max-width: 768px) {
  .nav {
    padding: 5px 0;
  }

  .nav,
  .nav .navbar {
    background: #000000 !important;
  }

  .nav a.nav-link {
    padding: 5px 0;
  }

  .nav .dropdown-menu {
    box-shadow: none;
  }
}

/**********************************/
/********* Bottom Bar CSS *********/
/**********************************/
.bottom-bar {
  padding: 15px 0;
  background: #ffffff;
  margin-bottom: 30px;
}

.bottom-bar .search {
  width: 100%;
}

.bottom-bar .search input[type="text"] {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  color: #666666;
  border: 1px solid #ff9901;
  border-radius: 4px;
}

.bottom-bar .search button {
  position: absolute;
  width: 40px;
  height: 38px;
  top: 1px;
  right: 16px;
  padding: 0 15px;
  border: none;
  background: none;
  color: #ff9901;
  border-radius: 0 2px 2px 0;
}

.bottom-bar .search button:hover {
  background: #ff9901;
  color: #ffffff;
}

.bottom-bar .user {
  font-size: 0;
  text-align: right;
}

.bottom-bar .user .wishlist {
  margin-right: 15px;
}

.bottom-bar .user .cart i,
.bottom-bar .user .wishlist i {
  color: #ff9901;
}

.bottom-bar .user .cart span,
.bottom-bar .user .wishlist span {
  color: #ff9901;
  font-size: 15px;
}

.bottom-bar .user .cart:hover i,
.bottom-bar .user .wishlist:hover i,
.bottom-bar .user .cart:hover span,
.bottom-bar .user .wishlist:hover span {
  color: #ffffff;
}

@media (min-width: 768px) {
  .bottom-bar {
    max-height: 90px;
  }
}

@media (max-width: 767.98px) {
  .bottom-bar .search,
  .bottom-bar .user {
    text-align: center;
    margin-bottom: 15px;
  }

  .bottom-bar .user {
    margin-bottom: 0;
  }
}

/**********************************/
/*********** Header CSS ***********/
/**********************************/
.header {
  position: relative;
}

.header .col-md-3,
.header .col-md-6 {
  margin-bottom: 30px;
}

.header .navbar {
  padding: 0;
  height: 100%;
  max-height: 400px;
  overflow: hidden;
  background: #ffffff !important;
}

.header .navbar-nav {
  width: 100%;
  padding: 15px 0;
}

.header .navbar li {
  padding: 0 30px;
  border-bottom: 1px solid #f3f6ff;
}

.header .navbar li:last-child {
  border-bottom: none;
}

.header .navbar a {
  color: #353535;
}

.header .navbar a:hover {
  color: #ff9901;
}

.header .navbar i {
  color: #ff9901;
  width: 20px;
  text-align: center;
  margin-right: 8px;
}

.header .navbar a:hover i {
  color: #353535;
}

.header-slider {
  position: relative;
  width: 100%;
}

.header-slider .header-slider-item {
  position: relative;
}

.header-slider .header-slider-caption {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ff990180;
  transition: all 0.3s;
  z-index: 1;
}

.header-slider .header-slider-caption p {
  text-align: center;
  color: #ffffff;
  font-size: 22px;
  font-family: "Source Code Pro", monospace;
  font-weight: 700;
}

.header-slider .header-slider-caption .btn {
  border-color: #ffffff;
}

.header-slider .header-slider-caption .btn i {
  margin-right: 5px;
}

.header .header-img {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  max-height: 400px;
  overflow: hidden;
  background: #ffffff;
}

.header .img-item {
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.header .img-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header .img-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #ff990180;
  transition: all 0.3s;
  opacity: 0;
}

.header .img-text:hover {
  opacity: 1;
}

.header .img-text p {
  margin: 0 0 50px 0;
  padding: 15px;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s;
}

.header .img-text:hover p {
  margin: 0;
}

/**********************************/
/********* Breadcrumb CSS *********/
/**********************************/
.breadcrumb-wrap {
  position: relative;
  width: 100%;
}

.breadcrumb-wrap .breadcrumb {
  margin: 0;
  padding: 0;
  background: transparent;
}

/**********************************/
/********** Category CSS **********/
/**********************************/
.category {
  position: relative;
  padding: 0 15px;
  margin-bottom: 30px;
}

.category .col-md-3 {
  padding: 0;
}

.category .category-item {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  max-height: 400px;
  overflow: hidden;
  background: #ffffff;
}

.category .category-item.ch-400 {
  height: 400px;
}

.category .category-item.ch-250 {
  height: 250px;
}

.category .category-item.ch-150 {
  height: 150px;
}

.category .category-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category .category-name {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #ff990180;
  transition: all 0.3s;
  opacity: 0;
}

.category .category-name:hover {
  opacity: 1;
}

.category .category-name p {
  margin: 0 0 50px 0;
  padding: 15px;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s;
}

.category .category-name:hover p {
  margin: 0;
}

/**********************************/
/*********** Feature CSS **********/
/**********************************/
.feature {
  position: relative;
}

.feature .feature-col {
  margin-bottom: 30px;
}

.feature .feature-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px 15px;
  text-align: center;
  background: #ffffff;
}

.feature .feature-content i {
  color: #ff9901;
  font-size: 60px;
  margin-bottom: 30px;
}

.feature .feature-content h2 {
  font-size: 18px;
}

.feature .feature-content p {
  font-size: 15px;
  margin: 0;
}

/**********************************/
/******** Product Item CSS ********/
/**********************************/
.product-item {
  position: relative;
}

.product-item .product-title {
  padding: 15px;
  text-align: center;
  background: #000000;
  transition: all 0.3s;
}

.product-item:hover .product-title {
  background: #ff9901;
}

.product-item .product-title a,
.product-item .product-title .ratting {
  position: relative;
  width: 100%;
}

.product-item .product-title a {
  margin-bottom: 5px;
  color: #ffffff;
  font-size: 18px;
}

.product-item .product-title .ratting i {
  font-size: 14px;
  color: #ff9901;
}

.product-item .product-content .price span {
  margin-left: 12px;
  text-decoration: line-through;
  font-weight: 700;
  color: #999999;
}

.product-item:hover .product-title a,
.product-item:hover .product-title .ratting i {
  color: #ffffff;
}

.product-item:hover .product-content .price span {
  color: #dddddd;
}

.product-item .product-image {
  position: relative;
  overflow: hidden;
}

.product-item .product-image a {
  display: block;
  background: #ffffff;
  transition: 0.3s;
}

.product-item .product-image img {
  width: 100%;
  transition: all 0.3s;
}

.product-item:hover .product-image img {
  transform: scale(1.2);
}

.product-item .product-image .product-action {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff990180;
  transition: all 0.3s;
  font-size: 0;
  z-index: 1;
  opacity: 0;
}

.product-item:hover .product-image .product-action {
  opacity: 1;
}

.product-item:hover .product-image .product-action1 {
  opacity: 1;
}

.product-item .product-image .product-action a {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  padding: 7px 0 10px 0;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  background: #ff9901;
  border: 1px solid #ffffff;
  border-radius: 4px;
  transition: all 0.3s;
  margin-top: 50px;
}

.product-item .product-image .product-action1 {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  padding: 7px 0 10px 0;
  font-size: 16px;
  text-align: center;
  color: #ff9901;
  background: #ffffff;
  border: 1px solid #ff9901;
  border-radius: 4px;
  transition: all 0.3s;
  margin-top: 50px;
}

.product-item:hover .product-image .product-action a {
  margin-top: 0;
}

.product-item .product-image .product-action a:last-child {
  margin-right: 0;
}

.product-item:hover .product-image .product-action1 a {
  margin-top: 0;
}

.product-item .product-image .product-action1 a:last-child {
  margin-right: 0;
}

.product-item .product-image .product-action a:hover {
  color: #ff9901;
  background: #ffffff;
  border: 1px solid #ff9901;
}

.product-item .product-image .product-action1 a:hover {
  color: #ffffff;
  background: #ff9901;
  border: 1px solid #ffffff;
}

.product-item .product-price {
  padding: 20px;
  background: #000000;
  transition: all 0.3s;
}

.product-item:hover .product-price {
  background: #ff9901;
}

.product-item .product-price h3 {
  display: inline-block;
  color: #ffffff;
  margin: 0;
}

.product-item .product-price h3 span {
  font-size: 16px;
}

.product-item .product-price .btn {
  float: right;
  border: none;
  color: #000000;
  background: #ff9901;
}

.product-item:hover .product-price .btn,
.product-item .product-price .btn:hover {
  color: #ff9901;
  background: #ffffff;
}

.product-item .product-price .btn i {
  margin-right: 5px;
}

/**********************************/
/******** Featured Product ********/
/**********************************/
.featured-product {
  position: relative;
  padding: 30px 0;
}

.recent-product {
  position: relative;
  padding: 30px 0;
}

.product .section-header {
  margin-bottom: 30px;
  padding: 20px 30px 15px 30px;
  color: #ff9901;
  background: #ffffff;
}

.product .slick-prev,
.product .slick-next {
  top: -75px;
  width: 30px;
  height: 30px;
  z-index: 1;
  transition: 0.5s;
  color: #ff9901;
  background: #ffffff;
  border: 1px solid #ff9901;
  border-radius: 4px;
}

.product .slick-prev {
  left: calc(100% - 120px);
}

.product .slick-next {
  right: 45px;
}

.product .slick-prev:hover,
.product .slick-prev:focus,
.product .slick-next:hover,
.product .slick-next:focus {
  background: #ff9901;
}

.product .slick-prev::before,
.product .slick-next::before {
  font-family: "Font Awesome 5 Free";
  font-size: 18px;
  font-weight: 900;
  color: #ff9901;
}

.product .slick-prev::before {
  content: "\f104";
}

.product .slick-next::before {
  content: "\f105";
}

.product .slick-prev:hover::before,
.product .slick-prev:focus::before,
.product .slick-next:hover::before,
.product .slick-next:focus::before {
  color: #ffffff;
}

/**********************************/
/******** Product View CSS ********/
/**********************************/
.product-view {
  position: relative;
  width: 100%;
  padding: 30px 0;
}

.product-view .product-view-top {
  padding: 30px;
  margin-bottom: 30px;
  background: #ffffff;
}

.product-view .product-search {
  position: relative;
  width: 100%;
}

.product-view .product-search input {
  width: 100%;
  height: 35px;
  padding: 0 15px;
  color: #999999;
  background: transparent;
  border: 1px solid #353535;
  border-radius: 4px;
  transition: all 0.3s;
}

.product-view .product-search input:focus {
  border-color: #ff9901;
}

.product-view .product-search button {
  position: absolute;
  width: 35px;
  height: 33px;
  top: 1px;
  right: 1px;
  text-align: center;
  background: transparent;
  color: #353535;
  border: none;
  border-radius: 0 4px 4px 0;
  transition: all 0.3s;
}

.product-view .product-search button i {
  font-size: 16px;
}

.product-view .product-search button:hover {
  background: #ff9901;
  color: #ffffff;
}

.product-view .product-short,
.product-view .product-price-range {
  position: relative;
  width: 100%;
  text-align: right;
}

.product-view .product-short .dropdown .dropdown-toggle,
.product-view .product-price-range .dropdown .dropdown-toggle {
  display: block;
  width: 100%;
  height: 35px;
  padding: 5px 10px;
  background: transparent;
  border: 1px solid #353535;
  text-align: left;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.product-view .product-short .dropdown .dropdown-toggle:hover,
.product-view .product-price-range .dropdown .dropdown-toggle:hover {
  color: #ff9901;
  border-color: #ff9901;
}

.product-view .product-short .dropdown .dropdown-toggle::after,
.product-view .product-price-range .dropdown .dropdown-toggle::after {
  float: right;
  margin-top: 10px;
}

.product-view .product-short .dropdown-menu,
.product-view .product-price-range .dropdown-menu {
  margin: -1px 0 0 0;
  border-radius: 0;
}

.product-view .product-item {
  margin-bottom: 30px;
}

.product-view .pagination {
  margin: 0;
}

.product-view .pagination .page-item .page-link {
  color: #353535;
  background: transparent;
  border-color: #353535;
}

.product-view .pagination .page-item:hover .page-link,
.product-view .pagination .page-item.active .page-link {
  color: #ff9901;
  background: #000000;
}

@media (max-width: 991.98px) {
  .product-view .pagination {
    margin-bottom: 30px;
  }
}

/**********************************/
/********** Category CSS **********/
/**********************************/
.category {
  position: relative;
  padding: 0 15px;
  margin-bottom: 30px;
}

.category .col-md-3 {
  padding: 0;
}

.category .category-item {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  max-height: 400px;
  overflow: hidden;
  background: #ffffff;
}

.category .category-item.ch-400 {
  height: 400px;
}

.category .category-item.ch-250 {
  height: 250px;
}

.category .category-item.ch-150 {
  height: 150px;
}

.category .category-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category .category-name {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #ff990180;
  transition: all 0.3s;
  opacity: 0;
}

.category .category-name:hover {
  opacity: 1;
}

.category .category-name p {
  margin: 0 0 50px 0;
  padding: 15px;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s;
}

.category .category-name:hover p {
  margin: 0;
}

/**********************************/
/******* Call to Action CSS *******/
/**********************************/
.call-to-action {
  position: relative;
  padding: 30px 0;
  background: #ff9901;
}

.call-to-action .col-md-6:last-child {
  text-align: right;
}

.call-to-action h1 {
  color: #ffffff;
  font-size: 30px;
  margin: 0;
}

.call-to-action a {
  display: inline-block;
  padding: 0 20px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: #ffffff;
  font-size: 30px;
  letter-spacing: 2px;
  transition: all 0.3s;
}

.call-to-action a:hover {
  color: #000000;
  border-color: #000000;
}

@media (max-width: 767.98px) {
  .call-to-action,
  .call-to-action .col-md-6:last-child {
    text-align: center;
  }

  .call-to-action h1 {
    margin-bottom: 20px;
  }
}

/**********************************/
/********* Newsletter CSS *********/
/**********************************/
.newsletter {
  position: relative;
  padding: 30px 0;
  background: #ff9901;
}

.newsletter h1 {
  color: #ffffff;
  font-size: 30px;
  margin: 0;
}

.newsletter .form {
  position: relative;
  max-width: 400px;
  margin: 0 0 0 auto;
}

.newsletter .form input {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  color: #666666;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

.newsletter .form button {
  position: absolute;
  width: 80px;
  height: 40px;
  top: 0;
  right: 0;
  padding: 0 15px;
  border: none;
  background: #ff9901;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 0 4px 4px 0;
}

.newsletter .form button:hover {
  color: #ff9901;
  background: #000000;
}

@media (max-width: 767.98px) {
  .newsletter {
    text-align: center;
  }

  .newsletter h1 {
    margin-bottom: 20px;
  }

  .newsletter .form {
    margin: 0 auto;
  }
}

/**********************************/
/********** Footer CSS ************/
/**********************************/
.footer {
  position: relative;
  padding: 30px 0 0 0;
  background: #ffffff;
}

.footer .footer-widget {
  position: relative;
  width: 100%;
  margin-bottom: 30px;
}

.footer .footer-widget h2 {
  font-size: 25px;
  white-space: nowrap;
  margin-bottom: 20px;
}

.footer .footer-widget ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer .footer-widget ul li {
  margin-bottom: 12px;
}

.footer .footer-widget ul li:last-child {
  margin-bottom: 0;
}

.footer .footer-widget ul li a {
  color: #353535;
  white-space: nowrap;
  display: block;
  line-height: 23px;
  transition: all 0.3s;
}

.footer .footer-widget ul li a::before {
  content: "\f105";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  padding-right: 5px;
}

.footer .footer-widget ul li a:hover {
  color: #ff9901;
}

.footer .footer-widget ul li a:hover::before {
  content: "\f101";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.footer .contact-info p {
  margin-bottom: 10px;
  font-size: 16px;
}

.footer .contact-info p i {
  margin-right: 5px;
}

.footer .social {
  position: relative;
  width: 100%;
}

.footer .social a {
  display: inline-block;
  margin: 10px 5px 0 0;
  width: 40px;
  height: 40px;
  padding: 6px 0;
  text-align: center;
  font-size: 18px;
  color: #353535;
  border: 1px solid #353535;
  border-radius: 4px;
  transition: all 0.3s;
}

.footer .social a:hover {
  color: #ff9901;
  border-color: #ff9901;
}

.footer .payment {
  padding-top: 25px;
  padding-bottom: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

@media (min-width: 992px) {
  .footer .payment {
    max-width: 80%;
    margin: 0 auto;
  }
}

.footer .payment-method,
.footer .payment-security {
  overflow: hidden;
}

.footer .payment-method {
  text-align: left;
}

.footer .payment-security {
  text-align: right;
}

@media (max-width: 768.98px) {
  .footer .payment-method {
    margin-bottom: 15px;
  }

  .footer .payment-method,
  .footer .payment-security {
    text-align: center;
  }
}

.footer .payment-method h2,
.footer .payment-security h2 {
  display: inline-block;
  margin: 0 10px 0 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
}

.footer .payment-method img,
.footer .payment-security img {
  height: 25px;
}

/**********************************/
/******** Footer Bottom CSS *******/
/**********************************/
.footer-bottom {
  position: relative;
  padding: 25px 0;
  background: #000000;
}

.footer-bottom .copyright {
  text-align: left;
}

.footer-bottom .template-by {
  text-align: right;
}

.footer-bottom .copyright p,
.footer-bottom .template-by p {
  color: #ffffff;
  font-weight: 400;
  margin: 0;
}

.footer-bottom .copyright p a,
.footer-bottom .template-by p a {
  font-weight: 600;
}

.footer-bottom .copyright p a:hover,
.footer-bottom .template-by p a:hover {
  color: #ffffff;
}

@media (max-width: 768.98px) {
  .footer-bottom .copyright,
  .footer-bottom .template-by {
    text-align: center;
  }
}

/**********************************/
/********** Sidebar CSS ***********/
/**********************************/
.sidebar-widget {
  padding: 30px;
  background: #ffffff;
}

.sidebar-widget:not(:first-child) {
  padding-top: 0;
}

.sidebar-widget .title {
  position: relative;
  font-size: 22px;
  text-transform: capitalize;
  margin-bottom: 15px;
}

.sidebar-widget.category {
  margin: 0;
}

.sidebar-widget.category .navbar {
  padding: 0;
  overflow: hidden;
  background: #ffffff !important;
}

.sidebar-widget.category .navbar-nav {
  width: 100%;
}

.sidebar-widget.category .navbar li {
  border-bottom: 1px solid #f3f6ff;
}

.sidebar-widget.category .navbar li:last-child {
  border-bottom: none;
}

.sidebar-widget.category .navbar a {
  color: #353535;
}

.sidebar-widget.category .navbar a:hover {
  color: #ff9901;
}

.sidebar-widget.category .navbar i {
  color: #ff9901;
  width: 20px;
  text-align: center;
  margin-right: 8px;
}

.sidebar-widget.category .navbar a:hover i {
  color: #353535;
}

.sidebar-widget.brands ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-widget.brands ul li {
  margin-bottom: 12px;
}

.sidebar-widget.brands ul li:last-child {
  margin-bottom: 0;
}

.sidebar-widget.brands ul li a {
  color: #353535;
  white-space: nowrap;
  display: inline-block;
  line-height: 23px;
  transition: all 0.3s;
}

.sidebar-widget.brands ul li a::before {
  content: "\f105";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  padding-right: 5px;
}

.sidebar-widget.brands ul li a:hover {
  color: #ff9901;
}

.sidebar-widget.brands ul li a:hover::before {
  content: "\f101";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

.sidebar-widget.brands ul li a:hover {
  padding-left: 10px;
}

.sidebar-widget.brands ul li span {
  display: inline-block;
  float: right;
  color: #666666;
  font-size: 14px;
  font-weight: 400;
}

.sidebar-widget.widget-slider {
  position: relative;
}

.sidebar-widget.image a {
  display: block;
  width: 100%;
  overflow: hidden;
}

.sidebar-widget.image img {
  max-width: 100%;
  transition: 0.3s;
}

.sidebar-widget.image img:hover {
  transform: scale(1.1);
  filter: blur(3px);
  -webkit-filter: blur(3px);
}

.sidebar-widget.tag a {
  display: inline-block;
  margin: 0 0 4px 0;
  padding: 3px 8px;
  font-size: 14px;
  color: #353535;
  background: #ffffff;
  border: 1px solid #353535;
  border-radius: 4px;
  transition: 0.3s;
}

.sidebar-widget.tag a:hover {
  color: #ffffff;
  background: #ff9901;
  border-color: #ff9901;
}
</style>
