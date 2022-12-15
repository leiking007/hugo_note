---
title: "Linux"
date: 2022-12-07
lastmod: 2022-12-07 12:12:12
draft: false
tags: ['Linux','服务器']
categories: ["后端"]
author: "lei"
---

# 系统管理

## echo

echo命令用于在终端输出字符串或变量提取后的值

命令格式：`echo [字符串| $变量]`

示例：

```bash
export name="TOM"  # shell环境中定义一个临时变量name
echo $name  # 输出

# > 输出重定向到文件，如果已存在会覆盖文件内容，不存在则新建
echo "This is a test text." > test.txt
# >> 追加重定向，不会覆盖已存在内容
echo "This is a test text." >> test.txt

# 输出当前工作目录
echo `pwd`
echo $(pwd)
```

## date

date命令用于显示和设置系统的时间和日期

命令格式：`date [选项] [+格式]`

其中，时间格式的部分控制字符解释如下：

| 字符 | 说明                                                        |
| ---- | ----------------------------------------------------------- |
| %a   | 当地时间的星期名缩写（例如： 日，代表星期日）               |
| %A   | 当地时间的星期名全称 （例如：星期日）                       |
| %b   | 当地时间的月名缩写 （例如：一，代表一月）                   |
| %B   | 当地时间的月名全称 （例如：一月）                           |
| %c   | 当地时间的日期和时间 （例如：2005年3月3日 星期四 23:05:25） |
| %C   | 世纪；比如 %Y，通常为省略当前年份的后两位数字（例如：20）   |
| %d   | 按月计的日期（例如：01）                                    |
| %D   | 按月计的日期；等于%m/%d/%y                                  |
| %F   | 完整日期格式，等价于 %Y-%m-%d                               |
| %j   | 按年计的日期（001-366）                                     |
| %p   | 按年计的日期（001-366）                                     |
| %r   | 当地时间下的 12 小时时钟时间 （例如：11:11:04 下午）        |
| %R   | 24 小时时间的时和分，等价于 %H:%M                           |
| %s   | 自UTC 时间 1970-01-01 00:00:00 以来所经过的秒数             |
| %T   | 时间，等于%H:%M:%S                                          |
| %U   | 一年中的第几周，以周日为每星期第一天（00-53）               |
| %x   | 当地时间下的日期描述 （例如：12/31/99）                     |
| %X   | 当地时间下的时间描述 （例如：23:13:48）                     |
| %w   | 一星期中的第几日（0-6），0 代表周一                         |
| %W   | 一年中的第几周，以周一为每星期第一天（00-53）               |

示例：

```bash
# 以默认格式查看当前系统时间
date

# 以指定格式查看系统时间
date "+%Y-%m-%d %H:%M:%S"

# 查看今天是当年中的第几天
date "+%j"

# 将系统时间设置为2020-02-20 20:20:20
date -s "20200220 20:20:20"

# 校正系统时间，与网络同步
yum -y install ntp
ntpdate time.nist.gov
```

## wget

wget用于在终端中下载文件

命令格式：`wget [参数] 下载地址`

参数说明：

| 参数 | 作用                                 |
| ---- | ------------------------------------ |
| -b   | 后台下载                             |
| -P   | 下载到指定目录                       |
| -t   | 最大重试次数                         |
| -c   | 断点续传                             |
| -p   | 下载页面内所有资源，包括图片、视频等 |
| -r   | 递归下载                             |

示例：

```bash
# 下载图片到指定路径，路径不存在则新建
wget -P /root/static/img/ http://img.alicdn.com/tfs/TB1.R._t7L0gK0jSZFxXXXWHVXa-2666-1500.png
```

## ps

ps命令用于查看系统中的进程状态

命令格式：`ps [参数]`

命令参数说明：

| 参数 | 作用                                               |
| ---- | -------------------------------------------------- |
| -a   | 显示现行终端机下的所有程序，包括其他用户的程序     |
| -u   | 以用户为主的格式来显示程序状况                     |
| -x   | 显示没有控制终端的进程，同时显示各个命令的具体路径 |
| -e   | 列出程序时，显示每个程序所使用的环境变量           |
| -f   | 显示当前所有的进程                                 |
| -t   | 指定终端机编号，并列出属于该终端机的程序的状况     |

示例：

```bash
# 查看sshd进程
ps -ef | grep sshd
```

## top

top命令动态地监视进程活动与系统负载等信息

命令输出参数解释：

以上命令输出视图中分为两个区域，一个统计信息区，一个进程信息区。

- 统计信息区
  - 第一行信息依次为：系统时间、运行时间、登录终端数、系统负载（三个数值分别为1分钟、5分钟、15分钟内的平均值，数值越小意味着负载越低）。
  - 第二行信息依次为：进程总数、运行中的进程数、睡眠中的进程数、停止的进程数、僵死的进程数。
  - 第三行信息依次为：用户占用资源百分比、系统内核占用资源百分比、改变过优先级的进程资源百分比、空闲的资源百分比等。
  - 第四行信息依次为：物理内存总量、内存使用量、内存空闲量、作为内核缓存的内存量。
  - 第五行信息依次为：虚拟内存总量、虚拟内存使用量、虚拟内存空闲量、预加载内存量。
- 进程信息区

| 列名    | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| PID     | 进程ID                                                       |
| USER    | 进程所有者的用户名                                           |
| PR      | 进程优先级                                                   |
| NI      | nice值。负值表示高优先级，正值表示低优先级                   |
| VIRT    | 进程使用的虚拟内存总量，单位kb                               |
| RES     | 进程使用的、未被换出的物理内存大小，单位kb                   |
| SHR     | 共享内存大小，单位kb                                         |
| S       | 进程状态D：不可中断的睡眠状态R：正在运行S：睡眠T：停止Z：僵尸进程 |
| %CPU    | 上次更新到现在的CPU时间占用百分比                            |
| %MEM    | 进程使用的物理内存百分比                                     |
| TIME+   | 进程使用的CPU时间总计，单位1/100秒                           |
| COMMAND | 命令名                                                       |

按 q 键退出监控页面。

## pidof

pidof命令用于查询指定服务进程的PID值

命令格式：`pidof [服务名称]`

命令参数说明：

| 参数 | 说明                                                   |
| ---- | ------------------------------------------------------ |
| -s   | 仅返回一个进程号                                       |
| -c   | 只显示运行在root目录下的进程，这个选项只对root用户有效 |
| -o   | 忽略指定进程号的进程                                   |
| -x   | 显示由脚本开启的进程                                   |

示例：

```bash
# 查询出crond服务下的所有进程ID
pidof crond
```

## kill/killall

kill命令用于终止指定PID的服务进程

命令格式：`kill [参数] [进程PID]`

killall命令用于终止指定名称的服务对应的全部进程

命令格式：`killall [进程名称]`

示例：

```bash
# -9 为发送给指定程序的信息（强制删除），预设为15
kill -9 1247

killall crond
```

## ifconfig

ifconfig命令用于获取网卡配置与网络状态等信息

命令输出说明：

- 第一部分的第一行显示网卡状态信息。
  - eth0表示第一块网卡。
  - UP代表网卡开启状态。
  - RUNNING代表网卡的网线被接上。
  - MULTICAST表示支持组播。
- 第二行显示网卡的网络信息。
  - inet（IP地址）：172.16.132.195。
  - broadcast（广播地址）：172.16.143.255。
  - netmask（掩码地址）：255.255.240.0。
- RX表示接收数据包的情况，TX表示发送数据包的情况。
- lo表示主机的回环网卡，是一种特殊的网络接口，不与任何实际设备连接，而是完全由软件实现。与回环地址（127.0.0.0/8 或 ::1/128）不同，回环网卡对系统显示为一块硬件。任何发送到该网卡上的数据都将立刻被同一网卡接收到。

示例：

```bash
# 获取网卡配置与网络状态等信息
ifconfig
```

## uname

uname命令用于查看系统内核与系统版本等信息

命令语法：`uname [-amnrsv][--help][--version]`

示例：

```bash
# 显示系统信息
uname -a

# 显示当前系统的硬件架构
uname -i

# 显示操作系统发行编号
uname -r

# 显示操作系统名称
uname -s

# 显示主机名称
uname -n
```

## uptime

uptime 用于查看系统的负载信息

命令输出说明：

| 负载信息           | 命令输出值                                                   |
| ------------------ | ------------------------------------------------------------ |
| 当前服务器时间     | 14:20:27                                                     |
| 当前服务器运行时长 | 2 min                                                        |
| 当前用户数         | 2 users                                                      |
| 当前负载情况       | load average: 0.03, 0.04, 0.02（分别取1min，5min，15min的均值） |

## free

free用于显示当前系统中内存的使用量信息

命令语法：`free [-bkmotV][-s <间隔秒数>]`

命令参数说明：

| 参数 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| -b   | 以Byte为单位显示内存使用情况                                 |
| -k   | 以KB为单位显示内存使用情况                                   |
| -m   | 以MB为单位显示内存使用情况                                   |
| -h   | 以合适的单位显示内存使用情况，最大为三位数，自动计算对应的单位值。 |

命令输出说明：

| 参数       | 说明                   |
| ---------- | ---------------------- |
| total      | 物理内存总数           |
| used       | 已经使用的内存数       |
| free       | 空间的内存数           |
| share      | 多个进程共享的内存总额 |
| buff/cache | 应用使用内存数         |
| available  | 可用的内存数           |
| Swap       | 虚拟内存               |

示例：

```bash
# 以合适的单位显示系统内存信息
free -h
```

## who

who 命令显示关于当前在本地系统上的所有用户的信息

示例：

```bash
# 显示当前登录系统的用户
who

# 显示用户登录来源
who -l -H
```

## last

last 命令用于显示用户最近登录信息

## history

history命令用于显示历史执行过的命令

bash默认记录1000条执行过的历史命令，被记录在~/.bash_history文件中

示例：

```bash
# 显示最新10条执行过的命令
history 10

# 清除历史记录
history -c
```



# 磁盘管理



# 文本处理



# 文件与权限



# 文件管理



# Centos

## 系统命令

```bash
systemctl stop firewalld	#关闭防火墙
systemctl start firewall	#开启防火墙

systemctl disable firewalld.service	#移除防火墙开机自启
systemctl enable firewalld.service		#添加防火墙开机自启

#放行端口
#--zone 域
#--add-port 端口/协议
#--permanent 永久生效
firewall-cmd --zone=public --add-port=xxxx/tcp --permanent		
firewall-cmd --zone=public --add-port=8121-8124/tcp --permanent

firewall-cmd --reload	#重载防火墙配置

firewall-cmd --zone=public --list-ports	#查看开启的防火墙端口

systemctl status firewalld.service		#查看防火墙状态
```

## 应用命令

```bash
nohup ./bin/cmak > log &		#后台守护运行,并指定输出到当前目录log文件
```

## Centos7网络配置

```bash
#网络配置文件
vim /etc/sysconfig/network-scripts/ifcfg-ens33

#修改配置文件 ifcfg-ens33
BOOTPROTO=static   #静态ip
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
ONBOOT=yes		#开机启动
IPADDR=192.168.10.131	#ip地址
GATEWAY=192.168.10.254	#网关
NETMASK=255.255.255.0	#mask
DNS=114.114.114.114		#DNS

#配置文件修改后，用以下命令重启网络
service network restart
```

# Ubuntu22.04

## 网络配置

1. 查看当前系统详细信息

   ```bash
   lsb_release -a
   ```

2. 网络配置文件，进行配置

   ```bash
   vim /etc/netplan/00-installer-config.yaml
   # Let NetworkManager manage all devices on this system
   network:
       ethernets:
           ens32:                    ## network card name
               dhcp4: false
               addresses:
                 - 192.168.3.88/24   ## set static IP
               routes:
                 - to: default
                   via: 192.168.3.1  ## gateway
               nameservers:
                 addresses: [8.8.8.8,8.8.4.4,192.168.3.1]
       version: 2
   ```

3. 查看网络服务状态

   ```bash
   systemctl start systemd-networkd
   systemctl status systemd-networkd
   ```

4. 重启网络服务,再次查看网络状态

   ```bash
   netplan apply
   systemctl status systemd-networkd
   ip addr
   ```

5. 测试网络连接

   ```bash
   ping -c 3 www.baidu.com
   ```

## 防火墙

> docker会自动在防火墙列表中添加了开放端口的规则

**ufw**

ufw是Ubuntu系统上配置iptables防火墙的工具

```bash
#开启防火墙
ufw enable

#查看端口启用状态
ufw status

#开启端口
ufw allow <端口号>

#关闭端口
ufw deny <端口号>

#删除规则
ufw delete deny <端口号>
ufw delete allow <端口号>

#重新加载规则
ufw reload
```

**iptables**

直接使用iptables命令，linux大都通用

默认的 iptable s规则表有 filter 表（过滤规则表）、nat 表（地址转换规则表）、mangle（修改数据标记位规则表）、raw（跟踪数据表规则表）

```bash
#-L 表示查看当前表的所有规则，默认查看的是 filter 表
#如果要查看 nat 表，可以加上 -t nat 参数
iptables -L
```

