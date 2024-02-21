<template>
<div class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <nav class="navbar bg-light">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-home"></i>Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-shopping-bag"></i>Best Selling</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-plus-square"></i>New Arrivals</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-female"></i>Fashion & Beauty</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-child"></i>Kids & Babies Clothes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-tshirt"></i>Men & Women Clothes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-mobile-alt"></i>Gadgets & Accessories</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa fa-microchip"></i>Electronics & Accessories</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="slider-container">
                        
    <div v-for="(item, index) in sliderItems" :key="index" class="header-slider-item" v-show="index === activeIndex">
      <img :src="item.img" alt="Slider Image" />
      <div class="header-slider-caption">
        <p>{{ item.caption }}</p>
        
      </div>
    </div>
    <div class="button-container">
    <button class="slider-btn prev" @click="prevSlide">Prev</button>
    <button class="slider-btn next" @click="nextSlide">Next</button>
    </div>  
  </div>
                    <div class="col-md-3">
                        <div class="header-img">
                            <div class="img-item">
                                <img src="../assets/img/category-1.jpg" />
                                <a class="img-text" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                            <div class="img-item">
                                <img src="../assets/img/category-2.jpg" />
                                <a class="img-text" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  /* eslint-disable vue/multi-word-component-names */
  data() {
    return {
      activeIndex: 0,
      sliderItems: [
        { img: '/img/slider-1.jpg' },
        { img: '/img/slider-2.jpg'},
        { img: '/img/slider-3.jpg' },
      ],
    };
  },
  methods: {
    
    nextSlide() {
      
      this.activeIndex = (this.activeIndex + 1) % this.sliderItems.length;
    },
    prevSlide() {
      
      this.activeIndex = (this.activeIndex + this.sliderItems.length - 1) % this.sliderItems.length;
    },
  },
};
</script>
<style scoped>
.button-container {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 100px; 
}
.slider-btn {
  background-color: #FF9901; 
  color: white; 
  border: none; 
  padding: 10px 20px; 
  cursor: pointer; 
  transition: background-color 0.3s;
  border-radius: 5px; 
  font-size: 16px; 
  margin: 5px;
}

.slider-btn:hover {
  background-color: darken(#FF9901, 10%); 
}





</style>