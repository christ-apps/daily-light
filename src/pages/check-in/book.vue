<template>
  <view class="page">
    <view class="bookshelf" v-for="shelf in books" :key="shelf.shelfname">
      <title-bar>{{shelf.shelfname}}</title-bar>
      <view class="books">
        <navigator
          class="book"
          v-for="book in shelf.books"
          :key="book.shortname"
          :url="`chapter?bookname=${book.name}&chapterCount=${book.count}`"
        >
          <view class="short-name">{{book.shortname}}</view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import TitleBar from "@/components/title-bar";
export default {
  components: {
    TitleBar
  },

  data() {
    return {
      books: null
    };
  },

  onReady() {
    this.books = [
      {
        shelfname: "旧约",
        books: [
          "创|创世记|50",
          "出|出埃及记|40",
          "利|利未记|27",
          "民|民数记|36",
          "申|申命记|34",
          "书|约书亚记|24",
          "士|士师记|21",
          "得|路得记|4",
          "撒上|撒母耳记上|31",
          "撒下|撒母耳记下|24",
          "王上|列王纪上|22",
          "王下|列王纪下|25",
          "代上|历代志上|29",
          "代下|历代志下|36",
          "拉|以斯拉记|10",
          "尼|尼希米记|13",
          "斯|以斯帖记|10",
          "伯|约伯记|42",
          "诗|诗篇|150",
          "箴|箴言|31",
          "传|传道书|12",
          "歌|雅歌|8",
          "赛|以赛亚书|66",
          "耶|耶利米书|52",
          "哀|耶利米哀歌|5",
          "结|以西结书|48",
          "但|但以理书|12",
          "何|何西阿书|14",
          "珥|约珥书|3",
          "摩|阿摩司书|9",
          "俄|俄巴底亚书|1",
          "拿|约拿书|4",
          "弥|弥迦书|7",
          "鸿|那鸿书|3",
          "哈|哈巴谷书|3",
          "番|西番雅书|3",
          "该|哈该书|2",
          "亚|撒迦利亚书|14",
          "玛|玛拉基书|4"
        ].map(book => {
          const [shortname, name, count] = book.split("|");
          return {
            shortname,
            name,
            count: Number(count)
          };
        })
      },
      {
        shelfname: "新约",
        books: [
          "太|马太福音|28",
          "可|马可福音|16",
          "路|路加福音|24",
          "约|约翰福音|21",
          "徒|使徒行传|28",
          "罗|罗马书|16",
          "林前|哥林多前书|16",
          "林后|哥林多后书|13",
          "加|加拉太书|6",
          "弗|以弗所书|6",
          "腓|腓立比书|4",
          "西|歌罗西书|4",
          "帖前|帖撒罗尼迦前书|5",
          "帖后|帖撒罗尼迦后书|3",
          "提前|提摩太前书|6",
          "提后|提摩太后书|4",
          "多|提多书|3",
          "门|腓利门书|1",
          "来|希伯来书|13",
          "雅|雅各书|5",
          "彼前|彼得前书|5",
          "彼后|彼得后书|3",
          "约一|约翰一书|5",
          "约二|约翰二书|1",
          "约三|约翰三书|1",
          "犹|犹大书|1",
          "启|启示录|22"
        ].map(book => {
          const [shortname, name, count] = book.split("|");
          return {
            shortname,
            name,
            count: Number(count)
          };
        })
      }
    ];
  }
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
}
</style>