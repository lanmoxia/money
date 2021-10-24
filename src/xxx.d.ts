type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型
  createdAt?: Date // TS 中出了基本类型 还可以写类 类是类型下的分支  => 相当于 JS 中的构造函数
}