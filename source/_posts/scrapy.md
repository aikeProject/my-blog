---
title: scrapy
categories:
  - 后端
tags:
  - 爬虫
  - python
  - scrapy
comments: false
abbrlink: 36705
date: 2019-03-06 14:26:57
---

### [官方地址](https://docs.scrapy.org/en/latest/intro/tutorial.html)

#### 安装
```
conda install scrapy
```
#### 创建一个项目
1. `scrapy startproject myproject [project_dir]`
2. `cd project_dir`
3. `scrapy genspider mydomain mydomain.com`

#### 基本使用
-   通过`scrapy genspider zhihu www.zhihu.com`在`spiders`文件夹下生产爬取逻辑的代码文件
-   通过例子看基本使用
```python
# zhihu.py 通过 scrapy genspider zhihu www.zhihu.com 创建的
# 写主要的爬虫逻辑
# 这个例子是爬取知乎用户的关注人，关注人的关注人，一直递归下去

# -*- coding: utf-8 -*-
import json
import scrapy
from tutorial.items import UserItem

# 爬取知乎需要添加一些请求头信息
# 打开setting.py中的 DEFAULT_REQUEST_HEADERS并添加user-agent

class ZhihuSpider(scrapy.Spider):
    name = 'zhihu'
    allowed_domains = ['www.zhihu.com']
    start_urls = ['http://www.zhihu.com/']
    
    # 初始爬取的用户token_url，看一下知乎的请求链接结构就知道这个是用来干啥的了，其实就是用来标识每一个用户
    start_user = 'Talyer-Wei'
    # 请求用户详细信息
    user_url = 'https://www.zhihu.com/api/v4/members/{user}?include={include}'
    
    # 请求关注用户列表
    follows_url = 'https://www.zhihu.com/api/v4/members/{user}/followees?include={include}&offset={offset}&limit={limit}'
    
    # 这个是粉丝列表请求，爬取和爬关注用户是一样逻辑，没写
    # followers_url = 'https://www.zhihu.com/api/v4/members/{user}/followers?include={include}&offset={offset}&limit={limit}'

    # follows_url中include的参数
    user_query = 'allow_message%2Cis_followed%2Cis_following%2Cis_org%2Cis_blocking%2Cemployments%2Canswer_count%2Cfollower_count%2Carticles_count%2Cgender%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics'
    
    # follows_url中include的请求参数
    follows_query = 'data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics'

    # 重写启动请求
    def start_requests(self):
        # 爬取个人信息
        yield scrapy.Request(
            self.user_url.format(
                user=self.start_user,
                include=self.user_query
            ),
            callback=self.parse_user
        )
        # 爬取初始的关注用户
        yield scrapy.Request(
            self.follows_url.format(
                user=self.start_user,
                include=self.follows_query,
                offset=0,
                limit=20
            ),
            callback=self.parse_follows
        )

    # 请求回调
    def parse_user(self, response):
        result = json.loads(response.text)

        item = UserItem()
        for field in item.fields:
            if field in result.keys():
                item[field] = result[field]
        yield item

        # 爬取个人的详细信息
        yield scrapy.Request(
            self.follows_url.format(
                user=result.get('url_token'),
                include=self.follows_query,
                offset=0,
                limit=20
            ),
            callback=self.parse_follows
        )

    # 爬取关注自己的人
    def parse_follows(self, response):
        results = json.loads(response.text)

        # 再递归爬取关注自己人的，他的关注信息，就这样一直递归下去
        if 'data' in results.keys():
            for result in results.get('data'):
                yield scrapy.Request(
                    url=self.user_url.format(
                        user=result.get('url_token'),
                        include=self.user_query
                    ),
                    callback=self.parse_user
                )

        # 分页还未结束继续查找分页
        if 'paging' in results.get('paging') and results.get('paging').get('is_end') == False:
            next_page = results.get('paging').get('next')
            yield scrapy.Request(
                url=next_page,
                callback=self.parse_follows
            )

```
-   定义 `items`，相当于要保存数据的模型，通过`items.py`配置
```python
# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

from scrapy import Item, Field


class UserItem(Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    id = Field()
    name = Field()
    avatar_url = Field()
    headline = Field()
    description = Field()
    url = Field()
    url_token = Field()
    gender = Field()
    cover_url = Field()
    type = Field()
    badge = Field()

    answer_count = Field()
    articles_count = Field()
    commercial_question_count = Field()
    favorite_count = Field()
    favorited_count = Field()
    follower_count = Field()
    following_columns_count = Field()
    following_count = Field()
    pins_count = Field()
    question_count = Field()
    thank_from_count = Field()
    thank_to_count = Field()
    thanked_count = Field()
    vote_from_count = Field()
    vote_to_count = Field()
    voteup_count = Field()
    following_favlists_count = Field()
    following_question_count = Field()
    following_topic_count = Field()
    marked_answers_count = Field()
    mutual_followees_count = Field()
    hosted_live_count = Field()
    participated_live_count = Field()

    locations = Field()
    educations = Field()
    employments = Field()
    pass

```

- `pipelines.py` 在这个文件夹中，将`items`存入数据库
```
# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html


# class TutorialPipeline(object):
#     def process_item(self, item, spider):
#         return item


import pymongo
# 保存到MongoDB数据库
class MongoPipeline(object):

    collection_name = 'users'

    # 初始化数据库
    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    #获取全局setting设置
    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

    # 连接数据库
    # open_spider spider 启动
    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    # close_spider 关闭
    # 关闭数据库链接
    def close_spider(self, spider):
        self.client.close()

    # 存入数据
    def process_item(self, item, spider):
        # 更新去重
        self.db[self.collection_name].update({'url_token': item['url_token']}, dict(item), True)
        return item
```




