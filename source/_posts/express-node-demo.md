---
title: express-node-demo
categories:
  - 前端
tags:
  - express
comments: false
abbrlink: 23719
date: 2019-03-05 20:15:14
---

### express-node    
*   `npm init`  
*   安装 `express`    
    * `npm i express@4.14.0 --save` 
*   supervisor 解决每次修改代码，重启服务问题  
    * `npm i -g supervisor` 
    * `运行 supervisor index 启动程序`    
    * supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序
*   路由
```js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('hello, express')
})

app.get('/users/:name', function (req, res) {
  res.send('hello, ' + req.params.name)
})

app.listen(3000)
```
*   express.Router
```js
// index.js // 根目录

const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000)

// routes/index.js router目录

const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('hello, express')
})

module.exports = router

// routes/users.js router目录

const express = require('express')
const router = express.Router()

router.get('/:name', function (req, res) {
  res.send('hello, ' + req.params.name)
})

module.exports = router
```
*   模板引擎
    *   `ejs` 安装 `npm i ejs --save` 

***
### 前端博客
> 目录结构
```
models: 存放操作数据库的文件
public: 存放静态文件，如样式、图片等
routes: 存放路由文件
views: 存放模板文件
index.js: 程序主文件
package.json: 存储项目名、描述、作者、依赖等等信息
```
> 安装项目的依赖模块
```
npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session marked moment   mongolass objectid-to-timestamp sha1 winston express-winston --save
```
> 对应模块的用处
```
express: web 框架
express-session: session 中间件
connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
connect-flash: 页面通知的中间件，基于 session 实现
ejs: 模板
express-formidable: 接收表单及文件上传的中间件
config-lite: 读取配置文件
marked: markdown 解析
moment: 时间格式化
mongolass: mongodb 驱动
objectid-to-timestamp: 根据 ObjectId 生成时间戳
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: express 的 winston 日志中间件
```
> ESlint
```
ESLint 是一个代码规范和语法错误检查工具。使用  ESLint 可以规范我们的代码书写，可以在编写代码期间就能发现一些低级错误
```
* 全局安装 eslint
`npm i eslint -g`
* 运行
`eslint --init`
* 初始化 eslint 配置
```
-> Use a popular style guide
-> Standard
-> JSON
eslint 会创建一个 .eslintrc.json 的配置文件，同时自动安装并添加相关的模块到 devDependencies。这里我们使用 Standard 规范，其主要特点是不加分号
```
ESLint 需要结合编辑器或 IDE 使用，如：

Sublime Text 需要装两个插件：SublimeLinter + SublimeLinter-contrib-eslint
VS Code 需要装一个插件：ESLint
> EditorConfig

EditorConfig 是一个保持缩进风格的一致的工具，当多人共同开发一个项目的时候，往往会出现每个人用不同编辑器的情况，而且有的人用 tab 缩进，有的人用 2 个空格缩进，有的人用 4 个空格缩进，EditorConfig 就是为了解决这个问题而诞生  
EditorConfig 需要结合编辑器或 IDE 使用，如：

Sublime Text 需要装一个插件：EditorConfig
VS Code 需要装一个插件：EditorConfig for VS Code

使用 -> 新建 .editorconfig 的文件 添加如下内容
```
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
tab_width = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```
使用 2 个空格缩进，tab 长度也是 2 个空格。trim_trailing_whitespace 用来删除每一行最后多余的空格，insert_final_newline 用来在代码最后插入一个空的换行。

* 配置文件  
不管是小项目还是大项目，将配置与代码分离是一个非常好的做法。我们通常将配置写到一个配置文件里，如 config.js 或 config.json ，并放到项目的根目录下。但实际开发时我们会有许多环境，如本地开发环境、测试环境和线上环境等，不同环境的配置不同（如：MongoDB 的地址），我们不可能每次部署时都要去修改引用 config.test.js 或者 config.production.js。config-lite 模块正是你需要的
> config-lite

config-lite 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件。如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 NODE_ENV=test node app 启动，则 config-lite 会依次降级查找 config/test.js、config/test.json、config/test.node、config/test.yml、config/test.yaml 并合并 default 配置; 如果程序以 NODE_ENV=production node app 启动，则 config-lite 会依次降级查找 config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 并合并 default 配置。
> 新建配置文件 config/default.js
```js
module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
```
配置释义：

port: 程序启动要监听的端口号
session: express-session 的配置信息，后面介绍
mongodb: mongodb 的地址，以 mongodb:// 协议开头，myblog 为 db 名

* 功能与路由设计 
```
功能及路由设计如下：

注册
  注册页：GET /signup 
  注册（包含上传头像）：POST /signup
登录
  登录页：GET /signin
  登录：POST /signin
  登出：GET /signout
查看文章
  主页：GET /posts
  个人主页：GET /posts?author=xxx
  查看一篇文章（包含留言）：GET /posts/:postId
发表文章
  发表文章页：GET /posts/create
  发表文章：POST /posts/create
修改文章
  修改文章页：GET /posts/:postId/edit
  修改文章：POST /posts/:postId/edit
  删除文章：GET /posts/:postId/remove
留言
  创建留言：POST /comments
  删除留言：GET /comments/:commentId/remove
```
由于我们博客页面是后端渲染的，所以只通过简单的 (GET) 和 (POST) 与后端进行交互，如果使用 jQuery 或者其他前端框架（如 Angular、Vue、React 等等）可通过 Ajax 与后端交互，则 api 的设计应尽量遵循 Restful 风格。

> Restful

Restful 是一种 api 的设计风格，提出了一组 api 的设计原则和约束条件。
如上面删除文章的路由设计：

GET /posts/:postId/remove
Restful 风格的设计：

DELETE /posts/:postId

* 会话
```
由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）。

cookie 与 session 的区别

cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
session 更安全，cookie 可以直接在浏览器查看甚至编辑
```
> 我们通过引入 express-session 中间件实现对会话的支持：
app.use(session(options))

session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user

*  页面通知
```
我们还需要这样一个功能：当我们操作成功时需要显示一个成功的通知，如登录成功跳转到主页时，需要显示一个 登陆成功 的通知；当我们操作失败时需要显示一个失败的通知，如注册时用户名被占用了，需要显示一个 用户名已占用 的通知。通知只显示一次，刷新后消失，我们可以通过 connect-flash 中间件实现这个功能。

connect-flash 是基于 session 实现的，它的原理很简单：设置初始值 req.session.flash={}，通过 req.flash(name, value) 设置这个对象下的字段和值，通过 req.flash(name) 获取这个对象下的值，同时删除这个字段，实现了只显示一次刷新后消失的功能。

express-session、connect-mongo 和 connect-flash 的区别与联系

express-session: 会话（session）支持中间件
connect-mongo: 将 session 存储于 mongodb，需结合 express-session 使用，我们也可以将 session 存储于 redis，如 connect-redis
connect-flash: 基于 session 实现的用于通知功能的中间件，需结合 express-session 使用
```
* 权限控制  
不管是论坛还是博客网站，我们没有登录的话只能浏览，登陆后才能发帖或写文章，即使登录了你也不能修改或删除其他人的文章，这就是权限控制。我们也来给博客添加权限控制，如何实现页面的权限控制呢？我们可以把用户状态的检查封装成一个中间件，在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制。在 myblog 下新建 middlewares 目录，在该目录下新建 check.js，添加如下代码
***
* 用户模型设计    
> 只存储用户的名称、密码（加密后的）、头像、性别和个人简介这几个字段   
> `lib/mongo.js`    
```js
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
})
exports.User.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一
```
* 注册页
> 新建 `views/signup.ejs`
* 注册与文件上传
>  使用 `express-formidable` 处理 form 表单 （包括文件上传）
>  修改 `index.js`
```js
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))
```
> 使用 express-formidable 处理表单的上传，表单普通字段挂载到 req.fields 上，表单上传后的文件挂载到 req.files 上，文件存储在 public/img 目录下。然后校验了参数，校验通过后将用户信息插入到 MongoDB 中，成功则跳转到主页并显示『注册成功』的通知，失败（如用户名被占用）则跳转回注册页面并显示『用户名已被占用』的通知
> 
***

