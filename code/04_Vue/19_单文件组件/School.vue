<template>
  //组件的结构
  <div class="demo">
    <h2>学校名称:{{schoolName}}</h2>
    <h2>学校地址:{{address}}</h2>
    <button @click="showName">点我提示学校名</button>
  </div>
</template>

<script>
  //组件交互相关代码(数据,方法等)
  /*export const school = Vue.extend({分别暴露*/

  /*默认暴露*/
  /*export default Vue.extend({
    data(){
      return {
        schoolName:'baidu',
        address:'hefei'
      }
    },
    methods:{
      showName(){
        alert(this.schoolName)
      }
    }
  })*/

  /*直接省略Vue.extend*/
  export default {
    name:'School',/*最好和文件名统一*/
    data(){
      return {
        schoolName:'baidu',
        address:'hefei'
      }
    },
    methods:{
      showName(){
        alert(this.schoolName)
      }
    }
  }
  /*export {school} 统一暴露*/
</script>

<style>
  //组件的样式
  .demo {
    background-color: orange;
  }
</style>