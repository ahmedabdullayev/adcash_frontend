<template>
  <div class="loader">
    <div class="big-circle">
      <div class="small-circle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SmallLoader"
})
</script>

<style lang="less" scoped>

.loader {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.big-circle {
  width: 8rem;
  height: 8rem;
  border: 5px solid #000;
  border-radius: 50%;
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;
  border-color: #000 transparent #000 #000;
  animation: bigcircle 1.2s linear infinite;
}
.small-circle {
  position:relative;
  width: 5rem;
  height: 5rem;
  border: 5px solid #ffff;
  border-radius: 50%;
  border-color: #000 #000 transparent #000;
}

@keyframes bigcircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>