/* eslint-disable no-dupe-keys */
<template>
  <view class="page">
    <view class="header">
      <image class="avatar-icon" :src="avatar" @tap="previewAvatar" />
      <block v-if="!userid">
        <navigator class="check-in" url="check-in/check-in" hover-class="none"
          >打卡</navigator
        >
        <navigator class="setting" url="settings" hover-class="none">
          <uni-icons type="gear-filled" :size="30" color="#333333" />
        </navigator>
      </block>
    </view>
    <view class="charts">
      <view class="chart-header">
        <view
          class="chart-switch"
          :class="{ 'chart-switch__on': view !== 'weekCount' }"
          @tap="switchView"
        />
        <view class="chart-count">章数：{{ totalCount || 0 }}</view>
      </view>
      <view class="chart-canvas">
        <canvas
          :id="canvasId"
          class="line-chart"
          canvas-id="u-canvas"
          :style="canvasStyle"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
        />
      </view>
    </view>
    <view class="bookshelfs">
      <view v-for="shelf in books" :key="shelf.shelfname" class="bookshelf">
        <title-bar>{{ shelf.shelfname }}</title-bar>
        <view class="books">
          <view v-for="book in shelf.books" :key="book.bookname" class="book">
            <view class="short-name">{{ book.bookname }}</view>
            <progress-bar class="book-rate" :rate="book.rate" />
            <view class="book-count">{{ book.count }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ProgressBar from '@/components/progress-bar';
import TitleBar from '@/components/title-bar';
import UniIcons from '@/components/uni-icons/uni-icons';
import calcStyle from '@/util/calc-style.js';
import uCharts from '@/u-charts/u-charts.js';
import Mock from 'mockjs';
import { mapState } from 'vuex';
export default {
  components: {
    ProgressBar,
    TitleBar,
    UniIcons,
  },

  queryData: {
    userid: Number,
  },

  data() {
    return {
      avatar: '',
      weekCount: null,
      books: null,
      view: 'weekCount',
      canvasId: 'u-canvas',
      cWidth: 0,
      cHeight: 0,
      // #ifndef MP_ALYPAY
      pixelRatio: 1,
      // #endif
      // #ifdef MP_ALYPAY
      // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
      pixelRatio: 2,
      // #endif
    };
  },

  computed: {
    ...mapState('book', {
      shelfs: 'books',
    }),

    canvasStyle() {
      const { cWidth, cHeight, pixelRatio } = this;
      return calcStyle({
        width: cWidth * pixelRatio + 'px',
        height: cHeight * pixelRatio + 'px',
        transform: `scale(${1 / pixelRatio})`,
        transformOrigin: '0 0',
      });
    },

    /**
     * 累计打卡章数
     */
    totalCount() {
      if (Array.isArray(this.weeklyTotalCount)) {
        return this.weeklyTotalCount.slice(-1)[0];
      }
      return null;
    },

    /**
     * 截至每周的累计打卡章数
     */
    weeklyTotalCount() {
      if (Array.isArray(this.weekCount)) {
        let total = 0;
        return this.weekCount.map(count => (total += count));
      }
      return null;
    },
  },

  methods: {
    flushCanvas() {
      const count = this[this.view];
      if (Array.isArray(count)) {
        this.uCharts = new uCharts({
          $this: this,
          canvasId: this.canvasId,
          width: this.cWidth * this.pixelRatio,
          height: this.cHeight * this.pixelRatio,
          padding: [15, 0, 4, 0],
          type: 'area',
          pixelRatio: this.pixelRatio,
          enableScroll: true,
          // dataLabel: false,
          categories: count.map((_, i) => i + 1),
          series: [
            {
              name: '章数',
              data: count,
              color: '#d51e7b',
            },
          ],
          xAxis: {
            scrollAlign: 'right',
            disableGrid: true,
            itemCount: 7,
          },
          yAxis: {
            disabled: true,
            format: val => val.toFixed(),
            gridType: 'dash',
            splitNumber: 3,
            dashLength: 2,
            min: 0,
          },
          legend: {
            show: false,
          },
          animation: true,
          extra: {
            area: {
              opacity: 0.5,
              gradient: true,
            },
          },
        });
      }
    },

    touchStart(e) {
      this.uCharts.scrollStart(e);
    },

    touchMove(e) {
      this.uCharts.scroll(e);
    },

    touchEnd(e) {
      this.uCharts.scrollEnd(e);
    },

    switchView() {
      if (this.view === 'weekCount') {
        this.view = 'weeklyTotalCount';
      } else {
        this.view = 'weekCount';
      }
      this.flushCanvas();
    },

    previewAvatar() {
      uni.previewImage({
        current: 0,
        urls: [this.avatar],
      });
    },

    async getWeekCount() {
      const [{ result: weekCount }] = await Promise.all([
        await wx.cloud.callFunction({
          name: 'getWeekCount',
          data: {
            timezoneOffset: new Date().getTimezoneOffset(),
          },
        }),
        new Promise(done => {
          uni
            .createSelectorQuery()
            .select('.chart-canvas')
            .boundingClientRect(result => {
              this.cWidth = result.width;
              this.cHeight = result.height;
            })
            .exec(done);
        }),
      ]);
      this.avatar = Mock.Random.image();
      const minWeek = Math.min(...weekCount.map(item => item.week));
      this.weekCount = [];
      for (const item of weekCount) {
        this.weekCount[item.week - minWeek] = item.count;
      }
      this.weekCount = Array.from(this.weekCount, count => count || 0);
      this.flushCanvas();
    },

    async getProgress() {
      const { result: books } = await wx.cloud.callFunction({
        name: 'getProgress',
      });
      this.books = this.shelfs.map(shelf => ({
        shelfname: shelf.shelfname,
        books: shelf.books.map(book => {
          const { chapters = 0, count = 0 } = books[book.shortname] || {};
          return {
            bookname: book.shortname,
            rate: chapters / book.count,
            count: chapters === book.count ? count : 0,
          };
        }),
      }));
    },
  },

  async onReady() {
    this.getWeekCount();
    this.getProgress();
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  padding: 0 15rpx;
  border-bottom: 1px solid $uni-border-color;
}

.avatar-icon {
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 15px;
  overflow: hidden;
}

.check-in {
  padding: 8rpx 24rpx;
  border: 1px solid $uni-border-color;
  border-radius: 8rpx;
}

.chart-header {
  padding: 10rpx 15rpx;
  font-size: 50rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $uni-color-primary;
}

.chart-canvas {
  height: 375rpx;
  overflow: hidden;
}

.chart-switch {
  width: 4em;
  height: 2em;
  line-height: 2em;
  border-radius: 1em;
  font-size: 30rpx;
  text-align: center;
  background-color: rgba(213, 30, 123, 0.2);
  position: relative;
}

.chart-switch::before {
  content: '总周';
  letter-spacing: 0.5em;
  margin-right: -0.5em;
}

.chart-switch::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2em;
  height: 2em;
  border-radius: inherit;
  background-color: $uni-color-primary;
  transition: transform 0.3s;
}

.chart-switch__on::after {
  transform: translateX(100%);
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
  padding: 8rpx 15rpx;
  border: 1px solid $uni-border-color;
  box-sizing: border-box;
  color: $uni-color-primary;
  background-color: $uni-bg-color;
}

.book-rate {
  margin: 0 8rpx;
  height: 50%;
  flex: 1;
}

.book-count {
  text-decoration: underline;
}
</style>
