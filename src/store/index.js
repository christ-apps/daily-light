import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * 根据目录结构生成 store 配置对象，例如：
 *
 * store
 * ├─ index.js
 * ├─ state.js
 * ├─ getters.js
 * ├─ actions.js
 * └─ modules
 *    ├─ user.js
 *    └─ app
 *        ├─ state
 *        |   ├─ width.js
 *        │   └─ height.js
 *        └─ getters
 *            └─ size.js
 *
 * 生成的配置：
 *
 * {
 *   state: {},
 *   getters: {},
 *   actions: {},
 *   modules: {
 *     user: {
 *       namespaced: true
 *     },
 *     app: {
 *       namespaced: true
 *       state: {
 *         width: ...,
 *         height: ...
 *       },
 *       getters: {
 *         size: ...
 *       }
 *     }
 *   }
 * }
 *
 * 文件格式为：
 *
 * export default {
 *   token: '',
 *   userInfo: {}
 * }
 *
 * 或（const 也可改为 let）：
 *
 * export const token = ''
 * export const userInfo = ''
 */
const options = {};

const r = require.context('.', true, /\.js$/);
for (const key of r.keys()) {
  const names = key.slice(2, -3).split('/');
  // 上下文对象
  let context = options;
  /**
   * 当前文件名代表的类型，可能值为：
   * | 取值        | 循环变量 `name` 的含义 | 上下文对象 `context` 的含义       |
   * | ----------- | ---------------------- | --------------------------------- |
   * | `store`     | store 模块中的一个属性 | 一个 store 模块配置对象            |
   * | `state`     | state 对象中的一个属性 | store 模块中的 state 属性对象      |
   * | `getters`   | 一个 getter 的名字     | store 模块中的 getters 属性对象   |
   * | `mutations` | 一个 mutation 的名字   | store 模块中的 mutations 属性对象 |
   * | `actions`   | 一个 action 的名字     | store 模块中的 actions 属性对象   |
   * | `modules`   | 一个 module 的名字     | store 模块中的 modules 属性对象   |
   * @type {'store' | 'state' | 'getter' | 'mutation' | 'action' | 'module'}
   */
  let type = 'store';
  for (const [index, name] of names.entries()) {
    // 必须是对象才处理（因为 state 可能是函数）
    if (!context || typeof context !== 'object') break;
    // 检查 name 属性的合法性
    if (
      type === 'store' &&
      ![
        'namespaced',
        'state',
        'getters',
        'mutations',
        'actions',
        'modules',
      ].includes(name)
    ) {
      break;
    }
    const isFile = index + 1 === names.length;
    if (isFile) {
      context = context[name] = r(key).default || { ...r(key) };
      if (type === 'modules' && typeof context.namespaced !== 'boolean') {
        context.namespaced = true;
      }
    } else if (type === 'store' && name !== 'namespaced') {
      context = context[name] = context[name] || {};
      type = name;
    } else if (type === 'modules') {
      context = context[name] = context[name] || {};
      if (typeof context.namespaced !== 'boolean') {
        context.namespaced = true;
      }
      type = 'store';
    } else {
      break;
    }
  }
}

export default new Vuex.Store(options);
