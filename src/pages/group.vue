<template>
  <view class="page">
    <view class="header">
      <navigator class="header-button" url="group" open-type="reLaunch">
        <uni-icons type="plusempty" />
        <text>新建</text>
      </navigator>
      <navigator class="header-button" url="group" open-type="reLaunch">
        <text>消息</text>
      </navigator>
    </view>
    <view class="group-list">
      <navigator
        class="group-item"
        :url="`group/settings?groupName=${group.name}`"
        v-for="group in groups"
        :key="group.groupid"
      >
        <text class="group-name">{{group.name}}</text>
        <image class="icon" v-if="group.groupid === defaultid" src="../static/ranking-color.png" />
        <uni-icons type="star-filled" v-if="group.admin" color="#d51e7b" :size="30" />
      </navigator>
    </view>
  </view>
</template>

<script>
import UniIcons from "@/components/uni-icons/uni-icons";
import Mock from "mockjs";
export default {
  components: {
    UniIcons
  },

  data() {
    return {
      defaultid: 0,
      groups: Array.from({
        length: Mock.Random.natural(1, 3)
      }).map((_, index) =>
        Mock.mock({
          groupid: index,
          name: "@ctitle(1, 10)",
          "admin|1": true
        })
      )
    };
  }
};
</script>

<style lang="scss" scoped>
.header,
.group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  padding: 0 15rpx;
  border-bottom: 1px solid $uni-border-color;
}

.header-button {
  padding: 8rpx 24rpx;
  border: 1px solid $uni-border-color;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
}

.group-name {
  flex: 1;
}

.icon {
  width: 30px;
  height: 30px;
}
</style>