<template>
  <view class="title-bar">
    <slot />
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title-bar {
  padding: 0 1em;
  line-height: 2em;
  font-size: 30rpx;
  color: $uni-bg-color;
  background-color: $uni-color-primary;
}
</style>