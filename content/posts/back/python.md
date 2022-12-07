---
title: "python"
date: 2022-10-20
lastmod: 2022-10-20 12:12:12
draft: false
tags: ['python']
categories: ["后端"]
author: "lei"
---



# 起步

## 安装

1. 在python官网[Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/) 下载绿色免安装版 Windows embeddable package (64-bit) 

2. 解压，放到指定目录，配置path环境变量

   ```bash
   #命令行输入以下命令显示版本号，安装成功
   python -V
   ```

3. pip官网 [Installation - pip documentation v22.3 (pypa.io)](https://pip.pypa.io/en/stable/installation/#ensurepip) 下载`get-pip.py`文件

4. 安装pip

   ```bash
   #使用python运行下载的get-pip.py文件，指定镜像源下载
   #安装成功后，默认会在python目录生成 Scripts 和 Lib 文件夹
   python get-pip.py -i https://pypi.tuna.tsinghua.edu.cn/simple
   
   #，重新打开命令行运行下面命令，显示pip版本号
   pip -V
   ```

5. 将Scripts添加到 path 环境变量中

   ```bash
   pip -V
   #pip 22.3 from F:\study\environment\python-3.11.0\Lib\site-packages\pip (python 3.11)
   ```

6. 如果步骤5提示No module，则在python目录下打开`pythonxx._pth`文件，将 import site 注释去掉

   ```python
   python311.zip
   .
   # Uncomment to run site.main() automatically
   import site
   ```

## Hello Python

新建hello.py

```python
print('Hello Python')
```

运行 

```bash
PS C:\Users\lei> & f:/study/environment/python-3.11.0/python.exe hello.py
Hello Python
```

## 输入和输出

**输出**

`print()`可以向屏幕打印内容，可以接受多个参数用逗号隔开，也可以打印计算结果

```python
print('hello python')    #hello python
print('Hello','Python')    #Hello Python
print(1+9)    #10
```

**输入**

`input()`，可以让用户输入字符串，并存放到一个变量里

```python
name = input('请输入：')    # 输入 lei
print('hello',name)    # 输出 hello lei
```



# python语法

## 基础

python大小写敏感，使用缩进来组织代码块

在文本编辑器中，需要设置把Tab自动转换为4个空格

python是一门动态语言

**注释**

python注释使用 `#`

```python
# 这里是注释
print('hello','python')
```

**变量**

- 变量名必须是大小写英文、数字和`_`的组合，且不能用数字开头
- python中 等号`=`是赋值语句，可以把任意数据类型赋值给变量，同一个变量可以反复赋值，而且可以是不同类型的变量

**常量**

常量是一种约定，用全部大写的变量名表示常量只是一个习惯上的用法

**字符串编码**

python3采用Unicode，支持多语言

`ord()`函数获取字符的整数表示

`chr()`函数把编码转换为对应的字符

以Unicode表示的`str`通过`encode()`方法可以编码为指定的`bytes`；如：`'中文'.encode('utf-8')`



## 数据类型

**整数**

- Python可以处理任意大小的整数，当然包括负整数
- Python的整数没有大小限制

**浮点数**

- 浮点数也就是小数，计算结果不精确
- 浮点数也没有大小限制，但是超出一定范围就直接表示为`inf`（无限大）

**字符串**

- 字符串是以单引号`'`或双引号`"`括起来的任意文本

- 可以使用转义字符`\`可以转义很多字符

- `r''`表示`''`内部的字符串默认不转义
- `'''...'''`的格式可以表示多行内容

字符串格式化，常见占位符：

| 占位符 | 替换内容     |
| :----- | :----------- |
| %d     | 整数         |
| %f     | 浮点数       |
| %s     | 字符串       |
| %x     | 十六进制整数 |

```python
print('hello %s , age :%d'%('lei',25))    #hello lei , age :25
```



**布尔值**

- 布尔值和布尔代数的表示完全一致，一个布尔值只有`True`、`False`两种值，要么是`True`，要么是`False`
- 布尔值可以用`and`、`or`和`not`运算

**空值**

python中一个特殊的值，用`None`表示

