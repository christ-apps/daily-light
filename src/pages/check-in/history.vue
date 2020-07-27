<template>
  <view class="page">
    <uni-list>
      <picker
        mode="date"
        fields="month"
        :end="today"
        :value="`${month}-01`"
        @change="month = $event.detail.value"
      >
        <uni-list-item :title="displayDate" />
      </picker>
    </uni-list>
    <loading-view class="list-area" :loading-method="refresh">
      <scroll-view class="list-scroller" scroll-y @scrolltolower="loadLater">
        <uni-list>
          <uni-list-item
            v-for="item in list"
            :key="item.date"
            :title="item.date"
            :note="item.items"
            :show-arrow="false"
          />
        </uni-list>
      </scroll-view>
    </loading-view>
  </view>
</template>

<script>
import LoadingView from '@/components/loading-view';
import UniList from '@/components/uni-list/uni-list';
import UniListItem from '@/components/uni-list-item/uni-list-item';
import dayjs from 'dayjs';
import { EmptyHint } from '@/util/errors';

export default {
  components: {
    LoadingView,
    UniList,
    UniListItem,
  },

  data() {
    return {
      month: dayjs().format('YYYY-MM'),
      today: dayjs().format('YYYY-MM-DD'),
      list: null,
    };
  },

  computed: {
    displayDate() {
      return dayjs(this.month, 'YYYY-MM').format('YYYY年M月');
    },
  },

  methods: {
    async fetch() {
      const date = dayjs(this.month, 'YYYY-MM');
      const { result } = await wx.cloud.callFunction({
        name: 'getRecords',
        data: {
          startTime: date.startOf('month').valueOf(),
          endTime: date.endOf('month').valueOf(),
        },
      });
      return {
        list: result.list.map(({ date, books }) => ({
          date: dayjs(this.month)
            .date(date)
            .format('M月D日'),
          items: books
            .map(
              book =>
                `${book.bookId}${book.chapters
                  .sort((a, b) => a - b)
                  .join(',')}`,
            )
            .join(' | '),
        })),
      };
    },

    async loadLater() {},

    async refresh() {
      const result = await this.fetch();
      if (result.list.length === 0) {
        throw new EmptyHint('没有打卡记录');
      }
      this.list = result.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - var(--window-top));
  display: flex;
  flex-direction: column;
}

.list-area {
  &,
  &::v-deep > .loading-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
}

.list-scroller {
  height: 100%;
}
</style>
