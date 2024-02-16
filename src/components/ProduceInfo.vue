<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getProductDetailInfo} from "@/utils/product.info";
import ErrorIconBlack from "@/assets/ErrorIconBlack.vue";
import ToastMsg from "@/components/tools/ToastMsg.vue";
import 'bootstrap/js/src/carousel';

let data = reactive({
  proId: "123"
})

let errorToastRef = ref(null)

onMounted(() => {
  fillBasicInfo()
  fillProductDetailInfo()

})

const myCarouselElement = document.querySelector('#myCarousel')

function carouselConfig() {
  const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 2000,
    touch: false
  })
}


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

  <div class="container-xxl text-center">
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/add.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/add.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/add.png" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="product-info container">
      <div class="row">
        <div class="col-1">Title</div>
        <div class="col">This is a product</div>
      </div>
      <div class="row">
        <div class="col-1">Content</div>
        <div class="col">This is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis
          is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is
          contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is contentThis is
          contentThis is content
        </div>
      </div>
      <div class="row">
        <div class="col-1">Total Price</div>
        <div class="col">This is total price</div>
      </div>
      <div class="row">
        <div class="col-1">Post User</div>
        <div class="col">This is post user name</div>
      </div>
      <div class="row">
        <div class="col-1">Delivery Type</div>
        <div class="col">This is delivery type</div>
      </div>
      <div class="row">
        <div class="col-1">Area</div>
        <div class="col">This is area</div>
      </div>
      <div class="row">
        <div class="col-1">Negotiable</div>
        <div class="col">This remark negotiable</div>
      </div>
    </div>
  </div>

</template>
<style scoped>
.product-info {
  background-color: orange;
}
</style>
