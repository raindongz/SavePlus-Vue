<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getProductDetailInfo} from "@/utils/product.info";
import ErrorIconBlack from "@/assets/ErrorIconBlack.vue";
import ToastMsg from "@/components/tools/ToastMsg.vue";
import 'bootstrap/js/src/carousel';
import 'bootstrap'

let data = reactive({
  proId: "",
})

let productDetailInfo = reactive({})

let errorToastRef = ref(null)

onMounted(() => {
  fillBasicInfo()
  fillProductDetailInfo()
})

/**
 * fill basic info for product
 */
function fillBasicInfo() {
  const route = useRoute();
  data.proId = route.query.prod
}

/**
 * get product info by server
 */
async function fillProductDetailInfo() {
  try {
    let prodInfoRes = await getProductDetailInfo(data.proId);
    if (prodInfoRes['status'] !== 200 || !prodInfoRes['data']) {
      errorToastRef.value['showToast']('Whoops! Something wrong!')
    } else {
      productDetailInfo = prodInfoRes['data']
    }
  } catch (e) {
    console.error('something wrong in get product info', e)
    errorToastRef.value['showToast']('Whoops! Something wrong!')
  }
}

</script>
<template>
  <toast-msg ref="errorToastRef">
    <template #icon-slot>
      <error-icon-black></error-icon-black>
    </template>
  </toast-msg>
  <div class="container-xxl">
    <!--    left-->
    <div class="left-area">
      <!--      carrousel-->
      <div class="carrousel-area">
        <img class="carrousel" src="@/assets/hhkb.jpeg" alt="loading...">
      </div>
      <!--      product details-->
      <div class="product-info-detail">
        <div class="real-product-info">
          <h1 class="title-text">Title</h1>
          <div class="desc-text">This is some content to describe the this product for seller. You can type anything for
            others to browser your product.
          </div>
          <div class="single-detail-area">
            <div class="single-card">
              <div class="single-key">Single Key</div>
              <div class="single-value">Single Value</div>
            </div>
            <div class="single-card">
              <div class="single-key">Single Key</div>
              <div class="single-value">Single Value</div>
            </div>
            <div class="single-card">
              <div class="single-key">Single Key</div>
              <div class="single-value">Single Value</div>
            </div>
            <div class="single-card">
              <div class="single-key">Single Key</div>
              <div class="single-value">Single Value</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    middle-->
    <div class="middle-area">
      <div class="profile-area">
        <div class="profile-info">
          <img src="@/assets/logo.png" alt="loading" class="avatar">
        </div>
        <div class="profile-other">
          <span class="info-title">Contact me</span>
          <span class="info-value">nioliu@bu.edu</span>
          <span class="info-title">Rating</span>
          <span class="info-value">⭐️️⭐️⭐️</span>
        </div>
      </div>
      <div class="comments-area">
        <div class="comment-title">Comments</div>
        <div class="comment-details">
          <div class="single-comment">
            <div>These are some real comment paragraphs, for users to type any comments...</div>
          </div>
          <div class="single-comment">
            <div>These are some real comment paragraphs, for users to type any comments...</div>
          </div>
          <div class="single-comment">
            <div>These are some real comment paragraphs, for users to type any comments...</div>
          </div>
          <div class="single-comment">
            <div>These are some real comment paragraphs, for users to type any comments...</div>
          </div>
          <div class="single-comment">
            <div>These are some real comment paragraphs, for users to type any comments...</div>
          </div>
          <div class="single-comment">
            <div>These are some real comment paragraphs, for users to type any comments...</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-area">
      <div class="recommend-area">
        <div class="recommend-title">Recommendations for you</div>
        <div class="recommend-items">
          <div class="single-item">
            <img src="@/assets/alienware.jpg" alt="loading">
          </div>
          <div class="single-item">
            <img src="@/assets/avalon.jpeg" alt="loading">
          </div>
          <div class="single-item">
            <img src="@/assets/hhkb.jpeg" alt="loading">
          </div>
          <div class="single-item">
            <img src="@/assets/benq.jpeg" alt="loading">
          </div>
          <div class="single-item">
            <img src="@/assets/fanslin.jpeg" alt="loading">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-xxl {
  display: flex;
  max-height: 750px;
}

.container-xxl > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-area {
  flex-grow: 1;
}

.middle-area {
  flex-grow: 1;
}

.right-area {
  flex-grow: 1;
  flex-shrink: 0;
}

.carrousel-area {
  width: 100%;
  padding-top: 56.25%; /* 9 / 16 = 0.5625 */
  position: relative;
  border: 1px solid black;
  box-sizing: border-box;
  overflow: hidden;
}

.carrousel {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.real-product-info {
  width: 90%;
  border: 1px solid black;
  margin: 30px auto;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.product-info-detail {
  width: 100%;
  border: 1px solid black;
  border-top: none;
  flex-grow: 1;
}

.desc-text {
  text-align: center;
}

.single-card {
  margin: 20px 20px;
  width: 150px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
}

.single-key {
  font-weight: 700;
  text-align: center;
  height: 30%;
  width: 100%;
}

.single-value {
  height: 70%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.single-detail-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.profile-area {
  height: 32%;
  border: 1px solid black;
  width: 100%;
  border-top: 1px solid black;
}

.profile-info {
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 100px;
  overflow: hidden;
  height: 100px;
  border: 1px solid black;
  border-radius: 100%;
}

.profile-other {
  width: 100%;
  height: 40%;
  border-top: 1px solid black;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 30px 30px;
  grid-row-gap: 10px;
  padding-top: 10px;
}

@media (max-width: 700px) {
  .right-area {
    display: none !important;
  }

  .middle-area {
    border-right: 1px solid black;
  }
}

/* let all the first column fix in center */
.profile-other > span:nth-child(2n+1) {
  justify-self: center;
}

.info-title {
  border: 1px solid black;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  width: 150px;
  text-align: center;
}

.comment-title, .recommend-title {
  font-size: 20px;
  font-weight: 600;
  height: 30px;
  margin: 10px 10px;
}

.comments-area {
  flex-grow: 1;
  max-height: 68%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.comment-details {
  height: 90%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.single-comment {
  width: 95%;
  border: 1px solid;
  text-align: start;
  padding: 10px 10px;
  border-radius: 15px;
  margin-bottom: 10px;
}

.recommend-area {
  border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.recommend-items {
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
}

.single-item {
  border: 1px solid black;
  width: 90%;
  padding-bottom: 60%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.single-item > * {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
