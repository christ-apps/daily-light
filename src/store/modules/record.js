import Vue from "vue";

export const state = () => ({
  records: uni.getStorageSync("APP_RECORDS") || {},
});

export const mutations = {
  ADD_RECORD({ records }, record) {
    const { bookId, chapter } = record;
    if (!records[bookId]) {
      Vue.set(records, bookId, []);
    }
    Vue.set(records[bookId], chapter, chapter);
    uni.setStorageSync("APP_RECORDS", records);
  },

  DEL_RECORD({ records }, record) {
    const { bookId, chapter } = record;
    Vue.set(records[bookId] || [], chapter, 0);
    uni.setStorageSync("APP_RECORDS", records);
  },
};
