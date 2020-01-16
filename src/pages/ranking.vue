<template>
  <view class="page">
    <view class="header">
      <image class="cover" :src="cover" />
      <view class="tabs">
        <view class="tab" :class="{ 'tab__selected': type === 'total' }" @tap="type = 'total'">总排行</view>
        <view class="tab" :class="{ 'tab__selected': type === 'week' }" @tap="type = 'week'">周排行</view>
      </view>
    </view>
    <ranking-item
      :ranking="userRanking"
      :avatar="user.avatar"
      :nickname="user.nickname"
      :star="type === 'total' ? user.count : null"
      :score="user[`${type}Count`]"
    />
    <view class="ranking-list" v-if="type === 'total'">
      <view
        class="ranking-item--container"
        v-for="(user, index) in totalRanking"
        :key="user.userid"
      >
        <ranking-item
          :ranking="index + 1"
          :avatar="user.avatar"
          :nickname="user.nickname"
          :star="user.count"
          :score="user.totalCount"
        />
      </view>
    </view>
    <view class="ranking-list" v-if="type === 'week'">
      <view class="ranking-item--container" v-for="(user, index) in weekRanking" :key="user.userid">
        <ranking-item
          :ranking="index + 1"
          :avatar="user.avatar"
          :nickname="user.nickname"
          :score="user.weekCount"
        />
      </view>
    </view>
  </view>
</template>

<script>
import RankingItem from "@/components/ranking-item";
import Mock from "mockjs";
export default {
  components: {
    RankingItem
  },

  data() {
    return {
      // 排行榜类型：week/total
      type: "total",
      // 封面图片地址
      cover: Mock.Random.image("700x375"),
      // 用户排行记录
      ranking: Array.from({
        length: Mock.mock("@natural(1, 200)")
      }).map((_, index) =>
        Mock.mock({
          userid: index,
          avatar: "@image()",
          nickname: "@cname()",
          count: "@natural(0, 5)",
          weekCount: "@natural(0, 20)",
          totalCount: "@natural(20, 9999)"
        })
      )
    };
  },

  computed: {
    totalRanking() {
      if (!Array.isArray(this.ranking)) return null;
      return this.ranking
        .slice()
        .sort((item1, item2) => item2.totalCount - item1.totalCount);
    },

    weekRanking() {
      if (!Array.isArray(this.ranking)) return null;
      return this.ranking
        .slice()
        .sort((item1, item2) => item2.weekCount - item1.weekCount);
    },

    user() {
      if (!Array.isArray(this.ranking)) return null;
      const userid = this.ranking[0].userid;
      return this.ranking.find(user => user.userid === userid);
    },

    userRanking() {
      if (!this.user) return null;
      return (
        this[`${this.type}Ranking`].findIndex(
          user => user.userid === this.user.userid
        ) + 1
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
}

.cover {
  display: block;
  width: 750rpx;
  height: 375rpx;
}

.tabs {
  display: flex;
  justify-content: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #fff);
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
}

.tab {
  width: 200rpx;
  min-height: 80rpx;
  line-height: 80rpx;
  border: 1px solid $uni-color-primary;
  border-radius: 15rpx 15rpx 0 0;
  text-align: center;
  color: $uni-color-primary;
  background-color: $uni-bg-color;
}

.tab__selected {
  color: $uni-bg-color;
  background-color: $uni-color-primary;
}

.ranking-list {
  border-top: 20rpx solid $uni-bg-color-grey;
}

.ranking-item--container {
  border-bottom: 1px solid $uni-border-color;
}
</style>