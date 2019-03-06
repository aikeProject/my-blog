### 博客地址  [跳转](https://blog.rensailong.top/)
```http request
https://blog.rensailong.top/
```

### 使用`travis-cli`自动化发布`hexo`
```
language: node_js
node_js: stable

#cache
cache:
  directories:
    - "node_modules"

# 通知
notifications:
  email:
    recipients:
      - 1121352970@qq.com
    on_success: never
    on_failure: always

# 指定分支
# branches:
#   only:
#   - develop

before_install:
- npm install -g hexo
- npm install -g hexo-cli

install:
- npm install

script:
# - hexo clean
# - hexo generate
- npm run generate

after_success:
  # - hexo deploy
  - cd ./public
  - git init
  - git config --global user.name '成雨'
  - git config --global user.email '1121352970@qq.com'
  - git add .
  - git commit -m "generate static resources, triggerd by travis ci"
  - git push --force "https://aikeProject:${REPO_TOKEN}@${GH_REF}" master

# 指定环境变量
env:
  global:
    - GH_REF: github.com/aikeProject/aikeProject.github.io.git
```

#### 更新日志
-   docker使用.md
-   editorconfig配置文件.md
-   ESLint.md
-   express-node-demo.md
-   fetch的使用.md
-   flex.md
-   gulp.md
-   linux下部署express.md
-   linux基础入门.md
-   mongoDB.md
-   nginx静态服务器.md
-   nvm.md
-   travis-cli.md
-   vim常用命令.md
-   使用serve部署网站.md
-   前端工具集.md
-   正则.md
-   翻墙.md
-   音乐app笔记.md