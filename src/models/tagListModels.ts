// 这个 model 有自己的 data 自己维护 data 外部需要创建或保存只需要使用这里的函数PAI即可
const localStorageKeyName = 'tagList';

type Tag = {
  id: string;
  name: string;
}
// 这里定义类型
type TagListModel = {
  data: Tag[],
  fetch: () => Tag[],
  create: (name: string) => 'success' | 'duplicated',// 这里可以防止外部使用拼写错误 拼写错误会提示
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
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
    // 现在的 data 应该是这个样子：this.data = [{id:1, name:1},{id:2, name:2}]
    // 这里要获取 name 就不能以 data 来获取了 要先获取 data 中所有的 name
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) { // 如果标签名重复了
      return 'duplicated';
    }
    // 传入 li push li 再保存 labels 只需要使用 tagListModel.create(name)
    this.data.push({id: name, name: name}); // 这里以后会是 {id: 1/2/3…, name: name} 需要 ID 生成器
    this.save();
    return 'success';
  },
    update(id: string, name: string) {
      const idList = this.data.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          return 'duplicated';
        } else {
          const tag = this.data.filter(item => item.id === id)[0];
          tag.name = name;
          this.save();
          return 'success';
        }
      } else {
        return 'not found';
      }
    },
// 保存数据
    save() {
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
  }
;
export default tagListModel;
//export {model};