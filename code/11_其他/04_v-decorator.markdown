## v-decorator

​	v-decorator是`Ant Design Vue`用于表单验证的控件验证属性, 允许开发者通过一系列预定义的规则来验证表单项的值, 使用v-decorator可以简化表单验证过程, 是的开发者不需要手动处理每个表单项的变化和验证逻辑

​	v-decorator方法接受一个数组作为参数, 数组的第一个元素是表单项的绑定字段名, 第二个元素是配置对象, 包含`initalValue`, `rules`和`trigger`等属性

​	rules: 表单项的验证规则, 可以是一个数组, 每个规则包含一个`validator`方法和一个message属性, `validator`方法接受两个参数(rule和value), 并返回一个布尔值, true表示验证通过, false表示验证失败, message是一个字符串, 用于在验证失败时展示错误信息

​	`initValue`: 表单项的初始值, 可以是一个固定的值, 也可以是一个函数, 函数接收一个参数`initialValues`, 返回值将被作为表单的初始值

​	`valuePropName`: 表单项的值属性名称, 默认为value

​	`trigger`: 触发表单项验证的事件, 默认为change事件

下面是form表单内的文本输入框, 使用了v-decorate进行数据绑定:

``````html
<a-input
	placeholder="请输入名称"
	v-decorator="[
    	'name',
        { rules: [{
            required: true,
            message; '请输入名称!'
        }] }
    ]"
>
</a-input>
``````

​	上述示例中, 配置对象中的rules属性用来指定表单项的验证规则, `initialValue`属性用来指定表单项的初始值, 在<a-from>组件中,使用ref属性指定一个引用名, 方便在methods中操作表单, 通过`this.$refs.form.validate`方法可以触发表单验证, 并传入一个回调函数, 通过回调函数的参数可以判断表单验证是否通过

### 获取v-decorator的值

​	要获取经过v-decorator包装的表单项的值, 可以使用`this.form.validateFields`方法, 它会返回一个包含所有表单项值的对象, 例:

``````javascript
this.form.validateFields((err, values) => {
	console.log(value) // 输出: { username: '输入的值' }
})
``````

​	要设置v-decorator表单项的值, 可以使用`this.form.setFieldsValue`方法, 并传入一个对象, 对象的键是表单项的名称, 值是想要设置的新值, 例:

``````javascript
this.form.setFieldsValue({
	username: '新值'
})
``````

### v-decorator的高级用法

​	v-decorator也支持更复杂的验证规则, 比如自定义验证函数, 多个验证规则等, 这些规则可以在script标签中定义, 并在模板中通过v-decorator引用, 例如:

``````html
<a-input
	v-decorator=['password', validatorRules.password]
/>
``````

在script中定义`validatorRules`

``````javascript
data() {
    return {
        validatorRules: {
            password: {
                initialValue: 123456,
                rules: [
                    { require: true, message: '请输入密码!' },
                    { min: 5, message: '长度不少于5个字符' },
                    { validator: this.validatePassword }
                ],
                trigger: 'blur'
            }
        }
    }
},
methods: {
    validatePassword(rule, value, callback) {
        // 自定义校验规则
    }
}
``````

​	在这个例子中, password表单项有一个初始值123456, 三个验证规则, 包括必填, 最小长度和自定义验证函数, 当失去焦点时触发验证

### 注意事项

​	在使用v-decorator之前, 确保已经通过`this.$form.createForm(this)`初始化了表单, 如过在组件的生命周期钩子中使用`setFieldsValue`方法遇到问题, 可以在`this.$nextTick`中调用它, 以确保在DOM更新后执行

​	通过v-decorator, 开发者可以更高效地处理表单验证, 使代码更加简洁和易于维护



经过`getFieldDecorator`或v-decorator包装的控件, 表单会自动添加value(或`valuePropName`指定其他属性) `onChange`(或trigger指定的其他属性), 数据同步将被Form接管, 这会导致以下结果:

你不再需要也不应该用`onChange`来做同步, 但还是可以继续监听`onChange`等事件

你不能用控件的value, `defaultValue`等属性来设置表单域的值, 默认值可以用`getFieldDecorator`或v-decorator里的`initialValue`

你不应该用v-model, 可以使用`this.form.setFieldsValue`来动态改变表单值

v-decorator取值:

``````javascript
this.form.validateFields((err, values) => {
    	if(err) {
            // 这里做逻辑处理
            console.log(values) // { name: '' }
        }
    ]})
``````

v-decorator赋值:

``````javascript
this.form.setFieldsValue({
    name: '设置值'
})
``````

清空表单数据:

``````javascript
this.form.resetFields
``````







​	