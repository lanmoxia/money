// 这个 model 没有保存自己的 data 是以参数和返回值的形式

// recordList 变成一个常量 这样防止被人修改
const localStorageKeyName = 'recordList';
const recordListModel = {
  // 深拷贝
  clone(data: RecordItem[] | RecordItem) {// 可以传一个数组 也可以传一项
    return JSON.parse(JSON.stringify(data));
  },
  // 获取数据
  fetch() {
    // 这里断言，强制类型，这样就可以确定 fetch 的返回值类型 后边就会根据断言推测
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  // 保存数据
  save(data: RecordItem[]) {
    // recordList 变成一个常量 这样防止被人修改
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};
export default recordListModel;
//export {model};