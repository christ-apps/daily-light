<template>
  <view class="chapters">
    <view
      v-for="chapter in chapters"
      :key="chapter.number"
      class="chapter"
      :class="{ chapter__selected: selected[chapter.number] }"
      @tap="setChapter(chapter.number, !selected[chapter.number])"
      >{{ chapter.number }}</view
    >
    <selected-fab />
  </view>
</template>

<script>
import SelectedFab from '@/components/selected-fab';
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
    SelectedFab,
  },

  queryData: {
    bookname: String,
    chapterCount: Number,
  },

  data() {
    return {
      chapters: null,
    };
  },

  onLoad() {
    this.chapters = Array.from(
      {
        length: this.chapterCount,
      },
      (_, index) => ({
        number: index + 1,
      }),
    );
  },

  computed: {
    ...mapState('book', ['books']),
    ...mapState('record', ['records']),

    shortname() {
      for (const shelf of this.books) {
        for (const book of shelf.books) {
          if (this.bookname === book.name) {
            return book.shortname;
          }
        }
      }
      throw new Error('Book not found');
    },

    selected() {
      return this.records[this.shortname] || [];
    },
  },

  watch: {
    bookname: {
      immediate: true,
      handler(title) {
        if (typeof title === 'string') {
          uni.setNavigationBarTitle({
            title,
          });
        }
      },
    },
  },

  methods: {
    ...mapMutations('record', ['ADD_RECORD', 'DEL_RECORD']),

    setChapter(chapter, selected) {
      const record = {
        bookId: this.shortname,
        chapter,
      };
      this[selected ? 'ADD_RECORD' : 'DEL_RECORD'](record);
    },
  },
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

.chapter__selected {
  color: $uni-bg-color;
  background-color: rgba($uni-color-primary, 0.4);
}
</style>
