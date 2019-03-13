---
title: linux下部署express
categories:
  - 前端
tags:
  - 部署
  - 前端
  - express
comments: true
abbrlink: 51162
date: 2019-03-05 19:38:03
---

### 安装基础软件
-   安装`nginx`
```
yum install nginx -y
```
-   安装`node`
    -   安装`nvm` [nvm](https://github.com/creationix/nvm)
-   安装`npm`加速
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 安装 Express
-   安装 `Express` 生成器
```
cnpm install express-generator -g
```
-   创建一个 `express` 站点
    -   接下来，我们来创建一个 express 站点， 执行如下命令，来初始化一个新的以 cloud 为名的应用，
    ```
    cd /home/
    express cloud
    ```
    -   初始化完成后，进入到目录中，安装对应的依赖
    ```
    cd cloud 
    cnpm install
    ```

-   测试express
    -   执行如下命令，来启动 Express ，进行测试
    ```
    DEBUG=cloud:* npm start
    ```
    -   此时，我们可以打开浏览器，访问 http://111.231.56.173:3000 就可以访问默认的 Express 界面的内容。
    

-   安装`pm2`
```
npm i pm2 -g
```

-   安装完成后，执行命令，为我们的 pm2 添加开机自启动
```
pm2 startup systemd 
pm2 save
```

###   使用 PM2 启动 Express
-      执行如下命令，来使用 `pm2` 来启动我们的 `express`
```
pm2 start ./bin/www
```
    
-    接下来，我们来创建 Nginx 配置文件`(/etc/nginx/conf.d/cloud.conf)`，用于对 Express 进行反向代理，在文件中添加如下代码
```
    upstream cloud-app{
    server 127.0.0.1:3000;
    keepalive 64;
    }
    server{
        listen 80;
        server_name 111.231.56.173;
        root /home/cloud;
    
        location / {
            proxy_set_header HOST $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_pass http://cloud-app/;
            proxy_redirect off;
            proxy_read_timeout 240s;
        }
    
    }
```
-   添加完成后执行 `nginx -t` 来检测配置文件是否正常。
-   如果没有报错，就执行 `nginx -s reload (在nginx的目录下重启)` 来让重新加载配置文件。

























