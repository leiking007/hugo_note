---
title: "Linux的一些东西"
date: 2021-11-01
lastmod: 2021-11-11 12:12:12
draft: false
tags: ['Linux']
categories: ["后端"]
author: "lei"
---

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

