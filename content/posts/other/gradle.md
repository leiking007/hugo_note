---
title: "gradle"
description: ""
date: 2022-11-05
lastmod: 2022-11-05 12:12:12
categories: ["工具"]
tags: ["依赖管理"]
author: "lei"
draft: false
---

## 入门

gradle是2012年谷歌推出的基于Groovy语言的全新项目构建工具，集合了Ant和Maven各自优势

**优点：**脚本灵活、约定大于配置的项目目录优势、支持多种远程仓库和插件，侧重于大项目的构建

**缺点：**学习成本高、资料少、版本兼容性差

**gradle项目目录结构**

```bash
|-- build  封装编译后的字节码、打包文件、测试报告等信息
|-- gradle 封装包装器文件夹
|		|-- gradle-wrapper.jar
|		|-- gradle-wrapper.properties
|-- src
|	  |-- main
|	  |		|-- java
|	  |		|-- resources
|	  |		|-- webapp
|	  |				|-- WEB-INF
|	  |						|-- web.xml
|	  |-- test
|	        |-- java
|			|-- resources
|-- gradlew
|-- gradlew.bat  包装器启动文件
|-- build.gradle 构建脚本，类似于maven中pom文件
|-- settings.gradle 设置文件，定义项目及子项目名称信息，和项目是一一对应关系
```

## 安装

1. springboot官网表明了支持的gradle必须在6.8版本或以上，查看idea兼容的 gradle 版本 `\ideaIU-2021.3.3.win\plugins\gradle\lib`

   需要 1.8 及以上的jdk

2. 在官网下载所需版本的 gradle   [Gradle | Releases](https://gradle.org/releases/) ；注意：binary-only和complete区别为，complete多了源码和文档

3. 解压到指定目录，然后配置path环境变量，新增一条

   ```bash
   F:\study\soft\gradle-7.1.1\bin
   ```

4. 打开命令行测试

   ```bash
   C:\Users\lei>gradle -v
   
   ------------------------------------------------------------
   Gradle 7.1.1
   ------------------------------------------------------------
   
   Build time:   2021-07-02 12:16:43 UTC
   Revision:     774525a055494e0ece39f522ac7ad17498ce032c
   
   Kotlin:       1.4.31
   Groovy:       3.0.7
   Ant:          Apache Ant(TM) version 1.10.9 compiled on September 27 2020
   JVM:          17.0.3 (Oracle Corporation 17.0.3+8-LTS-jvmci-22.1-b05)
   OS:           Windows 10 10.0 amd64
   ```

   
