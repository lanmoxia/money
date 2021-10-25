// 这个 model 有自己的 data 自己维护 data 外部需要创建或保存只需要使用这里的函数PAI即可

const localStorageKeyName = 'tagList';
// 这里定义类型
type TagListModel = {
  data: string[],
  fetch: () => string[],
  create: (name: string) => boolean,
  save: () => void
}
// 这里把上边大写 TagListModel 和这里的 tagListModel 关联起来
//下边的就不需要写数据类型了
const tagListModel: TagListModel = {
  data: [],
  // 获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  // 创建标签
  create(name: string) {
    if (this.data.indexOf(name) >= 0) { // 如果标签名重复了
      throw new Error('duplicated');
    }
    // 传入 li push li 再保存 labels 只需要使用 tagListModel.create(name)
    this.data.push(name);
    this.save();
    return true;
  },
  // 保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;
//export {model};