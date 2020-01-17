<template>
  <view class="page">
    <view class="content-area">
      <scroll-view class="content-scroller" scroll-y>
        <view class="label" v-if="label">{{label}}</view>
        <input
          class="input"
          :class="{ focus }"
          v-model="value"
          :maxlength="maxlength"
          :focus="focus"
          @focus="focus = true"
          @blur="focus = false"
          @confirm="confirm"
        />
        <view class="footer">
          <view class="footer-text">{{footer}}</view>
          <view class="footer-counter">
            <block>{{value.length}}</block>
            <block v-if="maxlength >= 0">/{{maxlength}}</block>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="page-footer">
      <view class="button button__primary" @tap="confirm">确认</view>
    </view>
  </view>
</template>

<script>
export default {
  queryData: {
    callback: String,
    title: String,
    label: String,
    value: String,
    footer: String,
    maxlength: Number
  },

  data() {
    return {
      maxlength: -1,
      focus: true
    };
  },

  methods: {
    async confirm() {
      if (getCurrentPages().length > 1) {
        const parent = getCurrentPages().slice(-2)[0].$vm;
        if (
          typeof this.callback === "string" &&
          typeof parent[this.callback] === "function"
        ) {
          try {
            uni.showLoading({
              mask: true
            });
            await parent[this.callback](this.value);
            uni.hideLoading();
          } catch (err) {
            uni.hideLoading();
            if (err instanceof Error) {
              err = err.message;
            }
            if (typeof err === "string") {
              uni.showModal({
                title: "提示",
                content: err,
                showCancel: false
              });
            }
            return;
          }
        }
        uni.navigateBack();
      }
    }
  },

  watch: {
    title(value) {
      if (typeof value === "string") {
        uni.setNavigationBarTitle({
          title: value
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 0 15rpx;
  height: calc(100vh - var(--window-top));
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  padding: 35rpx 0;
  overflow: hidden;
}

.content-scroller {
  height: 100%;
}

.input {
  padding: 4rpx 10rpx;
  border-bottom: 1px solid $uni-text-color-grey;

  &.focus {
    caret-color: $uni-color-primary;
    border-color: $uni-color-primary;
  }
}

.label,
.footer {
  margin: 10rpx;
  line-height: 1em;
  font-size: 0.8em;
  color: $uni-text-color-grey;
}

.footer {
  margin-top: 24rpx;
  display: flex;
  justify-content: space-between;
}

.footer-counter {
  color: $uni-color-primary;
}

.page-footer {
  padding: 10px 0;
  min-height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button {
  margin-left: 1em;
  padding: 0 1em;
  height: 2em;
  line-height: 2em;
  border-radius: 1em;
  color: $uni-bg-color;
  background-color: $uni-color-primary;
}
</style>