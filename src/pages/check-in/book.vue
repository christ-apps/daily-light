<template>
  <view class="page">
    <view v-for="shelf in books" :key="shelf.shelfname" class="bookshelf">
      <title-bar>{{ shelf.shelfname }}</title-bar>
      <view class="books">
        <navigator
          v-for="book in shelf.books"
          :key="book.shortname"
          class="book"
          :url="`chapter?bookname=${book.name}&chapterCount=${book.count}`"
        >
          <min-badge class="badge" :count="count(book)">
            <view class="short-name">{{ book.shortname }}</view>
          </min-badge>
        </navigator>
      </view>
    </view>
    <selected-fab />
  </view>
</template>

<script>
import TitleBar from '@/components/title-bar';
import MinBadge from '@/components/min-badge/min-badge';
import SelectedFab from '@/components/selected-fab';
import { mapState } from 'vuex';

export default {
  components: {
    TitleBar,
    MinBadge,
    SelectedFab,
  },

  computed: {
    ...mapState('book', ['books']),
    ...mapState('record', ['records']),
  },

  methods: {
    count(book) {
      return (this.records[book.shortname] || []).filter(chapter => chapter)
        .length;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  position: relative;
  z-index: 0;
}

.badge {
  width: 60%;
  height: 120rpx;
  line-height: 120rpx;
}
</style>
