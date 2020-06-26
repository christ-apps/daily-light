import Vue from "vue";
import App from "./App";
import queryData from "./plugins/query-data";
import store from "./store";

Vue.config.productionTip = false;

// 自动注入url参数值到对应的data属性
Vue.use(queryData);

App.mpType = "app";

const app = new Vue({
  store,
  ...App
});
app.$mount();
