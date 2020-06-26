import Vue from "vue";

export const state = () => ({
  records: uni.getStorageSync("APP_RECORDS") || {}
})

export const mutations = {
  SET_RECORD({ records }, record) {
    const { bookid, chapter, selected } = record;
    if (!records[bookid]) {
      Vue.set(records, bookid, [])
    }
    Vue.set(records[bookid], chapter, selected);
    uni.setStorageSync("APP_RECORDS", records);
  }
}
