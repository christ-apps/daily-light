// 自动注入url中的query参数值到data中
export default {
  install(Vue, options) {
    const dataKey = (options && options.dataKey) || "queryData";
    Vue.mixin({
      data() {
        const data = {};
        const config = this.$options[dataKey];
        if (Array.isArray(config)) {
          for (const prop of config) {
            if (typeof prop === "string") {
              data[prop] = null;
            }
          }
        } else if (typeof config === "object" && config !== null) {
          for (const [prop, value] of Object.entries(config)) {
            if (typeof value === "function") {
              data[prop] = getDefaultValue(value);
            } else if (typeof value === "object" && value !== null) {
              if (typeof value.default !== "undefined") {
                data[prop] = value.default;
              } else {
                data[prop] = getDefaultValue(value.type);
              }
            } else {
              data[prop] = null;
            }
          }
        }
        return data;
      },

      onLoad(option) {
        const config = this.$options[dataKey];
        if (Array.isArray(config)) {
          for (const prop of config) {
            if (typeof prop === "string" && typeof option[prop] === "string") {
              this[prop] = option[prop];
            }
          }
        } else if (typeof config === "object" && config !== null) {
          for (const [prop, type] of Object.entries(config)) {
            if (typeof option[prop] !== "string") continue;
            if (typeof type === "object" && type !== null) {
              type = type.type;
            }
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
      }
    });
  }
};

const getDefaultValue = type => {
  if (Array.isArray(type)) {
    if (type.length === 1) {
      return getDefaultValue(type[0]);
    }
    return null;
  }
  switch (type) {
    case String:
      return "";
    case Number:
      return 0;
    case Boolean:
      return false;
    case Array:
      return [];
    default:
      return null;
  }
};
