---
title: editorconfig配置文件
categories:
  - 前端
tags:
  - editorconfig
comments: true
abbrlink: 23458
date: 2019-03-05 20:19:46
---

### 配合编辑器插件使用
> 例如： Visual Studio Code ： EditorConfig 

```
# editorconfig.org
root = true

[*]
# 缩进使用tab键
indent_style = tab
# tab长度
tab_width = 4
# 空格长度
indent_size = 2
# 换行符类型
end_of_line = lf
# 文件的编码
charset = utf-8
# 自动删除行尾空格
trim_trailing_whitespace = true
# 以一个空白符结尾
insert_final_newline = true


[*.md]
# .md文件保留行尾空格
trim_trailing_whitespace = false

# * 	匹配除/之外的任意字符
# ** 	匹配任意字符串
# ? 	匹配任意单个字符
# [name] 	匹配name字符
# [!name] 	不匹配name字符
# [s1,s2,s3] 	匹配给定的字符串
# [num1..num2] 	匹配num1到mun2直接的整数

# indent_style 	缩进使用tab或者space
# indent_size 	缩进为space时，缩进的字符数
# tab_width 	缩进为tab时，缩进的宽度
# end_of_line 	换行符的类型。lf, cr, crlf三种
# charset 	文件的charset。有以下几种类型：latin1, utf-8, utf-8-bom, utf-16be, utf-16le
# trim_trailing_whitespace 	是否将行尾空格自动删除
# insert_final_newline 	是否使文件以一个空白行结尾
# root 	表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件

```