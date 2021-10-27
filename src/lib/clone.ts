// 项目任何地方需要克隆就引用这个文件就可以
function clone(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export default clone;