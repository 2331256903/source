/* crypto模块的目的是为了提供通用的加密和hash算法, 用纯JS代码实现这些功能速度会非常慢, Node.js用C/C++实现这些算法后, 通过crypto这个模块暴露为JS接口,
* 运行速度快, 使用方便
* */

/* MD5和SHA1 */
/* MD5是一种常见的hash算法, 本质上是用于给任意数据一个"签名", 这个签名通常用一个十六进制的字符串表示, MD5在算法上是单向加密的, 所以一般用于加密而不用于解密
* 后台只需要对比前台传来的明文是否和后台的密文是否相同即可, 这个网站可以用于解密MD5(通过碰撞方式对比秘文: 比如暴力枚举, 字典法, 彩虹表法等): https://www.sojson.com/encrypt_md5.html
*  */
const crypto = require('crypto')
// 创建一个密码流, 该流用于加密数据
const hash = crypto.createHash('md5')
// 可任意多次调用update() 写入要加密的数据到密码流中
hash.update('Hello world!')
hash.update('Hello nodejs!')
// 调用digest算法生成加密数据
console.log(hash.digest('hex')) // 841cf354706fe86046523d85d9be09ac
/* update() 方法默认字符串编码为utf-8, 也可以传入Buffer */
/* 如果要计算SHA1, 只需要把'md5'改成'sha1', 就可以得到SHA1的结果, 还可以使用更为安全的sha256和sha512 */

/* Hmac */
/* Hmac也是一种哈希算法, 它可以利用MD5或SHA1等hash算法, 不同的是, Hmac还需要一个密钥 */
const hmac = crypto.createHmac('sha256', 'secret-key')
hmac.update('Hello world')
hmac.update('Hello Nodejs')
console.log('hex')
/* 只要密钥发生了变化, 那么同样的输入数据也会得到不同的签名, 因此可以把Hmac理解为用随机数增强的'Hash'算法 */

/* AES */
/* AES是一种常用的对称加密算法, 加解密都用同一个密钥, crypto模块提供了AES支持, 但是需要自己封装好函数, 便于使用 */
function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key)
  let crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}
function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
let data = 'Hello, this is a secret message!'
let key = 'Password!'
let encrypted = aesEncrypt(data, key)
let decrypted = aesDecrypt(encrypted, key)
console.log('Plain text: ' + data)
console.log('Encrypted text: ' + encrypted)
console.log('Decrypted text: ' + decrypted)
/*
*   上例可以注意到AES有很多不同的算法, 如aes192, aes-128-ecb, aes-256-cbc等, AES除了密钥外还可以指定IV(Initial Vector), 不同的系统只要IV不同
* , 用相同的密钥加密相同的数据得到的加密结果也是不同的, 加密结果通常有两种表示方法, hex和base64, 这些功能Nodejs全部都支持, 但是应用中注意:
* 如果加解密双方一方用Nodejs, 一方用Java, PHP等其他语言, 需要仔细测试, 如果无法正常解密, 要确认双方是否遵循同样的AES算法, 字符串密钥和IV是否相同,
* 加密后的数据是否统一为hex 或 base64格式
* */

/* Diffie-Hellman */
/*
*   DH算法是一种密钥交换协议, 它可以在双方不泄露密钥的情况下协商出一个密钥来, DH算法基于数学原理, 比如甲乙双方想要协商一个密钥:
*   1. 甲先选一个素数和一个底数, 例如 p=23, g=5(底数可以任选), 再选择一个秘密整数a=6, 计算A=g^a mod p = 8, 然后告诉乙p=23,g=5,A=8
*   2. 乙收到三个数后, 也选一个秘密整数b=15, 然后计算B=g^b mod p = 19, 并告诉甲B=19
*   3. 甲自己计算出s=B^a mod p = 2, 乙也自己计算出s=A^a mod p = 2 因此最终协商的密钥s为2
*   整个过程中, 密钥2是双方协商计算出来的, 第三方无法得知双方的秘密整数, 因此无法计算出密钥2
* */
// crypto模块实现DH算法
let ming = crypto.createDiffieHellman(512)
let ming_keys = ming.generateKeys()

let prime = ming.getPrime()
let generator = ming.getGenerator()

console.log('Prime: ' + prime.toString('hex'))
console.log('Generator: ' + generator.toString('hex'))

let hong = crypto.createDiffieHellman(prime, generator)
let hong_keys = hong.generateKeys()

// 交换和生成密钥
let ming_screct = ming.computeSecret(hong_keys)
let hong_screat = hong.computeSecret(ming_keys)

// 打印密钥
console.log('Secret of Xiao Ming: ' + ming_screct.toString('hex'))
console.log('Secret of Xiao Hong: ' + hong_screat.toString('hex'))
/* 可以注意到每次输出都不一样, 因为素数的选择是随机的 */


/* RSA */
/* RSA是一种非对称加密算法, 即由一个私钥和一个公钥构成的密钥对, 通过私钥加密, 公钥解密, 或者通过公钥加密, 私钥解密, 其中, 公钥可以公开, 私钥必须保密 */
/* 当甲给乙发送消息时, 可以用甲自己的私钥加密, 乙用甲的公钥解密, 也可以甲用乙的公钥加密, 乙用自己的私钥解密, 这就是非对称加密; 相比于对称加密,
* 非对称加密只要每个人各自持有自己的私钥, 同时公开自己的公钥, 不需要像AES那样由两个人共享一个密钥
*  */
// 在使用Node进行RSA加密前, 需要准备好私钥和公钥
// openssl genrsa -aes256 -out rsa-key.pem 2048
/* 根据提示输入密码, 这个密码是用来加密RSA密钥的, 加密方式指定为AES256, 生成的RSA的密钥长度是2048位, 执行成功后获取rsa-key.pem文件 */
// 根据上面的rsa-key.pem加密文件, 可以导出原始的私钥
// openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
/* 输入第一步的密码, 获得了解密后的私钥, 类似的, 通过下面的命令导出原始的公钥 */
// openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
/* 由此就准备好了原始私钥文件rsa.prv.pem和原始的公钥文件rsa-pub.pem, 编码格式均为pem */

// 使用crypto模块方法, 实现非对称加密
const fs = require('fs')
// 从文件加载key
function loadKey(file) {
  // key实际上就是PEM编码的字符串
  return fs.readFileSync(file, 'utf8')
}

let
  prvKey = loadKey('./rsa-prv.pem')
  pubKey = loadKey('./rsa-pub.pem')
  message = 'Hello World!'

// 使用私钥加密
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'))
console.log('Encrypted by public key: ' + enc_by_prv.toString('hex'))
let dev_by_pub = crypto.publicDecrypt(pubKey,  enc_by_prv)
console.log('Decrypted by public key: ' + dev_by_pub.toString('utf8'))
// 执行后可以得到解密后的消息, 与原始消息相同, 公钥加密私钥解密同理

/* 如果把message字符串的长度增加到很长, 例如1M, 此时执行RSA加密会得到衣蛾类似的错误: data too large for key size, 这是因为RSA加密的原始信息
* 必须小于key的长度; 实际上RSA不适合加密大数据, 而是先生成一个随机的AES密码, 用AES加密原始信息, 然后用RSA加密AES口令, 这样实际使用RSA时, 给
* 对方传的密文分为两部分, 一部分是AES加密的密文, 另一部分是RSA加密的AES口令, 对方先用RSA先解密出AES口令, 再使用AES解密密文, 即可获得明文
*  */


/* crypto也可以处理数字证书, 数字证书通常用在SSL连接, 也就是Web的https连接, 一般情况下https连接只需要处理服务器端的单向认证, 如无特殊需求(
例如自己作为Root给客户发认证证书), 建议用反向代理服务器Nginx等Web服务器去处理证书 */
