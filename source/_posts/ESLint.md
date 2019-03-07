---
title: ESLint
categories:
  - 前端
tags:
  - eslint
comments: false
abbrlink: 21088
date: 2019-03-05 20:18:36
---

## ESLint 使用
* 安装
> `npm install eslint --save-dev`
* 创建
> `eslint --init` ESlint初始化后生成`.eslintrc`配置文件  
> 检查`react`使用`eslint-plugin-react` 
### 使用
```js
{
    // 解析器
    "parser": "babel-eslint",
    // 引用配置 用于react
    "extends": [
        // ESlint官方配置
        "eslint:recommended",
        //推荐的react配置
        "plugin:react/recommended"
    ],
    // eslint-plugin-react 默认配置
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React"
        },
        "propWrapperFunctions": ["forbidExtraProps"]
    },
    // 规则
    "rules": {
        "no-console":"off",
        "no-undef":"off",
        "react/display-name":"off"
    }
}
/**
    eslint 检查
    --ext 指定检查的扩展名和文件
    --fix 运行自动修复，并不是所有都能修复
    package.json文件
    "scripts": {
    "lint": "eslint --ext .js src test",
    "lintX":"eslint --ext .js src test --fix"
  },
*/

```
>其余配置查看
### [ESLint官网](http://eslint.cn/docs/rules/)


