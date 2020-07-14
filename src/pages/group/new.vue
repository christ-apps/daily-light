<template>
  <view class="page">
    <scroll-view class="content-area" scroll-y>
      <title-bar>基本信息</title-bar>
      <uni-list>
        <navigator
          :url="
            `/pages/modal/input?title=设置群昵称&value=${groupName}&label=群名称&maxlength=20&callback=setGroupName`
          "
        >
          <uni-list-item title="群名称" :note="groupName" />
        </navigator>
        <uni-list-item
          title="群邀请确认"
          note="启用后，新成员入群时需要经过群主确认"
          show-switch
          :switch-checked="inviteConfirm"
          :show-arrow="false"
          @switchChange="inviteConfirm = $event.value"
        />
      </uni-list>
      <title-bar>排行有效时间</title-bar>
      <uni-list>
        <picker
          mode="date"
          :value="startDate"
          :start="today"
          @change="startDate = $event.detail.value"
        >
          <uni-list-item title="开始日期" :note="startDate" />
        </picker>
        <picker
          mode="date"
          :value="endDate"
          :start="today"
          @change="endDate = $event.detail.value"
        >
          <uni-list-item title="结束日期" :note="endDate" />
        </picker>
      </uni-list>
    </scroll-view>
    <view class="page-footer">
      <button type="primary">确认</button>
    </view>
  </view>
</template>

<script>
import TitleBar from '@/components/title-bar';
import UniList from '@/components/uni-list/uni-list';
import UniListItem from '@/components/uni-list-item/uni-list-item';
import dayjs from 'dayjs';
export default {
  components: {
    TitleBar,
    UniList,
    UniListItem,
  },

  data() {
    return {
      groupName: '',
      inviteConfirm: true,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs()
        .add(1, 'year')
        .format('YYYY-MM-DD'),
      today: dayjs().format('YYYY-MM-DD'),
    };
  },

  methods: {
    setGroupName(name) {
      this.groupName = name;
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

.content-area {
  flex: 1;
}

.page-footer {
  padding: 15rpx;
}
</style>
