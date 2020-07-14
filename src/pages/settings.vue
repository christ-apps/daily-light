<template>
  <view class="page">
    <title-bar>打卡提醒</title-bar>
    <uni-list>
      <uni-list-item
        title="开启打开提醒"
        show-switch
        :switch-checked="notify"
        :show-arrow="false"
        @switchChange="notify = $event.value"
      />
      <picker
        mode="time"
        :disabled="!notify"
        :value="notifyTime"
        @change="notifyTime = $event.detail.value"
      >
        <uni-list-item
          title="提醒时间"
          :note="notifyTime"
          :disabled="!notify"
        />
      </picker>
    </uni-list>
    <!-- #ifdef APP-PLUS || MP-WEIXIN || MP-QQ || MP-BAIDU -->
    <title-bar>帮助与反馈</title-bar>
    <uni-list>
      <!-- #ifdef MP-WEIXIN || MP-BAIDU-->
      <uni-list-item title="联系客服">
        <button :style="buttonStyle" open-type="contact" plain />
      </uni-list-item>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS || MP-WEIXIN || MP-QQ -->
      <uni-list-item title="意见反馈">
        <button :style="buttonStyle" open-type="feedback" plain />
      </uni-list-item>
      <!-- #endif -->
    </uni-list>
    <!-- #endif -->
  </view>
</template>

<script>
import TitleBar from '@/components/title-bar';
import UniList from '@/components/uni-list/uni-list';
import UniListItem from '@/components/uni-list-item/uni-list-item';
import calcStyle from '@/util/calc-style';
export default {
  components: {
    TitleBar,
    UniList,
    UniListItem,
  },

  data() {
    return {
      notify: false,
      notifyTime: '20:30',
      buttonStyle: calcStyle({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '750rpx',
        height: '100%',
        opacity: 0,
      }),
    };
  },
};
</script>
