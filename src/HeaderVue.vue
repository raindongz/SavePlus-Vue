<script setup>
import router from "@/main";

function navigateToHome() {
  router.push({
    path: "/",
  })
}

function navigateToProfile() {
  router.push({
    path: "/p-information"
  })
}


function navigateToBack() {
  router.back();
}
</script>

<template>
  <div id="header">
    <div class="left-area">
      <img src="@/assets/logo1.png" alt="loading">
    </div>
    <div class="right-area">
      <div class="btn-area">
        <button class="btn btn-light" @click="navigateToHome">Home</button>
        <button class="btn btn-light" @click="navigateToProfile">My Profile</button>
        <button class="btn btn-light" @click="navigateToBack">Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  height: 200px;
  background-color: black;
  display: flex;
}

.left-area {
  height: 100%;
  width: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.right-area {
  flex-grow: 1;
  height: 100%;
}

.btn-area {
  float: right;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
}

@media (max-width: 600px) {
  .btn-area {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}

.btn-area > button {
  margin-right: 10px;
}
</style>
