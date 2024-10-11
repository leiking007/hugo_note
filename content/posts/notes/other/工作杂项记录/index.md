---
title: "工作杂项记录"
date: 2024-09-03
lastmod: 2024-09-03 12:12:12
draft: false
tags: ['杂记']
categories: ["笔记"]
author: "lei"
---

# 杂记

## oracle

### 数据库

#### 锁表

```sql
-- 锁表
SELECT * FROM COSTINFO c FOR UPDATE;

-- 查询锁表信息
SELECT t2.username, t2.sid,t2.serial#,t3.object_name,t2.OSUSER,t2.MACHINE,t2.PROGRAM,t2.LOGON_TIME,t2.COMMAND,t2.LOCKWAIT,t2.SADDR,t2.PADDR,t2.TADDR,t2.SQL_ADDRESS,t1.LOCKED_MODE
FROM v$locked_object t1, v$session t2, dba_objects t3
WHERE t1.session_id = t2.sid AND t1.object_id = t3.object_id
ORDER BY t2.logon_time;

-- 查询session
SELECT a.OS_USER_NAME,c.owner,c.object_name,b.sid,b.serial#,logon_time
FROM v$locked_object a, v$session b, dba_objects c
WHERE a.session_id = b.sid AND a.object_id = c.object_id
ORDER BY b.logon_time;

-- 杀掉session 'sid,serial#'
ALTER system kill SESSION '2844,28686' IMMEDIATE;

```

#### exp/imp

> 保持表空间一致

导出exp

```sql
-- 导出某个用户的全部数据库：其中，ywxy/ywxy@ORCL 是用户名/密码@数据库名，file=d:/daochu1.dmp 是导出的文件路径，full=y 表示导出整个数据库。
exp username/passwd@ip:port/db file=d:/daochu1.dmp full=y

-- 导出某个用户的某个库： 在这里，owner=user 指定了要导出的数据库用户。
exp username/passwd@ip:port/db file=d:/daochu1.dmp owner=user

-- 导出某个用户的某个表： tables=C_ZX_QYJC 是要导出的表名，如果需要导出多个表，则使用(table1,table2)的形式。
exp username/passwd@ip:port/db file=d:/daochu1.dmp tables=C_ZX_QYJC
```

导入imp

```sql
-- 查看版本号
select * from v$version;

-- 授权创建session权限
grant create session,resource TO DXPT_TEST;

-- 授权DBA权限
GRANT DBA TO DXPT_TEST;

-- cmd 命令行执行导入
imp username/passwd@ip:port/db file=D:\kszx\portal_2024_kszx.dmp full=y ignore=y
```

导出后导入中文乱码处理

```sql
-- 查询库的字符集 ；SIMPLIFIED CHINESE_CHINA.AL32UTF8;
select userenv('language') from dual;

-- 设置临时环境变量
set NLS_LANG=SIMPLIFIED CHINESE_CHINA.AL32UTF8

-- 切换当前cmd使用 utf-8 编码
chcp 65001

-- 执行导出导入命令
```

### weblogic

#### 打补丁

```cmd
# weblogic 版本在后台登录页左下角可以看到，命令行需要管理员打开

# 查看 opatch 版本（补丁会有opatch版本要求）
%ORACLE_HOME%\OPatch\opatch.bat version

# 查看已安装补丁
%ORACLE_HOME%\OPatch\opatch.bat  lspatches

# 验证什么补丁应用到了 oracle_home
%ORACLE_HOME%\OPatch\opatch.bat lsinventory

# 解压补丁包
jar -xvf xxxx_Generic.zip

# 进入解压目录下的 tools\spbat 目录

# windows需要将 spbat.bat 脚本处理下（去掉日期的星期几，不然中文会报错）
    for /F "tokens=1-3 delims=/:" %%i in ('date /t') do set curdate=%%i-%%j-%%k
    For /f "tokens=1-4 delims=/:.," %%a in ("%TIME%") do set curtime=%%a-%%b-%%c-%%d
    set curdate=%curdate: =%
    set curtime=%curtime: =%
    改为
    for /F "tokens=1-3 delims=/: " %%i in ('date /t') do set curdate=%%i-%%j-%%k
    For /f "tokens=1-4 delims=/:.," %%a in ("%TIME%") do set curtime=%%a-%%b-%%c
    set curdate=%curdate: =%
    set curtime=%curtime: =%

# 这个命令 验证补丁包
spbat.bat -phase precheck -oracle_home D:\Oracle\Middleware\Oracle_Home

# 进行补丁包安装，opatch版本会自动更新 （当opatch版本不符合要求时直接执行）
spbat.bat -phase apply -oracle_home D:\Oracle\Middleware\Oracle_Home


#------------- 其他命令 ----------
# 安装补丁（单个和多个）
# 单个需要进补丁解压目录
%ORACLE_HOME%\OPatch\opatch.bat apply
# 多个需要指定id
%ORACLE_HOME%\OPatch\opatch.bat napply -id 29633448, 28298916

#补丁回滚（单个和多个）
%ORACLE_HOME%\OPatch\opatch.bat rollback -id 26519417
%ORACLE_HOME%\OPatch\opatch.bat nrollback -id 15941858,15955138
```

## Linux

### 扩容swap分区

```bash
# 查看当前 swap 大小
free -m

# 创建 swap 文件存储位置，并进入
mkdir /swap

# 创建分区文件 16g 16348M
# if=/dev/zero 填充0；of=/swap/swapfile 分区文件位置；bs=1M 块大小；count=16348 分区大小
dd if=/dev/zero of=/swap/swapfile bs=1M count=16348

# 查看创建文件
du -h /swap/swapfile

# 创建 swap 分区文件系统
# 注意：这里会生成 uuid，需要记录，后面设置开机启动时需要用上
mkswap /swap/swapfile

# 启用交换分区文件
swapon /swap/swapfile

# 查看 swap 分区
swapon --show

# 设置开机启动 swap 分区，编辑/etc/fstab，新增一行；
# 也可以使用创建 swap 分区时返回的 uuid；通过 file 命令也可以查看，file /swap/swapfile
/swap/swapfile swap swap defaults 0 0
```

