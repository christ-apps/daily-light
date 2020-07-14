<template>
  <navigator
    class="selected-fab"
    :style="fabStyle"
    url="/pages/check-in/selected"
    >{{ count }}</navigator
  >
</template>

<script>
import calcStyle from '@/util/calc-style';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      right: 20,
      bottom: 20,
    };
  },

  computed: {
    ...mapState('record', ['records']),

    count() {
      return Object.values(this.records)
        .map(book => book.filter(chapter => chapter).length)
        .reduce((sum, count) => sum + count, 0);
    },

    fabStyle() {
      return calcStyle({
        right: this.right + 'px',
        bottom: this.bottom + 'px',
      });
    },
  },
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
  background-color: rgba($uni-color-primary, 0.5);
  position: fixed;
  color: #fff;
  font-size: 26px;
}
</style>
