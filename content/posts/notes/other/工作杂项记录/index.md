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

## 数据库

### oracle

锁表

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

导入 dmp 文件

```sql
-- 查看版本号
select * from v$version;

-- 授权创建session权限
grant create session,resource TO DXPT_TEST;

-- 授权DBA权限
GRANT DBA TO DXPT_TEST;

-- cmd 命令行执行导入
imp portal_2024_kszx/portal_2024_kszx@10.161.7.14:1521/osapdb file=D:\kszx\portal_2024_kszx.dmp full=y ignore=y
```

