<template>
  <view class="page">
    <view class="members">
      <view class="member" v-for="member in members" :key="member.userid">
        <navigator class="avatar" url="settings" open-type="redirect">
          <image class="avatar" :src="member.avatar" />
        </navigator>
        <view class="nickname">{{member.nickname}}</view>
      </view>
      <view class="member" v-if="groupid === defaultid">
        <navigator class="fake-avatar icon-minus" url="settings" open-type="redirect" />
      </view>
      <view class="member">
        <navigator class="fake-avatar icon-plus" url="settings" open-type="redirect" />
      </view>
    </view>
    <uni-list>
      <uni-list-item title="群名称" :note="groupName" :show-arrow="false" />
      <uni-list-item title="邀请新成员" />
      <uni-list-item title="我在本群的昵称" :note="nickname" />
      <uni-list-item title="排行有效时间区间" :note="`${startDate} ~ ${endDate}`" :show-arrow="false" />
      <uni-list-item title="查看排行榜" />
    </uni-list>
    <button type="warn" style="margin: 15rpx">
      <block v-if="groupid === defaultid">删除并</block>
      <block>退出</block>
    </button>
  </view>
</template>

<script>
import UniList from "@/components/uni-list/uni-list";
import UniListItem from "@/components/uni-list-item/uni-list-item";
import Mock from "mockjs";
export default {
  components: {
    UniList,
    UniListItem
  },

  queryData: {
    groupName: String
  },

  data() {
    return Mock.mock({
      "members|3-100": [
        {
          "userid|+1": 1,
          avatar: "@image(64x64)",
          nickname: "@ctitle(1, 10)"
        }
      ],
      groupName: "@ctitle(1, 10)",
      nickname: "@cname()",
      "admin|1": true,
      groupid: "@natural(1, 3)",
      defaultid: "@natural(1, 3)",
      startDate: "@date()",
      endDate: "@date()"
    });
  }
};
</script>

<style lang="scss" scoped>
.members {
  padding: 20rpx 10rpx;
  display: flex;
  flex-wrap: wrap;
}

.member {
  margin: 10rpx 0;
  width: 20%;
}

.avatar,
.fake-avatar {
  display: block;
  margin: auto;
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
}

.nickname {
  margin: auto;
  width: 110rpx;
  font-size: 25rpx;
  text-align: center;
  color: $uni-text-color-grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fake-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80rpx;
  color: $uni-text-color-grey;
  border: 1px dashed $uni-border-color;
  position: relative;
}

.icon-minus::after,
.icon-plus::before {
  content: "";
  position: absolute;
  top: 48%;
  right: 30%;
  bottom: 48%;
  left: 30%;
  background-color: currentColor;
}

.icon-plus::after {
  content: "";
  position: absolute;
  top: 30%;
  bottom: 30%;
  left: 48%;
  right: 48%;
  background-color: currentColor;
}
</style>