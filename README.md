### 使用`travis-cli`自动化发布`hexo`
```s
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
- hexo clean
- hexo generate

after_success:
  - cd ./public
  - git init
  - git config --global user.name '成雨'
  - git config --global user.email '1121352970@qq.com'
  - git add .
  - git commit -m "generate static resources, triggerd by travis ci"
  - git push --force "https://aikeProject:${REPO_TOKEN}@${GH_REF}" master:master

# 指定环境变量
env:
  global:
    - GH_REF: github.com/aikeProject/aikeProject.github.io.git
```