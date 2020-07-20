<template>
  <view class="button-view">
    <slot />
    <button class="button" />
  </view>
</template>

<style lang="scss" scoped>
.button-view {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  opacity: 0;
}
</style>
