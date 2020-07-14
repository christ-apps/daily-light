/**
 * 自动注入url中的query参数值到data中
 * @example
 * // 在main.js中注册插件
 * import queryData from 'path-to/query-data'
 * Vue.use(queryData, {
 *   // 此处可自定义key值，不设置则使用默认值`queryData`
 *   dataKey: 'queryData'
 * })
 *
 * // 在页面组件中接收
 * export default {
 *   // 接收参数的类型只支持`String`和`Number`
 *   queryData: {
 *     name: String,
 *     id: Number
 *   },
 *
 *   // 也可以传字符串数组，接收类型为`String`
 *   // queryData: ['name'],
 *
 *   // 在data段中可定义默认值
 *   data() {
 *     return {
 *       name: '默认值'
 *     }
 *   }
 * }
 *
 * // 打开页面并传参
 * // id会转换成数字被接收
 * // name传了一个空字符串，因此不会使用默认值
 * // unuse参数未在组件中定义，不会被接收
 * uni.navigateTo(`pages/some/page?id=1&name=&unuse=xxx`)
 */
export default {
  install(Vue, options) {
    const dataKey = (options && options.dataKey) || 'queryData';
    Vue.mixin({
      data() {
        const data = {};
        const config = this.$options[dataKey];
        if (Array.isArray(config)) {
          for (const prop of config) {
            if (typeof prop === 'string') {
              data[prop] = void 0;
            }
          }
        } else if (typeof config === 'object' && config !== null) {
          for (const prop of Object.keys(config)) {
            if (typeof prop === 'string') {
              data[prop] = void 0;
            }
          }
        }
        return data;
      },

      onLoad(option) {
        const config = this.$options[dataKey];
        if (Array.isArray(config)) {
          for (const prop of config) {
            if (typeof prop === 'string' && typeof option[prop] === 'string') {
              this[prop] = option[prop];
            }
          }
        } else if (typeof config === 'object' && config !== null) {
          for (const [prop, type] of Object.entries(config)) {
            if (typeof option[prop] !== 'string') continue;
            switch (type) {
              case Number:
                this[prop] = Number(option[prop]);
                break;
              default:
                this[prop] = option[prop];
                break;
            }
          }
        }
      },
    });
  },
};
