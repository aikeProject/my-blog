---
title: mongoDB
categories:
  - 前端
tags:
  - mongodb
comments: false
abbrlink: 2240
date: 2019-03-05 20:16:50
---

### mongoDB 的使用

***
* 准备
> 1. 解压下载的安装包
>> `mongod` 启动服务器进程  `mongo` 打开客户端的shell(命令行工具)
> 2. `bin` 目录下新增文件 `mongodb.config`
> 3. 在 `mongodb.config` 添加 `dbpath=c:\mongodb\data` (即`data`文件夹所在的目录)
> 4. 在`bin`目录下运行命令行，`windows` 执行 `./mongod --config mongodb.config`
***
* 基础
> 1.  切换数据库 `use learn`，可用于创建  查看当前选择的库 `db`
> 2. `insert` 插入
>> `db.unicorns.insert({name: 'Aurora', gender: 'f', weight: 450})`
> 3. 'find' 查看 得到一个文档列表
>> `db.unicorns.find()`  
> 4. 掌握选择器（selector）
>> db.unicorns.find({gender: 'm', weight: {$gt: 700}})
>> `$lt` 小于 `$lte` 小于或等于 `$gt` 大于 `$gte` 大于等于 `$ne` 等于  
>> `db.unicorns.find({gender: 'm', weight: {$gt: 700}})`  
>>>  查看 'gender等于m weight 大于700' 的记录  
>
>> `$exists`操作符用于匹配一个域是否存在
>> db.unicorns.find({vampires: {$exists: false}})   
> 
>> `$or` 或  
>>  `db.unicorns.find({gender: 'f', $or: [{loves: 'apple'}, {loves: 'orange'}, {weight: {$lt: 500}}]})`
>
>> `db.unicorns.remove()` 删除操作
>> `db.unicorns.count()` 记录数量
***
* 更新操作
> `update` 
>> `db.unicorns.update({name: 'Roooooodles'}, {weight: 590})`   
>> 用后一个参数，替换前一个参数查到的记录内容
>> 仅需要替换其中的某个值 可以使用 `$set` 修饰符  
>> `db.unicorns.update({weight: 590}, {$set: {name: 'Roooooodles', dob: new Date(1979, 7, 18, 18, 44), loves: ['apple'], gender: 'm', vampires: 99}})
` 
>> `$inc` 可以用来将一个域的值增加一个正的或负的数值
>> `db.unicorns.update({name: 'Pilot'}, {$inc: {vampires: -2}})`  
>> `$push` 添加一个新值
>>  `db.unicorns.update({name: 'Aurora'}, {$push: {loves: 'sugar'}})`   
>> 插新操作 即将 `db.hits.update()` 第三个参数true   
>> 使用规则：当目标文档存在的时候，插新操作会更新该文档，否则就插入该新文档
* 多重更新 
> 更改符合条件的所有记录  需要把第四个参数设置为true
>> `db.unicorns.update({}, {$set: {vaccinated: true }}, false, true);`  
>
> update的默认行为是只更新第一个找到的文档
***
* 查找
> 域的选择  
> `find`还有第二个可选参数。该参数是一个列表，用户在这个表中指明要求find读取的域（相当于对要查询的字段进行指定）  
> `db.unicorns.find(null, {name: 1});`  
> 排除默认显示的`_id`字段，`{name:1, _id: 0}`可以显式地从返回结果中排除它,只能排除`_id`,其他是非法的 比如: `{_id:1, name:0}`，就是非法的 
>   
> 排序
> `db.unicorns.find().sort()` 规则： `1升序` `-1降序`
> `db.unicorns.find().sort({weight: -1})` 降序排序
>
> 分页    
> 分页可以通过`limit`以及`skip`这两个游标操作来实现   
> `db.unicorns.find().sort({weight: -1}).limit(2).skip(1)` 
> 
> 技术    
> 对一个集合直接执行 `count`   
> `db.unicorns.count({vampires: {$gt: 50}})`    
> 
***

