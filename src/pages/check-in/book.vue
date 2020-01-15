<template>
  <view class="page">
    <view class="bookshelf">
      <view class="bookshelf-title">旧约</view>
      <view class="books">
        <view class="book">
          <view class="short-name">创</view>
        </view>
        <view class="book">
          <view class="short-name">出</view>
        </view>
        <view class="book">
          <view class="short-name">利</view>
        </view>
        <view class="book">
          <view class="short-name">名</view>
        </view>
        <view class="book">
          <view class="short-name">申</view>
        </view>
        <view class="book">
          <view class="short-name">书</view>
        </view>
        <view class="book">
          <view class="short-name">士</view>
        </view>
        <view class="book">
          <view class="short-name">得</view>
        </view>
        <view class="book">
          <view class="short-name">撒</view>
        </view>
        <view class="book">
          <view class="short-name">王</view>
        </view>
      </view>
    </view>
    <view class="bookshelf">
      <view class="bookshelf-title">新约</view>
      <view class="books">
        <view class="book">
          <view class="short-name">太</view>
        </view>
        <view class="book">
          <view class="short-name">可</view>
        </view>
        <view class="book">
          <view class="short-name">路</view>
        </view>
        <view class="book">
          <view class="short-name">约</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.bookshelf-title {
  padding: 0 1em;
  line-height: 2em;
  font-size: 30rpx;
  color: $uni-bg-color;
  background-color: $uni-color-primary;
}

.books {
  padding-bottom: 1px;
  display: flex;
  flex-wrap: wrap;
  background-color: $uni-bg-color;
}

.book {
  flex-basis: calc((100% + 3px) / 4);
  text-align: center;
  margin: 0 -1px -1px 0;
  height: 150rpx;
  line-height: 150rpx;
  border: 1px solid $uni-border-color;
  box-sizing: border-box;
  font-size: 50rpx;
  color: $uni-color-primary;
}
</style>