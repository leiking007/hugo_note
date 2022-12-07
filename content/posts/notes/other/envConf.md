---
title: "常用软件配置"
date: 2021-11-01
lastmod: 2021-11-11 12:12:12
draft: false
tags: ['配置']
categories: ["笔记"]
author: "lei"
---



# Node安装后必要配置

## npm配置

```bash
#配置仓库
npm config set registry https://repo.huaweicloud.com/repository/npm/
npm cache clean -f

#配置npm安装脚本位置
npm config set prefix "D:\nodejs\node_global"
npm config set cache "D:\nodejs\node_cache"

#查看npm全局安装目录、仓库地址
npm config ls
npm config ls -l

#配置修改后，将node_global目录加入path环境变量
```

## 共用node_modules

```bash
# 创建符号链接
# mklink /D 目标目录 源目录
mklink /D "F:\work\code\hrp\04.Implement\yhhrp_front\node_modules" "F:\work\code\hrp\node_modules"
```



# git hosts

```tex
#github related website
52.69.186.44 github.com
151.101.185.194 github.global.ssl.fastly.net
203.98.7.65 gist.github.com
13.229.189.0 codeload.github.com
185.199.109.153 desktop.github.com
185.199.108.153 guides.github.com
185.199.108.153 blog.github.com
18.204.240.114 status.github.com
185.199.108.153 developer.github.com
185.199.108.153 services.github.com
192.30.253.175 enterprise.github.com
34.195.49.195 education.github.com
185.199.108.153 pages.github.com
34.196.237.103 classroom.github.com
```

