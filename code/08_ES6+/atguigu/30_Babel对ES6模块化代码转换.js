// Babel是编写下一代JS的编译器, 默认使用一组ES2015语法转换器, 使得使用新的ES可以不用等待浏览器的兼容性支持
/*
* 一.安装工具
*   1. babel-cli  babel命令行工具
*   2. babel-preset-env  babel预设包可以将最新的ES特性转化为ES5的语法
*   3. browserify  babel打包工具, 通常项目中使用webpack进行打包
*
* 二.执行 npx(局部) babel + 源文件目录 -d + 需要存到的文件夹位置 + --preset=babel-preset-env  进行转化
* 三.打包(转化完的入口文件也不能运行, 因为require语法不识别) npx browserify + 入口文件 -o + 输出的位置
* 后续html引入文件就引入打包后的文件
* */