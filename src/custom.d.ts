type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型
  createdAt?: Date // TS 中出了基本类型 还可以写类 类是类型下的分支  => 相当于 JS 中的构造函数
}
// 这里定义 tagList 类型需要 Tag 把 Tag 和一些类型数据复制过来
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
  remove: (id: string) => boolean
  save: () => void
}

// 这里声明 tagList 绑定到 window 上
interface window {
  tagList: Tag[];
}