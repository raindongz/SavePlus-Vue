<script setup>

</script>

<template>
  <div id="header">
    <div class="left-area">
      <img src="@/assets/logo1.png" alt="loading">
    </div>
    <div class="right-area">
      <div class="span-area">
        <span>CS633</span>
        <span>Team1</span>
        <span>Boston University</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  height: 100px;
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

.span-area {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  color: #e5e5e5;
}

@media (max-width: 600px) {
  .span-area {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

</style>
