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

## vscode 中自动编译

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

# 使用webpack打包TS

## 目录结构

```tex
-- build
    -- webpack.config.js
-- public
    -- index.html
-- src
    -- main.ts
-- package.json
-- tsconfig.json
```

## package.json

```json
{
  "name": "webpackts",
  "version": "1.0.0",
  "description": "",
  "main": "main.ts",
  "scripts": {
      // 打包命令
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  },
  "author": "lei",
  "license": "ISC",
  "dependencies": {
      // 清除打包目录的文件
    "clean-webpack-plugin": "^4.0.0",
      // 运行跨平台设置和使用环境变量的脚本
    "cross-env": "^7.0.3",
      // webpack打包相关插件
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1",
      // 本地开发服务器，会自动监听变化，自动打包构建，自动更新刷新浏览器
    "webpack-dev-server": "^4.11.1",
      // webpack 的 TypeScript 加载器
    "ts-loader": "^9.4.2",
      // TS
    "typescript": "^4.9.4",
  }
}
```

安装依赖

```bash
npm install
```



## webpack.config.js

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        // 入口文件
        app: './src/main.ts'
    },

    output: {
        // 打包文件的输出位置
        path: resolve('dist'),
        // 打包后的js文件名，name + 8位数的hash
        filename: '[name].[contenthash:8].js'
    },

    // 需要打包的文件
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [resolve('src')]
            }
        ]
    },

    plugins: [
        // 打包时自动清楚以前的文件
        new CleanWebpackPlugin({
        }),

        // html模板
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    devtool: isProd ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

    // 开发服务器
    devServer: {
        host: 'localhost', // 主机名
        stats: 'errors-only', // 打包日志输出输出错误信息
        port: 8081,
        open: true
    },
}
```

## index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>webpack & TS</title>
</head>
<body>
  
</body>
</html>
```

## 测试

运行命令进行打包

```bash
npm run build
```

查看dist目录下的打包结束文件

```tex
app.4ce9c63a.js
app.4ce9c63a.js.map
index.html
```

其中 index.html 中自动引入了打包后的 js 文件，js文件命名方式为：name + 8位hash

# 常用语法



