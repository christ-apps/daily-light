<template>
  <uni-list>
    <uni-list-item title="今日打卡" @click="add" />
    <uni-list-item title="打卡记录" />
  </uni-list>
</template>

<script>
import UniList from "../components/uni-list/uni-list";
import UniListItem from "../components/uni-list-item/uni-list-item";
export default {
  components: {
    UniList,
    UniListItem
  },

  methods: {
    add() {
      uni.navigateTo({
        url: 'check-in/book'
      })
    }
  }
};
</script>