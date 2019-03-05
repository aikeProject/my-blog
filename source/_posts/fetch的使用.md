---
title: fetch的使用
categories:
  - 前端
tags:
  - fetch
comments: false
date: 2019-03-05 20:21:53
---

### fetch 的使用
***
*   fetch的作用     
>   XMLHttpRequest的最新替代技术——FetchAPI，它是W3C的正式标准，本文将会介绍Fetch API的相关知识，以及探讨它所能使用的场景和能解决的问题。     
fetch就是一种可代替ajax获取/提交数据的技术，有些高级浏览器已经可以window.fetch使用了。相比于使用jQuery.ajax它轻量（只做这一件事），而且它原生支持 promise ，更加符合现在编程习惯

*   fetch的安装
>   `npm install whatwg-fetch --save`   
>   `npm install es6-promise --save` 兼容老版本浏览器 promise

*   使用语法
```
fetch(url, options).then(function(response) {
  // handle HTTP response
}, function(error) {
  // handle network error
})
```
*   options（可选）
```
一个配置项对象，包括所有对请求的设置。可选的参数有：

method: 请求使用的方法，如 GET、POST。
headers: 请求的头信息，形式为 Headers 对象或 ByteString。
body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
credentials: 请求的 credentials，如 omit、same-origin 或者 include。
cache: 请求的 cache 模式: default, no-store, reload, no-cache, force-cache, 或者 only-if-cached。

```
*   response    参数
```
一个 Promise，resolve 时回传 Response 对象：

属性
status (number) - HTTP请求结果参数，在100–599 范围
statusText (String) - 服务器返回的状态报告
ok (boolean) - 如果返回200表示请求成功则为true
headers (Headers) - 返回头部信息，下面详细介绍
url (String) - 请求的地址

方法：
text() - 以string的形式生成请求text
json() - 生成JSON.parse(responseText)的结果
blob() - 生成一个Blob
arrayBuffer() - 生成一个ArrayBuffer
formData() - 生成格式化的数据，可用于其他的请求

其他方法：
clone()
Response.error()
Response.redirect()
```
*   response.headers
```
has(name) (boolean) - 判断是否存在该信息头
get(name) (String) - 获取信息头的数据
getAll(name) (Array) - 获取所有头部数据
set(name, value) - 设置信息头的参数
append(name, value) - 添加header的内容
delete(name) - 删除header的信息
forEach(function(value, name){ ... }, [thisContext]) - 循环读取header的信息
```
***
*   get 请求
    *   JSON
        ```
        fetch(url)  // 传入url get请求
          .then(function(response) { 
            return response.json(); // 返回json数据
          }).then(function(data) {
            console.log(data);  // 取得json数据
          }).catch(function(e) {    
            console.log("Oops, error");// 错误异常
          });
        ```
    *   使用ES6写法
        ```
        fetch(url)
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(e => console.log("Oops, error", e))
        ```
***
*   post 请求
    *   json
        ```
        fetch('/users', {
          method: 'POST',// 请求方式
          headers: {    // 设置请求头
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'Hubot',
            login: 'hubot',
          })
        })
        ```
***
*   promise (es6)
    *   Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve方法和reject方法。如果异步操作成功，则用resolve方法将Promise对象的状态变为“成功”（即从pending变为resolved）；如果异步操作失败，则用reject方法将状态变为“失败”（即从pending变为rejected）
    *   promise实例生成以后，可以用then方法分别指定resolve方法和reject方法的回调函数
        ```
        //创建一个promise对象
        var promise = new Promise(function(resolve, reject) {
          if (/* 异步操作成功 */){
            resolve(value);
          } else {
            reject(error);
          }
        });
        //then方法可以接受两个回调函数作为参数。
        //第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。
        //其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
        promise.then(function(value) {
          // success
        }, function(value) {
          // failure
        });
        ```
***
