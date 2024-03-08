// 可选链操作符,  ?.  , 用于应对对象类型的参数深度层级比较深的场合, 使用 ?. 后不需要进行层级的判断
function main(config) {
  // const dbHost = config && config.db && config.db.host
  const dbHost = config ?. db ?. host // 此处的 ?. 作用, 如果有config属性, 才会去读取后面的 db 属性, 同理 db 存在时才会去读取后面的 host 属性
  // 这样就免去层层判断的麻烦
  
  // 此时调用时无法判断db中的host等属性是否有值, 如果没有值会报错
  console.log(dbHost)
}

main({
  db: {
    host: '192.168.1.100',
    username: 'username'
  },
  cache: {
    host: '1192.168.1.200',
    username: 'admin'
  }
})