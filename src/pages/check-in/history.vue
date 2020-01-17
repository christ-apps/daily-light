<template>
  <view class="page">
    <uni-list>
      <picker
        mode="date"
        fields="month"
        :end="today"
        :value="date"
        @change="date = $event.detail.value"
      >
        <uni-list-item :title="displayDate" />
      </picker>
    </uni-list>
    <view class="list-area">
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
    </view>
  </view>
</template>

<script>
import UniList from "@/components/uni-list/uni-list";
import UniListItem from "@/components/uni-list-item/uni-list-item";
import dayjs from "dayjs";
import Mock from "mockjs";
export default {
  components: {
    UniList,
    UniListItem
  },

  data() {
    return {
      date: dayjs().format("YYYY-MM-DD"),
      today: dayjs().format("YYYY-MM-DD"),
      list: null
    };
  },

  computed: {
    displayDate() {
      return dayjs(this.date).format("YYYY年MM月");
    }
  },

  methods: {
    async fetch() {
      await new Promise(done => setTimeout(done, 500));
      return Mock.mock({
        hasMoreEarlier: true,
        hasMoreLater: false,
        "list|20": [
          {
            date: "@date()",
            "items|1": ["诗23-25", "民7", "太2,4-6", "可8|约1-3|利2,4"]
          }
        ]
      });
    },

    async loadEarlier() {},

    async loadLater() {},

    async refresh() {
      const result = await this.fetch();
      this.list = result.list;
    }
  },

  onReady() {
    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - var(--window-top));
  display: flex;
  flex-direction: column;
}

.list-area {
  flex: 1;
  overflow: hidden;
}

.list-scroller {
  height: 100%;
}
</style>