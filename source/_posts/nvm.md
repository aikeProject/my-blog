---
title: nvm
categories:
  - 前端
tags:
  - nvm
  - 工具
comments: false
abbrlink: 20614
date: 2019-03-05 20:07:20
---

#### 1. 安装
```
https://github.com/coreybutler/nvm-windows/releases
```

#### 2. 安装完成以后需要进行配置
```
/**
*node下载源
*/
nvm node_mirror https://npm.taobao.org/mirrors/node/

/**
*npm下载源
*/
nvm npm_mirror  https://npm.taobao.org/mirrors/npm/
```

#### 3.常用命令
```
nvm arch                         查看当前系统的位数和当前nodejs的位数
nvm install <version> [arch]     安装制定版本的node 并且可以指定平台 version 版本号  arch 平台
nvm list [available]         
  - nvm list   查看已经安装的版本
  - nvm list installed 查看已经安装的版本
  - nvm list available 查看网络可以安装的版本
nvm on                           打开nodejs版本控制
nvm off                          关闭nodejs版本控制
nvm proxy [url]                  查看和设置代理
nvm node_mirror [url]            设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
nvm npm_mirror [url]             设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是：https://github.com/npm/npm/archive/.
nvm uninstall <version>          卸载制定的版本
nvm use [version] [arch]         切换制定的node版本和位数
nvm root [path]                  设置和查看root路径
nvm version                      查看当前的版本
```