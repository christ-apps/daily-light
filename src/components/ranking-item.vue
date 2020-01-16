<template>
  <view class="ranking-item">
    <view class="ranking">{{ranking}}</view>
    <image class="avatar" :src="avatar" />
    <view class="nickname">{{nickname}}</view>
    <block v-if="star || star === 0">
      <uni-icons type="star-filled" :size="30" color="#d51e7b" />
      <view class="star">x{{star}}</view>
    </block>
    <view class="score">{{score}}</view>
  </view>
</template>

<script>
import UniIcons from "@/components/uni-icons/uni-icons";
export default {
  components: {
    UniIcons
  },

  props: {
    ranking: Number,
    avatar: String,
    nickname: String,
    star: Number,
    score: Number
  }
};
</script>

<style lang="scss" scoped>
.ranking-item {
  padding: 15rpx;
  display: flex;
  align-items: center;
}

.ranking {
  min-width: 3ch;
  text-align: center;
}

.avatar {
  margin-left: 15rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}

.nickname {
  margin: 0 15rpx;
  flex: 1;
}

.star {
  min-width: 4ch;
}

.score {
  margin-left: 15rpx;
  min-width: 5ch;
  text-align: right;
  font-size: 1.5rem;
  color: $uni-color-primary;
}
</style>