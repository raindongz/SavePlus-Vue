<template>
    <div class="top-divider"></div> 
    <div class="checkout-complete" style="background-color: #FF9901;">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h1>Thank you for visiting!</h1>
            <p>Your item has been successfully added to the wishlist</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 text-center">
            <button onclick="window.location.href='/'" class="btn-home">Return to Home</button>
          </div>
          <div class="col-lg-6 text-center">
            <button onclick="window.location.href='/shop'" class="btn-continue">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    /* eslint-disable vue/multi-word-component-names */
    name: "CheckoutComplete"
  }
  </script>
  
  <style>
  .top-divider {
    height: 4px; 
    background-color: white; 
  }
  
  .checkout-complete h1 {
    color: white;
    margin-top: 20px;
  }
  
  .checkout-complete p {
    color: white;
    margin-bottom: 30px;
  }
  
  .btn-home, .btn-continue {
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-home:hover, .btn-continue:hover {
    background-color: #e68a00;
  }
  
  .btn-home {
    background-color: #fff;
    color: #FF9901;
  }
  
  .btn-continue {
    background-color: #fff;
    color: #FF9901;
  }
  
  .col-lg-6 {
    margin-bottom: 20px;
  }
  </style>
  