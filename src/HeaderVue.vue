<script setup>

</script>

<template>
  <div id="header">
    <div class="left-area">
      <img src="@/assets/logo1.png" alt="loading">
    </div>
    <div class="right-area">
      <div class="btn-area">
        <button class="btn btn-light">Home</button>
        <button class="btn btn-light">Back</button>
        <button class="btn btn-light">My Profile</button>
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

.btn-area > button {
  margin-right: 10px;
}
</style>
