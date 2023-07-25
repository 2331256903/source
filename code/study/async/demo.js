// function ajax(){
//   let xhr = new  XMLHttpRequest()
//       xhr.onreadystatechange=function () {
//         if(xhr.readyState===4&&xhr.status===200){
//           console.log(xhr.response)
//         }
//       }
//       // let data = {
//       //   a: '1',
//       //   b: 'this is it'
//       // }
//       let form = new FormData()
//       form.append('a','1')
//       xhr.open('post','index.php')
//       xhr.setRequestHeader('content-type','application/x-www-formurlencoded')
//       // xhr.send('a=1&b=2')
//       xhr.send(form)
// }



// let img = new Image()
// img.onload=function () {
//   console.log(img.width)
// }
// img.src='https://img1.baidu.com/it/u=4178205270,1737416386&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689008400&t=c61e8f0b96adc7092110ef7790399916'

let promise = new Promise((resolve, reject) => {

})
Promise.all([])

promise.then(()=>{}).catch(()=>{})

// async function f() {
//   await ....
// }

// let i=0
// for(;i<5;i++){
//   ((i)=>{
//     setTimeout(()=>{
//       console.log(i);
//     })
//   })(i)
// }

let axios = require('axios')
axios.get('http://localhost:8080').then