---
title: "vue3+TS"
date: 2022-12-19
lastmod: 2022-12-19 12:12:12
draft: false
tags: ['js']
categories: ["前端"]
author: "lei"
---

# 初始

## TypeScript 的介绍

TypeScript是一种由微软开发的开源、跨平台的编程语言。它是JavaScript的超集，最终会被编译为JavaScript代码

2012年10月，微软发布了首个公开版本的TypeScript，2013年6月19日，在经历了一个预览版之后微软正式发布了正式版TypeScript

TypeScript的作者是安德斯·海尔斯伯格，C#的首席架构师。它是开源和跨平台的编程语言

TypeScript扩展了JavaScript的语法，所以任何现有的JavaScript程序可以运行在TypeScript环境中

TypeScript是为大型应用的开发而设计，并且可以编译为JavaScript

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6+ 的支持**，它由 Microsoft 开发，代码开源于 GitHub 上

**TypeScript 是 JavaScript 的一个超集**，主要提供了**类型系统**和**对 ES6+ 的支持**，它由 Microsoft 开发，代码[开源于 GitHub (opens new window)](https://github.com/Microsoft/TypeScript)上

**总结**：TypeScript 在社区的流行度越来越高，它非常适用于一些大型项目，也非常适用于一些基础库，极大地帮助我们提升了开发效率和体验

## 特点

TypeScript 主要有 3 大特点：

- **始于JavaScript，归于JavaScript**

  TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的JavaScript 引擎中。

- **强大的类型系统**

  *类型系统**允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

- **先进的 JavaScript**

  TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件

## 安装

1. 全局安装

   ```bash
   npm install -g typescript
   ```

2. 安装完成后，在控制台运行如下命令，检查安装是否成功

   ```bash
   tsc -V
   ```

# hello TS

## hello TS

1. 编写01_hello.ts文件

   ```typescript
   (()=>{
       // string 表示参数str为string类型
       function sayHello(str:string){
           console.log("Hello "+str)
       }
       let str='TypeScript'
       sayHello(str)
   })()
   ```

2. 打开控制台，编译ts文件；编译成功后同级目录下会多出一个`.js文件`

   ```bash
   tsc 01_hello.ts
   ```

3. 新建index.html，引入编译后的 js 脚本

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <script src="./01_hello.ts" ></script>
       <title>Document</title>
   </head>
   <body>
   </body>
   </html>
   ```

4. 打开浏览器，可以看到控制台输出了：Hello TypeScript

**总结**

- 如果 ts 文件中不包含 ts 特有语法，则 html 引入浏览器可直接执行
- 如果 ts 文件中包含 ts 特有语法，浏览器执行报错
- ts 编译为js代码后，let 修饰的变量会变为 var 修饰

## vscode 中自动编译 TS 文件

1. 使用命令生成配置文件`tsconfig.json`

   ```bash
   tsc --init
   ```

2. 修改配置文件中以下内容

   ```json
   {
     "compilerOptions": {
   	 "outDir": "./js",                  /* 编译后的js文件保存目录 */
         "strict": false,                /* 不启用严格模式 */
   }
   ```

3. 然后在菜单栏 `终端-->运行任务-->tsc:监视` 运行监视任务即可

4. 此时编写 ts 文件会自动编译，并保存在当前项目的 js 目录下

##  类型注解

类型注解是 TypeScript 语法，是一种轻量级的为函数或变量添加约束的方式；如下：

```typescript
(()=>{
    function sayHello(str:string){
        console.log("Hello "+str)
    }
    let str='TypeScript'
    sayHello(str)
})()
```

sayHello 函数入参，使用了类型注解，此时如果调用时传入函数参数不是 string 类型编译器就会报错

并且进行编译时就会抛错：

```bash
6:14 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

**总结**：TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解

## 接口和类的演示

**接口**

接口是一种约束，TypeScript中也可以使用类型注解对接口进行实时的代码分析，如下：

```typescript
(()=>{
    interface Person{
        firstName:string
        lastName:string
    }
    function getName(person:Person){
        return person.firstName + person.lastName
    }
    const p1={
        firstName:'唐',
        lastName:'每天八杯水'
    }
    // 如果这里传入参数p1的结构不满足接口约定，则会抛错
    console.log(getName(p1))
})()
```

这样使用，在 TS 中编写代码时会有提示检查

**类**

```typescript
(()=>{
    class User{
        firstName:string
        lastName:string
        fullName:string

        //定义构造函数
        constructor(firstName:string,lastName:string){
            this.firstName=firstName
            this.lastName=lastName
            this.fullName=firstName+'_'+lastName
        }
    }

    function getName(person:User){
        return person.fullName
    }

    const u1=new User('唐','每天八杯水')

    console.log(getName(u1))

})()
```

**总结**：查看编译后的js文件，可以看到看到 TypeScript 里的类只是一个语法糖，本质上还是 JavaScript 函数的实现

# 常用语法

## 数据类型

TypeScript 支持与 JavaScript 几乎相同的数据类型

**布尔值**

最基本的数据类型就是简单的 true/false 值，在JavaScript 和 TypeScript 里叫做 `boolean`

```typescript
let isDone: boolean = false;
isDone = true;
// isDone = 2 // error
```

**数字**

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。 这些浮点数的类型是 number。

```typescript
let a1: number = 10 // 十进制
let a2: number = 0b1010  // 二进制
let a3: number = 0o12 // 八进制
let a4: number = 0xa // 十六进制
```

**字符串**

 和 JavaScript 一样，可以使用双引号（`"`）或单引号（`'`）表示字符串

```typescript
let name:string = 'tom'
name = 'jack'
// name = 12 // error
let age:number = 12
const info = `My name is ${name}, I am ${age} years old!`
```

**undefined 和 null**

TypeScript 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`；默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量

```typescript
let num1: number = 1
num1 = undefined  // 取消严格模式检测
let u: undefined = undefined
let n: null = null
```

**数组**

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在`元素类型后面接上[]`

```typescript
// 方式一
let list1: number[] = [1, 2, 3]
// 方式二
let list2: Array<number> = [1, 2, 3]
```

**元组 Tuple**

元组类型允许表示一个已知元素数量和类型的数组，`各元素的类型不必相同`

```typescript
let t1: [string, number]
t1 = ['hello', 10] // OK
t1 = [10, 'hello'] // Error
```

 **枚举**

enum` 类型是对 JavaScript 标准数据类型的一个补充。 使用枚举类型可以`为一组数值赋予友好的名字

默认情况下，从 `0` 开始为元素编号。 你也可以手动的指定成员的数值

枚举类型提供的一个便利是你可以由枚举的值得到它的名字

```typescript
enum Color {
  Red = 1,
  Green,
  Blue
}

// 枚举数值默认从0开始依次递增
// 根据特定的名称得到对应的枚举数值
let myColor: Color = Color.Green  // 2
let colorName: string = Color[2]  // Green
```

**any**

`any` 类型，类型检查器不进行检查而是直接让它们通过编译阶段的检查

```typescript
let notSure: any = 4
notSure = 'maybe a string'
notSure = false // 也可以是个 boolean
```

**void**

表示没有任何类型

```typescript
// 表示没有任何类型, 一般用来说明函数的返回值不能是undefined和null之外的值
function fn(): void {
  console.log('fn()')
  // return undefined
  // return null
  // return 1 // error
}

// 无实际作用，因为你只能赋值 undefined 和 null
let unusable: void = undefined
```

 **never**

一个从来不会有返回值的函数（如：如果函数内含有 `while(true) {}`

一个总是会抛出错误的函数（如：`function foo() { throw new Error('Not Implemented') }`，`foo` 的返回类型是 `never`

never 类型变量只能赋值另外一个 never

```typescript
let bar: never = (() => {
    throw new Error('Throw my hands in the air like I just dont care');
})();


let b: never = (() => {
    while (true) { }
})()
```

当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never类型

**object**

`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`之外的类型

```typescript
function fn2(obj:object):object {
  console.log('fn2()', obj)
  return {}
  // return undefined
  // return null
}
console.log(fn2(new String('abc')))
// console.log(fn2('abc') // error
console.log(fn2(String))
```

**联合类型**

联合类型（Union Types）表示取值可以为多种类型中的一种 ，使用`|`来创建联合类型

```typescript
/*
  语法：number | string | boolean
*/

// 定义一个一个函数得到一个数字或字符串值的字符串形式值
function toString2(x: number | string) : string {
  return x.toString()
}


// 返回长度
function getLength(x: number | string) {

  // return x.length // error 因为可能为number类型
    
  return x.toString().length
}
```

**类型断言**

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”

 它没有运行时的影响，只是在编译阶段起作用

```typescript
/* 
类型断言(Type Assertion): 可以用来手动指定一个值的类型
语法:
    方式一: <类型>值
    方式二: 值 as 类型  tsx中只能用这种方式
*/
function getLength(x: number | string) {
    // 类型断言，表示确定为string类型
    let size = (x as string).length
    if (typeof x === 'string') {
        // typeof 会被编译器推断出，这里 x 为 string 类型
        return x.length
    } else {
        return x.toString().length
    }
}
console.log(getLength('abcd'), getLength(1234))
```

**类型推断**

类型推断: TS会在没有明确的指定类型的时候推测出一个类型

有下面2种情况: 1. 定义变量时赋值了, 推断为对应的类型. 2. 定义变量时没有赋值, 推断为any类型

```typescript
/* 定义变量时赋值了, 推断为对应的类型 */
let b9 = 123 // number
// b9 = 'abc' // error

/* 定义变量时没有赋值, 推断为any类型 */
let b10  // any类型
b10 = 123
b10 = 'abc'
```



