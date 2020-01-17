<template>
  <uni-list>
    <navigator url="book">
      <uni-list-item title="今日打卡" />
    </navigator>
    <navigator url="history">
      <uni-list-item title="打卡记录" />
    </navigator>
  </uni-list>
</template>

<script>
import UniList from "@/components/uni-list/uni-list";
import UniListItem from "@/components/uni-list-item/uni-list-item";
export default {
  components: {
    UniList,
    UniListItem
  }
};
</script>