<script setup>
import {computed, onBeforeMount, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getProductDetailInfo} from "@/utils/product.info";
import ErrorIconBlack from "@/assets/ErrorIconBlack.vue";
import ToastMsg from "@/components/tools/ToastMsg.vue";
import 'bootstrap/js/src/carousel';
import 'bootstrap'

const data = reactive({
  proId: "",
})

const productDetailInfo = reactive({
  data: {}
})

let errorToastRef = ref(null)

onBeforeMount(() => {

})

onMounted(async () => {
  fillBasicInfo()
  await fillProductDetailInfo()
})

/**
 * fill basic info for product
 */
function fillBasicInfo() {
  const route = useRoute();
  data.proId = route.query.prod
}

const negotiable = computed(() => {
  return productDetailInfo.data['negotiable'] === 0 ? 'No' : 'Yes';
})

/**
 * get product info by server
 */
async function fillProductDetailInfo() {
  try {
    let prodInfoRes = await getProductDetailInfo(data.proId);
    if (prodInfoRes['status'] !== 200 || !prodInfoRes['data']) {
      errorToastRef.value['showToast']('Whoops! Something wrong!')
    } else {
      productDetailInfo.data = prodInfoRes['data']
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
    <div class="row align-items-start g-0">
      <!--    left-->
      <div class="left-area col-md-6 col-8">
        <!--      carrousel-->
        <div class="carrousel-area">
          <img class="carrousel" :src="productDetailInfo.data.images" alt="loading...">
        </div>
        <!--      product details-->
        <div class="product-info-detail">
          <div class="real-product-info">
            <h1 class="title-text">{{ productDetailInfo.data['title'] }}</h1>
            <div class="desc-text">{{ productDetailInfo.data['content'] }}</div>
            <div class="single-detail-area">
              <div class="single-card">
                <div class="single-key">Price</div>
                <div class="single-value">{{ productDetailInfo.data['total_price'] }}</div>
              </div>
              <div class="single-card">
                <div class="single-key">Area</div>
                <div class="single-value">{{ productDetailInfo.data['area'] }}</div>
              </div>
              <div class="single-card">
                <div class="single-key">Delivery</div>
                <div class="single-value">{{ productDetailInfo.data['delivery_type'] }}</div>
              </div>
              <div class="single-card">
                <div class="single-key">Negotiable</div>
                <div class="single-value">{{ negotiable }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--    middle-->
      <div class="middle-area col-md-3 col-4">
        <div class="profile-area">
          <div class="profile-info">
            <img src="@/assets/logo.png" alt="loading" class="avatar">
          </div>
          <div class="profile-other">
            <span class="info-title">Contact me</span>
            <span class="info-value">{{ productDetailInfo.data['email']}}</span>
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
      <div class="right-area col-md-3">
        <div class="recommend-area">
          <div class="recommend-title">Recommendations for you</div>
          <div class="recommend-items">
            <div class="single-item">
              <img src="@/assets/hhkb.jpeg" alt="loading">
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

  </div>
</template>
<style scoped>
.container-xxl {
  display: flex;
  max-height: 1000px;
  overflow: hidden;
}

.row > div {
  display: flex;
  flex-direction: column;
}

.left-area {
  height: 100%;
}

.middle-area {
  height: 100%;
}

.right-area {
  height: 100%;
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
  /* set all text in the children in the center/*/
  word-break: break-all;
  text-align: center;
}

.product-info-detail {
  width: 100%;
  border: 1px solid black;
  border-top: none;
  flex-grow: 1;

  overflow-y: auto;
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
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 100px;
  overflow: hidden;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
}

.profile-other {
  width: 100%;
  border-top: 1px solid black;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 30px 30px;
  grid-row-gap: 10px;
  padding-top: 10px;
  align-content: center;
  word-break: break-all;
  height: 50%;
}

@media (max-width: 768px) {
  .profile-other {
    grid-template-columns: auto;
    justify-content: center;
    align-content: start;
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
  width: 90%;
  max-width: 150px;
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

.title-text {

}
</style>
