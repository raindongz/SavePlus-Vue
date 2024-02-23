<script setup>

</script>

<template>
  <div id="header">
    <div class="left-area">
      <img src="@/assets/logo.png" alt="loading" class="logo">
    </div>
    <div class="right-area">
      <div class="btn-area">
        <li>
          <RouterLink to="/" class="shop">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/p-information" class="Myprofile">My profile</RouterLink>
        </li>
      </div>
    </div>
  </div>
</template>

<style scoped>

li {
  list-style-type: none;
}

li a {
  text-decoration: none; /* Removes underline from links */
}

li a:hover {
  color: orange; /* Changes link color on hover */
}

#header {
  width: 100%;
  height: 200px;
  background-color: white;
  display: flex;
}

.logo {
  width: 125px; /* 修改图片宽度 */
  height: auto; /* 保持高度与宽度的比例 */
  margin-left: 50px;
  margin-top: 15px;
  display: block; /* 让图片居中生效 */
  backdrop-filter: blur(2px);
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
