var express = require('express');
var router = express.Router();
// 导入formidable
/** formidable可以完成body-parser所能完成的一些功能 */
const formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 显示网页的(表单)
router.get('/portrait', (req, res) => {
  res.render('portrait')
})

// 处理文件上传
router.post('/portrait', (req, res) => {
  // 创建表单对象
  const form = formidable({
    multiple: true,
    // 设置上传文件的保存目录
    uploadDir: __dirname + '/../public/images',
    // 保持文件后缀
    keepExtensions: true
  })
  // 解析请求报文, 并将结果放在fields和files里
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    // console.log(fields) // fields存储一般字段(即除了文件上传之外的字段), 比如radio, checkbox, text等
    // console.log(files) // files存储所有file类型的数据
    // /images/0ffe6d2bed5a93833eeec9a00.png
    // 服务器保存该图片的访问URL
    let url = '/images/' + files.portrait.newFilename // 将来将此数据保存在数据库中
    /** 服务器通常对上传的文件和数据做保存处理, 通常保存在网站根目录(静态资源目录public) */
    res.send('OK')
  })
})

module.exports = router;
