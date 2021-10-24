// recordList 变成一个常量 这样防止被人修改
const localStorageKeyName = 'recordList';
const model = {
  // 获取数据
  fetch() {
    // recordList 变成一个常量 这样防止被人修改
    return JSON.parse(window.localStorage.getItem(localStorage) || '[]');
  },
  // 保存数据
  save(data) {
    // recordList 变成一个常量 这样防止被人修改
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};
//export default model;
export {model};