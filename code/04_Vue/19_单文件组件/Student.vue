<template>
  //组件的结构
  <div class="demo">
    <h2>学生姓名:{{studentName}}</h2>
    <h2>学生年龄:{{age}}</h2>
    <button @click="showName">点我提示学校名</button>
  </div>
</template>

<script>
  export default {
    name:'Student',/*最好和文件名统一*/
    data(){
      return {
        studentName:'Tom',
        age:16
      }
    }
  }
  /*export {school} 统一暴露*/
</script>
