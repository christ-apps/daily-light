/**
 * 生成style字符串
 * @param {string|{[prop: string]: string}|any[]} style 样式
 * @returns {string} 样式字符串
 * @example
 * // 引入
 * import calcStyle form './path-to/calc-style.js'
 * // 对象语法
 * calcStyle({ color: '#333', fontSize: '30px' })
 * // 数组语法
 * calcStyle([{ color: '#333' }, { fontSize: '30px' }])
 * // 字符串语法
 * calcStyle('color: #333; fontSize: 30px;')
 * // 混合语法
 * calcStyle([[{ color: '#333' }], 'fontSize: 30px;'])
 */
export default function calcStyle(style) {
  const styleObject = calcStyleObject(style);
  const styleStrArr = [];
  for (const [prop, value] of Object.entries(styleObject)) {
    styleStrArr.push(`${prop}:${value};`);
  }
  return styleStrArr.join('');
}

/**
 * 生成style对象
 * @param {string|{[prop: string]: string}|any[]} style 样式，格式同上方`calcStyl`
 * @returns {{[prop: string]: string}} 样式对象
 */
const calcStyleObject = style => {
  const styleObject = {};
  if (typeof style === 'string') {
    for (const item of style.split(';')) {
      let [prop, value] = item.split(':');
      prop = prop.trim();
      value = value.trim();
      styleObject[prop] = value;
    }
    return styleObject;
  }
  if (Array.isArray(style)) {
    return Object.assign(
      styleObject,
      ...style.map(item => calcStyleObject(item)),
    );
  }
  if (typeof style === 'object' && style !== null) {
    for (let [prop, value] of Object.entries(style)) {
      prop = prop.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
      styleObject[prop] = value;
    }
    return styleObject;
  }
  return {};
};
