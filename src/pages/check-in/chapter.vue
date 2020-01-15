<template>
  <view class="chapters">
    <view class="chapter" v-for="chapter in chapters" :key="chapter.number">{{chapter.number}}</view>
  </view>
</template>

<script>
export default {
  queryData: {
    bookname: String,
    chapterCount: Number
  },

  data() {
    return {
      chapters: null
    };
  },

  onLoad() {
    this.chapters = Array.from(
      {
        length: this.chapterCount
      },
      (_, index) => ({
        number: index + 1
      })
    );
  },

  watch: {
    bookname: {
      immediate: true,
      handler(title) {
        uni.setNavigationBarTitle({
          title
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chapters {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1px;
}

.chapter {
  flex-basis: calc((100% + 4px) / 5);
  margin: 0 -1px -1px 0;
  height: 120rpx;
  line-height: 120rpx;
  border: 1px solid $uni-border-color;
  box-sizing: border-box;
  font-size: 50rpx;
  text-align: center;
  color: $uni-color-primary;
  background-color: $uni-bg-color;
}
</style>