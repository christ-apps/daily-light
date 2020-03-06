<template>
  <navigator class="selected-fab" :style="fabStyle" url="/pages/check-in/selected"></navigator>
</template>

<script>
export default {
  data() {
    return {
      right: 20,
      bottom: 20
    };
  },

  computed: {
    fabStyle() {
      return {
        right: this.right + "px",
        bottom: this.bottom + "px"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.selected-fab {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($uni-color-primary, 0.4);
  position: fixed;
}
</style>