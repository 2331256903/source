/**
 * windows默认不允许npm全局命令执行脚本文件, 在powershell中无法使用nodemon, 所以要修改执行策略
 * 1. 以管理员身份打开powershell命令行
 * 2. 执行 set-ExecutionPolicy remoteSigned
 * 3. 输入A回车
 * 4. 重启Node服务
 * */
