<template>
  <view class="page">
    <view class="header">
      <open-data class="avatar-icon" type="userAvatarUrl" lang="zh_CN" />
      <navigator class="check-in" url="check-in" hover-class="none">打卡</navigator>
      <navigator class="setting" url="settings" hover-class="none">
        <image class="setting-icon" src="../static/setting.png" />
      </navigator>
    </view>
    <view class="overview">
      <canvas :id="canvasId" :canvas-id="canvasId" />
    </view>
    <view class="detail">
      <view class="bookshelf">
        <view class="bookshelf-title">旧约</view>
        <view class="books">
          <view class="book">
            <view class="short-name">创</view>
            <progress-bar class="book-rate" :rate="0.4" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">出</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">利</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">民</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">申</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">书</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">士</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">得</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">撒</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">王</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
        </view>
      </view>
      <view class="bookshelf">
        <view class="bookshelf-title">新约</view>
        <view class="books">
          <view class="book">
            <view class="short-name">太</view>
            <progress-bar class="book-rate" :rate="2.6" />
            <view class="book-count">2</view>
          </view>
          <view class="book">
            <view class="short-name">可</view>
            <progress-bar class="book-rate" :rate="7" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">路</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
          <view class="book">
            <view class="short-name">约</view>
            <progress-bar class="book-rate" :rate="0" />
            <view class="book-count">0</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ProgressBar from "@/components/progress-bar";
export default {
  components: {
    ProgressBar
  },

  data() {
    return {
      canvasId: "u-canvas"
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 15upx;
  border-bottom: 1px solid #eee;
}

.avatar-icon,
.setting-icon {
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 15px;
  overflow: hidden;
}

.check-in {
  padding: 8upx 24upx;
  border: 1px solid $uni-border-color;
  border-radius: 8upx;
}

.bookshelf-title {
  padding: 0 1em;
  line-height: 2em;
  font-size: 30upx;
  color: $uni-bg-color;
  background-color: $uni-color-primary;
}

.books {
  padding-bottom: 1px;
  display: flex;
  flex-wrap: wrap;
  background-color: $uni-bg-color-grey;
}

.book {
  flex-basis: calc((100% + 2px) / 3);
  display: flex;
  align-items: center;
  margin: 0 -1px -1px 0;
  padding: 8upx 15upx;
  border: 1px solid $uni-border-color;
  box-sizing: border-box;
  color: $uni-color-primary;
  background-color: $uni-bg-color;
}

.book-rate {
  margin: 0 8upx;
  height: 50%;
  flex: 1;
}

.book-count {
  text-decoration: underline;
}
</style>