<template>
  <view class="page">
    <uni-list>
      <uni-list-item
        v-for="record in rawRecords"
        :key="record.book"
        :title="`${record.book} ${record.chapters}`"
        :show-arrow="false"
      />
    </uni-list>
    <div class="page-footer">
      <button type="primary" @tap="submit">提交</button>
    </div>
  </view>
</template>

<script>
import UniList from '@/components/uni-list/uni-list';
import UniListItem from '@/components/uni-list-item/uni-list-item';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    UniList,
    UniListItem,
  },

  computed: {
    ...mapState('book', ['books']),
    ...mapState('record', ['records']),

    rawRecords() {
      const records = [];
      for (const shelf of this.books) {
        for (const book of shelf.books) {
          if (
            this.records[book.shortname] &&
            this.records[book.shortname].filter(ch => ch).length > 0
          ) {
            const chapters = [];
            let start = 0;
            for (let chapter = 1; chapter <= book.count; chapter++) {
              if (this.records[book.shortname][chapter]) {
                if (start === 0) {
                  start = chapter;
                }
              } else {
                if (start !== 0) {
                  if (start === chapter - 1) {
                    chapters.push(chapter - 1);
                  } else {
                    chapters.push(`${start}-${chapter - 1}`);
                  }
                  start = 0;
                }
              }
            }
            if (start !== 0) {
              if (start === book.count) {
                chapters.push(book.count);
              } else {
                chapters.push(`${start}-${book.count}`);
              }
            }
            records.push({
              book: book.name,
              chapters: chapters.join('，'),
            });
          }
        }
      }
      return records;
    },
  },

  methods: {
    ...mapMutations('record', {
      delRecord: 'DEL_RECORD',
    }),

    async submit() {
      uni.showLoading({
        title: '正在提交',
        mask: true,
      });
      const records = [];
      for (const [bookId, chapters] of Object.entries(this.records)) {
        records.push(
          ...chapters.filter(ch => ch).map(chapter => ({ bookId, chapter })),
        );
      }
      try {
        const { result } = await wx.cloud.callFunction({
          name: 'addRecords',
          data: { records },
        });
        result.forEach(record => this.delRecord(record));
        if (result.length === records.length) {
          uni.navigateBack();
          uni.showToast({
            icon: 'success',
            title: '打卡成功',
          });
        } else {
          uni.showModal({
            content: '部分记录提交失败',
            showCancel: false,
          });
        }
      } finally {
        uni.hideLoading();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-footer {
  padding: 15rpx;
}
</style>
