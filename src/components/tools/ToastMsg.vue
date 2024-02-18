<template>
  <transition name="toast">
    <span class="toast-span" v-if="show">
      <div class="toast-container">
        <slot name="icon-slot"></slot>
        <div class="confirm-msg">{{ message }}</div>
      </div>
    </span>
  </transition>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  duration: {
    // 展示的持续时间
    type: Number,
    default: 5000
  }
})

let show = ref(false)
let message = ref('') // 展示内容

function showToast(msg) {
  if (show.value) {
    console.error('Toast has been invoked!')
  }

  message.value = msg
  show.value = true

  let interval = setInterval(() => {
    show.value = false
    clearInterval(interval)
  }, props.duration)
}

defineExpose({
  showToast
})
</script>

<style scoped>
.toast-span {
  z-index: 100;
  margin-top: 20px;
  position: fixed;
  justify-content: center;
  display: flex;
  width: 100%;
  pointer-events: none;
}

.toast-container {
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 25px;
  /*height: 30vh;*/
  /*text-align: center;*/
  /*width: 30vw;*/
  padding: 1vh 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: inherit;
}

.confirm-msg {
  margin-left: 1vw;
  font-weight: 500;
}
</style>
