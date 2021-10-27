// 这个 model 没有保存自己的 data 是以参数和返回值的形式
// recordList 变成一个常量 这样防止被人修改
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  // 这里就几个方法 我们不使用 type 定义类型 直接断言强制指定类型即可
  data: [] as RecordItem[],

  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    console.log(record2);
  },
  // 获取数据
  fetch() {
    // 定义 data 外不适用data 直接使用这个 model 上的 data即可
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    // 这里断言，强制类型，这样就可以确定 fetch 的返回值类型 后边就会根据断言推测
    return this.data;
  },
  // 保存数据
  // save 也不需要 data 了 保存的时候保存自己的 data 就可以了 所有的操作都封装到自己的model上了
  save() {
    // 这里 data 就是用自己的data
    // 更新 data 的时候也不要动我的 data 如果要创建可以定义一个create函数 都使用这个model的 API来做
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default recordListModel;
