---
title: "js中的日期"
date: 2021-11-01
lastmod: 2021-11-11 12:12:12
draft: false
tags: ['js']
categories: ["前端"]
author: "lei"
---

# 获取日期

## 获取时间

```js
let d1=new Date()            //获取当前时间的Date对象

let d2=new Date("2020-12-10 17:25:55")        //获取指定是时间的Date对象
```

## 获取时间戳

```js
let t1=Date.now()            //获取当前时间戳

let t2=new Date().getTime()        //通过日期对象获取时间戳
```

# momentJS

## 获取moment对象

```js
let now = moment()        //获取当前时间moment对象，不传参或传入参数undefined时
let now=moment(new Date())
```

## moment对象操作

```js
let now = moment()
let old = moment("2019-12-31 14:12:14")

// diff 获取两个moment对象所代表日期之间的差
// moment().diff(moment对象，年/月/天，true/false) 第三个参数为是否保留小数
now.diff(old, 'days',true)        
```


