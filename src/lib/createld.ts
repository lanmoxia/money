// 假设第一次进页面生成了 1~5 个 id
// 刷新页面 1~5 后边加个 1 还是重复
// let id = 0;

//把最后生成的 id 存到 localStorage 中
// let id = window.localStorage.getItem('_inMax') || 0;
// ID 中最大值如果获取到了就是最后的 ID 再最后 ID 加一即可 如果没有获取保底是 0
// 获取的 ID 是字符串 我们要定义 id 为 number 类型 然后 parseInt 一下
//这时还不行 parseInt 只能是字符串 有可能是 NAN 的东西 所以我们保底值为字符串 `0`
// 两个 0 里边的保底是字符串 外边的保底是个数字 0
let id: number = parseInt(window.localStorage.getItem('_inMax') || '0') || 0;

function createId() {
  id++;
  // 把 id 存到 localStorage
  window.localStorage.setItem('_idMax', id.toString());
  return id;
}

export default createId;