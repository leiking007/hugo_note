---
title: "Jquery"
date: 2020-09-09
lastmod: 2020-09-09 12:12:12
draft: false
tags: ['js']
categories: ["前端"]
author: "lei"
---



# 简介

1. javascript的封装版

2. 简化javascript对DOM对象的定位以及对DOM对象属性操作开发步骤

3. 学习重点：

   1. Jquery选择器和过滤器语法
   2. 掌握Jquery对象提供的功能函数

4. Jquery是一个脚本文件，需要下载引入

5. jquery对象与dom对象区别：

   1. DOM对象，在浏览器加载网页时，由浏览器创建；一个html标签对应一个DOM对象
   2. Jquery对象，由jquery函数（$）负责创建；jquery对象就是一个数组；存放的是当前所定位的DOM对象；可以通过jquery中的提供的功能函数对其中存放的DOM对象进行统一处理
   3. jquery对象与dom对象之间属性和函数不能彼此调用

6. jquery对象转换为dom对象

   1. jquery对象转换为dom对象

      ```js
      //将jquery对象数组遍历
      for(var i=0;i<$obj.length;i++){
          var domobj=$obj[i]
      }
      ```

   2. dom对象转化为jquery对象

      ```js
      //可以直接传入一个dom对象，返回jquery对象（数组），只有一个元素
      var $obj=$(domobj)
      ```

# 选择器与过滤器

1. 对dom对象定位的条件，选择器
2. jquery选择器基于元素id、类、类型、属性、属性值等查找HTML元素

## 基本选择器

1. 可以根据id编号、标签类型名、标签采用的样式

2. 使用

   1. $("#id编号")：document.getElementById("id")；返回一个保存DOM对象的数组（jquery对象）
   2. $(".样式选择器名称")：document.getElementByClassName("样式选择器名称")；返回一个保存DOM对象的数组（jquery对象）
   3. $("标签类型名")：document.getElementsByTagName("标签类型名")；返回存储\<a\>、\<input\>等标签对象的jquery数组
   4. $("*")：定位浏览器所有的DOM对象，保存到数组中，以jquery对象返回
   5. $("条件1，条件2")：只要DOM元素满足一个，则定位保存到数组，返回jquery对象

   ```js
   fun1=function(){//id选择
   	$("#div1").css("background-color","red")
   }
   fun2=function(){//class选择
   	$(".div").css("background-color","green")
   }
   fun3=function(){//标签选择
   	$("div").css("background-color","pink")
   }
   fun4=function(){//标签选择
   				$("#div1,span").css("background-color","pink")
   }
   ```

## 层级选择器

1. 可以根据标签之间**父子关系**（包含）、**兄弟关系**进行定位（拥有相同的父标签且没有包含关系）

2. 使用

   1. $("定位父标签条件>定位子标签条件")：定位满足条件的**直接子标签**
   2. $("定位父标签条件 定位子标签条件")：定位满足条件的**直接子标签**和**间接子标签**
   3. $("定位标签条件~定位兄弟标签条件")：定位当前标签**后面**所有满足条件的兄弟标签
   4. $("定位标签条件+定位兄弟标签条件")：定位当前标签**后面与之紧邻的**所有满足条件的兄弟标签
   5. $("定位标签条件").siblings("定位兄弟标签条件")：定位当前标签**前面和后面**所有满足条件的兄弟标签

   ```js
   fun1=function(){//直接子标签，body下的直接div
   	$("body>div").css("background-color","red")
   }
   fun2=function(){//所有子标签，body下的所有div
   	$("body div").css("background-color","orange")
   }
   fun3=function(){//id为one标签后的所有div兄弟标签
   	$("#one~div").css("background-color","pink")
   }
   fun4=function(){//id为one标签后的紧邻div兄弟标签
   	$("#one+div").css("background-color","green")
   }
   fun5=function(){//id为one标签的所有div兄弟标签
       $("#one").siblings("div").css("background-color","green")
   }
   ```

## input标签选择器

1. input标签组成

   ```html
   <input type="text"> //文本输入框
   <input type="password"> //密码输入框
   <input type="radio"> //单选框
   <input type="checkbox"> //多选框
   <input type="file"> //文件选择
   <input type="button"> //按钮
   <input type="submit"> //唤醒浏览器，用于提交表单
   <input type="reset"> //重置按钮
   ```

2. input标签作用：用于浏览器向服务器发送请求时所携带的请求参数

3. 使用：$(":type属性名字")

   ```js
   fun1=function(){//选择文本框
   	console.log("用户名："+$(":text").val())
   }
   fun2=function(){//选择密码框
   	console.log("密码："+$(":password").val())
   }
   fun3=function(){//选择单选框
   	var $obj=$(":radio")
   	$obj.each(myFun) //jquery对象的函数，每次获取index，dom对象交给处理函数
   }
   function myFun(index,domObj){//获取dom对象value值
   	console.log("第"+(index+1)+"个单选框value值"+domObj.value)
   }
   fun4=function(){//获取文件名
   	console.log("文件名："+$(":file").val())
   }
   fun5=function(){//获取复选框
   	$obj=$(":checkbox")
   	$obj.each(myFun)
   }
   ```

## jquery过滤器

1. 对已经定位到jquery对象中的dom对象，进行二次筛选过滤

2. 过滤器不能独立使用，必须声明在选择器后面

3. 总共六种过滤器（常见三种）

4. 基本过滤器

   1. 过滤条件：根据已经定位的dom对象在jquery对象中存储的位置进行二次过滤筛选
   2. 使用：
      1. $("选择器:first")：留下满足条件的第一个dom对象
      2. $("选择器:last")：留下满足条件的最后一个dom对象
      3. $("选择器:eq(下标值)")：留下满足条件的指定位置dom对象
      4. $("选择器:lt(下标值)")：留下满足条件指定位置之前的dom对象
      5. $("选择器:gt(下标值)")：留下满足条件指定位置之后的dom对象

5. 基本属性过滤器

   1. 过滤条件：根据标签属性进行过滤
   2. 可以进行层层过滤,$("选择器\[属性名\]\[属性名\]")
   3. 使用：
      1. $("选择器[属性名]")：留下满足条件，且声明时对属性内容**手动赋值**的的dom对象
      2. $("选择器[属性名='值']")：留下满足条件，且指定属性内容**等于指定值**的dom对象
      3. $("选择器[属性名^='值']")：留下满足条件，且指定属性内容以**指定值开头**的dom对象
      4. $("选择器[属性名$='值']")：留下满足条件，且指定属性内容以**指定值结尾**的dom对象
      5. $("选择器[属性名*='值']")：留下满足条件，且指定属性内容**包含指定值**的dom对象

6. 工作状态属性过滤器

   1. html标签属性分类

      1. 基本属性：绝大多数标签都拥有的属性【id,name,title,rowspan】
      2. 样式属性：背景、字体、边框
      3. value属性：只存在于表单域标签中【input、select、textarea】
      4. 工作状态属性：只存在表单域标签中【checked、disabled、selected】
      5. 监听事件属性：onclick、onchange ...

   2. 使用

      1. $("选择器:enable")：留下满足条件的且处于**可用状态**的dom对象
      2. $("选择器:disable")：留下满足条件的且处于**不可用状态**的dom对象
      3. $("选择器:checked")：留下满足条件的且处于**选中状态**的dom对象
      4. $("选择器:selected")：留下满足条件的且处于**选中状态**的dom对象

      ```js
      //以下选择都是input标签选择器，工作属性过滤器
      fun1=function(){//可用文本框选择
      	$(":text:enabled").val("可用文本值修改")
      }
      fun2=function(){//不可用文本框选择
      	$(":text:disabled").val("不可用文本值修改")
      }
      fun3=function(){//复选框被选中的元素
          $(":checkbox:checked").each(loop)
      }
      fun4=function(){//下拉列表被选中的元素
      	var a=$("select>option:checked").val()
      	console.log("下拉列表选中元素："+a)
      }
      function loop(index,domObj){
      	console.log("第"+index+"选中的元素"+domObj.value)
      }
      ```

      

7. 属性都有默认值，没有手动指定，默认值为""空字符串

```js
$("#checkAll") //id选择器
$("[name='aihao']") //属性name=aihao的元素
$("p.intro") //class为intro的p元素
$("p:first") //选取p的第一个元素
$("[href]")	//选取带有 href 属性的元素
$("a[target='nk']")	//选取所有target 属性值等于"nk"的a元素
$("tr:even")	//选取偶数位置的tr元素
$("tr:odd")	//选取奇数位置的tr元素
$("ul li:first") //选取第一个ul元素的第一个li元素
$("ul li:first-child") //选取每个ul元素的第一个li元素
$("select>option:selected") //下拉列表中被选中的option
```



# jquery对象函数

## 属性操作函数

1. css("样式名","样式值")：为jquery对象中所有dom元素设置样式
2. val()：无参时获取jquery对象中第一个dom对象的value值，有参调用会对其中所有dom对象统一的赋值
3. prop("属性",属性值)：为jquery所有dom对象设置或者获取属性值；设置工作状态属性时使用
4. attr("属性","值")：为jquery所有dom对象设置属性值；设置基本属性时使用
5. text()：操作innerText属性，双目标签文本显示内容；无参调用时，返回jquery中所有dom元素的innerText拼接成的一个字符串；有参调用时，给jquery中所有dom对象的innerText进行修改
6. each(处理函数)：用来遍历jquery对象的DOM对象；给次获取一个下标和对应的DOM对象交给处理函数

## show与hide

1. show()：让jquery对象中所有dom对象在浏览器上显示；可以加时间参数，多少毫秒后隐藏
2. hide()：让jquery对象中所有dom对象在浏览器上隐藏；可以加时间参数，多少毫秒后隐藏

## remove与empty

1. remove()：将**当前标签以及其子标签**进行清除处理
2. empty()：将**当前标签的子标签**进行清除处理

## append与appendTo

1. append()：操作innerHTML属性；父标签.append(子标签)，通过父标签追加子标签
2. appendTo()：操作innerHTML属性；子标签.appendTo(父标签)，通过子标签添加父标签

# 事件绑定方式

1. javascript中有两种方式绑定
   1. 嵌入式：\<input type="button" onclick="fun()"\>
   2. 基于dom对象绑定：document.getElementById("#ck").onclick=fun
2. jquery事件绑定方式
   1. $obj.**jquery监听事件函数名**(处理函数)：$(":button").click(fun1)
   2. $obj.**bind**("jquery监听事件名称"，处理函数)：可以将监听事件从DOM元素上移除
   3. $obj.**unbind**("jquery监听事件名称")，**移除指定**监听事件
   4. $obj.unbind()，**移除所有**DOM元素监听事件
3. jquery监听事件函数名称，就是html监听事件去掉on，例如：jquery监听事件名为click（html监听事件为onclick）

# 实例：表格特效

## html代码

```html
<center>
	<input type="button" value="加载员工信息" onclick="fun1()" />
	<hr />
	<table border="1">
		<tr>
			<th>员工名字</th>
			<th>员工性别</th>
			<th>员工薪资</th>
			<th>
				<input type="checkbox" />
				<input type="button" value="删除" disabled />
			</th>
		</tr>
	</table>
</center>
```

## jquery代码

```js
//员工信息加载
fun1 = function() {
	var userInfo = [{
			"name": "TangLei",
			"sex": "男",
			"sal": 5000
		},
		{
			"name": "Leiking",
			"sex": "男",
			"sal": 5000
		},
		{
			"name": "Ang",
			"sex": "男",
			"sal": 5000
		}
	]
	var html = ""
	for (var i = 0; i < userInfo.length; i++) {
		html += "<tr>"
		html += "<td>" + userInfo[i].name + "</td>"
		html += "<td>" + userInfo[i].sex + "</td>"
		html += "<td>" + userInfo[i].sal + "</td>"
		html += "<td>"
		html += "<input type='checkbox' />"
		html += "</td>"
		html += "</tr>"
	}
	$("table").append(html)
}
$(function() { //jquery的页面加载结束后执行
	fun1() //加载员工信息
	$(":checkbox:first").click(fun2)
	$(":checkbox:gt(0)").click(fun3)
	$("table tr:gt(0)").mouseover(fun5)
	$("table tr:gt(0)").mouseout(fun6)
})
//全选或全不选
fun2 = function() {
	//获取全选checked状态
	var flag = $(":checkbox:first").prop("checked")
	//数值数据选择checked状态
	$(":checkbox:gt(0)").prop("checked", flag)
	fun4()
}
//数据选择影响全选
fun3 = function() {
	//获取所有的数据选择个数
	var a = $(":checkbox:gt(0)").length
	//获取所有数据选择已选中个数
	var b = $(":checkbox:gt(0):checked").length
	//设置全选按钮checked状态
	$(":checkbox:first").prop("checked", a == b)
	fun4()
}
//设置删除按钮在选中有数据时可用
fun4 = function() {
	var a = $(":checkbox:checked").length
	$(":button[value='删除']").attr("disabled", a == 0)
}
//设置鼠标悬浮数据项颜色改变
fun5 = function() {
	console.log(this) //<tr style="background-color: red;">
	console.log($(this)) //Object { 0: tr, length: 1 }

	//$(this)是将当前dom对象转换为jquery对象
	$(this).css("background-color", "red")
}
//设置鼠标移开数据项颜色恢复原样
fun6 = function() {
	$(this).css("background-color", "")
}
```

