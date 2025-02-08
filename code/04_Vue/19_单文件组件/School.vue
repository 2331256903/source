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

  /**
   * 通过Prop向子组件传递数据
   *  Prop是可以在组件上注册的一些自定义attribute, 当一个值传递给一个prop attribute的时候, 它就变成了那个组件实例的一个property
   *  eg: Vue.component('blog-post', {
   *        props: ['title'],
   *        template: '<h3>{{ title }}</h3>'
   *      })
   *  一个组件默认可以拥有任意数量的prop,任何值都可以传递给任何prop, 在上述模板中, 可以在组件实例中访问这个值, 就像访问data中的值一样
   *  一个prop被注册之后, 就可以把数据作为一个自定义attribute传递进来:
   *    <blog-post title="My journey with Vue"></blog-post>
   *    <blog-post title="Blogging with vue"></blog-post>
   *    <blog-post title="Why Vue is so fun"></blog-post>
   *  然而在一个典型的应用中, 肯呢个在data中有一个博文的数组:
   *    new Vue({
   *      el: '#blog-post-demo',
   *      data: {
   *        posts: [
   *          { id: 1, title: "My journey with Vue" },
   *          { id: 2, title: "Blogging with vue" },
   *          { id: 3, title: "Why Vue is so fun" }
   *        ]
   *      }
   *    })
   *  并且想为每篇博文渲染一个组件:
   *    <blog-post
   *      v-for="post in posts"
   *      v-bind:key="post.id"
   *      v-bind:title="post.title"
   *    ></blog-post>
   *  如上所示, 可以使用v-bind动态传递prop, 这在一开始不清楚要渲染的具体内容, 比如从一个API获取博文列表的时候非常有用
   *  但当组件越来越复杂时, 为每个相关信息定义一个prop会变得非常麻烦, 此时v-bind:post="post"绑定一个对象, 让他接受一个单独的post prop,
   *  现在不论何时为post对象添加一个新的property都会自动地在<blog-post>内可用
   * */

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
<!-- 组件的样式 -->
<style>
  .demo {
    background-color: orange;
  }
</style>
