---
title: 使用serve部署网站
categories:
  - 前端
tags:
  - react
  - 部署
  - 前端
comments: false
abbrlink: 5375
date: 2019-03-05 19:36:34
---

-   安装`pm2`
```
npm i pm2 -g
```

-   安装完成后，执行命令，为我们的 pm2 添加开机自启动
```
pm2 startup systemd 
pm2 save
```

-   安装`serve`
```
npm i pm2 -g
```

-   编写`pm2`配置文件，就叫`pm2.config.js`吧
```
const path = require('path');

module.exports = {
    apps: [
        {
            name: 'music-app',
            script: '/root/app/nodejs/lib/node_modules/serve/bin/serve.js',
            args: '-p 5000 -s build',
        }
    ]
}
```

-   启动`pm2`
```
pm2 start pm2.config.js
```

-   简单配置nginx
```
server
    {
       listen 80;
       server_name music.rensailong.top;
       location /
       {
           proxy_pass http://127.0.0.1:5000/;
       }
    }
```
-   然后通过`music.rensailong.top`就能访问到你部署在5000端口的网站了
