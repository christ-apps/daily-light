<template>
  <view class="page">
    <view class="dialog">
      <view class="header">{{groupName}}</view>
      <image class="code" :src="codeUrl" @tap="previewCode" />
      <view class="footer">
        <!-- #ifdef MP || H5 -->
        <button
          v-if="enableShare && mode === 'invite'"
          type="primary"
          size="mini"
          open-type="share"
          @tap="share"
        >分享邀请链接</button>
        <!-- #endif -->
        <block v-if="mode === 'accept'">
          <button v-if="status === 'out'" type="primary" size="mini" @tap="join">加入群</button>
          <view class="footer-text" v-else-if="status === 'in'">你已接受邀请</view>
          <view class="footer-text" v-else-if="status === 'waiting'">你已接受邀请，正在等待群主确认</view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import Mock from "mockjs";
export default {
  queryData: {
    groupName: String,
    groupId: Number
  },

  data() {
    return {
      // #ifdef H5
      enableShare: typeof navigator.share === "function",
      // #endif
      // #ifdef MP
      enableShare: true,
      // #endif
      // 从群设置打开时为邀请页，值为`invite`
      // 从邀请链接打开时为确认邀请页，值为`accept`
      mode: "invite",
      // 状态（已加入-in|未加入-out|等待群主验证-waiting）
      status: "out",
      // 群邀请码图片
      codeUrl: Mock.Random.image()
    };
  },

  methods: {
    previewCode() {
      if (!this.codeUrl) return;
      uni.previewImage({
        current: 0,
        urls: [this.codeUrl]
      });
    },

    async share() {
      // #ifdef H5
      try {
        if (navigator.share) {
          await navigator.share({
            title: "邀请你加入打卡群",
            text: `邀请你加入打卡群（${this.groupName}），进入可查看详情。`
          });
        }
      } catch (err) {
        console.error(err);
      }
      // #endif
    },

    join() {
      this.status = "waiting";
    }
  },

  onLoad() {
    if (getCurrentPages().length === 1) {
      this.mode = "accept";
    }
  },

  onShareAppMessage() {
    return {
      title: "邀请你加入打卡群"
    };
  }
};
</script>

<style lang="scss" scoped>
.page {
  min-height: calc(100vh - var(--window-top));
  background-color: $uni-bg-color-grey;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  width: 700rpx;
  border-radius: 15rpx;
  text-align: center;
  background-color: $uni-bg-color;
}

.header {
  padding: 20rpx;
  font-size: 45rpx;
}

.code {
  width: 500rpx;
  height: 500rpx;
}

.footer {
  padding: 20rpx;
  color: $uni-text-color-grey;
}
</style>