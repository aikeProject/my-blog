---
title: flex
categories:
  - 前端
tags:
  - flex
  - css
comments: true
abbrlink: 59381
date: 2019-03-05 20:23:09
---

#### 6个属性设置在容器上
```
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
```

-   1.flex-direction  项目的排列方向
    ```
    row（默认值）：主轴为水平方向，起点在左端。
    row-reverse：主轴为水平方向，起点在右端。
    column：主轴为垂直方向，起点在上沿。
    column-reverse：主轴为垂直方向，起点在下沿。
    ```
    
-   2.flex-wrap  换行
    ```
    nowrap（默认）  不换行
    wrap 换行
    wrap-reverse 换行，第一行下方（反向换行）
    ```
    
-   3.flex-flow （是上两个属性的简写）

-   4.justify-content 水平对齐方式
    ```
    flex-start 左对齐
    flex-end 右对齐
    center 居中对齐
    space-between 两端对齐
    space-around 等分对齐
    ```
    
-   5.align-items  （垂直对齐方式）
    ```
    flex-start：交叉轴的起点对齐。
    flex-end：交叉轴的终点对齐。
    center：交叉轴的中点对齐。
    baseline: 项目的第一行文字的基线对齐。
    stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
    ```
    
-   6.aligin-content （类似于水平对齐 justify-content ）
    ```
    flex-start：与交叉轴的起点对齐。
    flex-end：与交叉轴的终点对齐。
    center：与交叉轴的中点对齐。
    space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    stretch（默认值）：轴线占满整个交叉轴。
    ```


-   6个项目属性
    ```
    order
    flex-grow
    flex-shrink
    flex-basis
    flex
    align-self
    ```
```
1.order  项目排列顺序 越小越靠前 默认为0
2.flex-grow 项目放大比例 默认为0   0 即不放大
3.flex-shrink 项目缩小比例 默认为1  1 即如果空间不足，将缩小
4.flex-basis 固定空间   它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间
5.flex  是flex-grow, flex-shrink 和 flex-basis的简写 默认值 0 0 auto （推荐使用）
6.aligin-self  允许单个项目有与其他项目不一样的对齐方式
除了auto，其他都与align-items属性完全一致
默认值为auto，表示继承父元素的align-items属性，
如果没有父元素，则等同于stretch
```
