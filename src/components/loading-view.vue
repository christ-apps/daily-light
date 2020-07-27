<template>
  <view class="loading-view">
    <template v-if="status === 'success'"><slot /></template>
    <view v-else-if="status === 'fail'" class="error-hint">
      <view class="errmsg">{{ errmsg }}</view>
      <view class="buttons">
        <button-view v-if="retry" class="btn" @click.native="load"
          >重试</button-view
        >
        <button-view v-if="errlog" class="btn" @click.native="showLog"
          >查看日志</button-view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { FriendlyError, EmptyHint } from '@/util/errors';
import ButtonView from '@/components/button-view.vue';

export default {
  components: {
    ButtonView,
  },

  props: {
    loadingMethod: Function,
  },

  data() {
    return {
      // loading|success|fail
      status: 'loading',
      error: null,
    };
  },

  computed: {
    loadResult() {
      return this.load();
    },

    errmsg() {
      if (this.error instanceof EmptyHint) {
        return this.error.message || '暂无数据';
      }
      if (this.error instanceof FriendlyError) {
        return this.error.message || '未知错误';
      }
      return '程序异常';
    },

    retry() {
      if (this.error instanceof EmptyHint) return false;
      return true;
    },

    errlog() {
      if (this.error instanceof FriendlyError) return;
      return (this.error && this.error.message) || '';
    },
  },

  watch: {
    loadResult: {
      immediate: true,
      handler() {},
    },

    status: {
      immediate: true,
      handler(newStatus, oldStatus) {
        if (newStatus === 'loading' && oldStatus !== 'loading') {
          uni.showLoading();
        } else if (oldStatus === 'loading' && newStatus !== 'loading') {
          uni.hideLoading();
        }
      },
    },
  },

  methods: {
    async load() {
      const load = this.loadingMethod;
      this.status = 'loading';
      this.error = null;
      try {
        if (typeof load === 'function') {
          await load.apply(this.$parent);
        }
        if (load !== this.loadingMethod) return;
        this.status = 'success';
      } catch (err) {
        if (load !== this.loadingMethod) return;
        this.status = 'fail';
        this.error = err;
      }
    },

    showLog() {
      uni.showModal({
        title: '错误日志',
        content: this.errlog,
        showCancel: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-view {
  position: relative;
}

.error-hint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  padding: 10rpx;
  color: $uni-color-primary;

  &:active {
    color: mix($uni-color-primary, #fff);
  }

  & + & {
    margin-left: 10rpx;
  }
}
</style>
