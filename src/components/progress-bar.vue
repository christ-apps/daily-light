<template>
  <view class="progress-bar">
    <view class="progress" :style="{ width: `${rate * 100}%` }" />
  </view>
</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.progress-bar {
  display: block;
  height: 100%;
  border: 1px solid;
  border-radius: 750rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.progress {
  width: 0;
  max-width: 100%;
  transition: width 0.3s;
  height: 100%;
  background-color: currentColor;
}
</style>