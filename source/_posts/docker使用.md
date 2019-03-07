---
title: docker使用
categories:
  - 后端
tags:
  - docker
comments: false
abbrlink: 43906
date: 2019-02-21 19:46:14
---

#### 安装`docker` (使用的是腾讯云主机)
-  `yum install docker-io -y`
-  `docker -v` 查看版本
-  `service docker start` 启动`docker`
-  `chkconfig docker on` 设置开机自启

#### 配置`docker`
- 因为国内访问 Docker Hub 较慢, 可以使用腾讯云提供的国内镜像源, 加速访问 Docker Hub 依次执行以下命令
- `echo "OPTIONS='--registry-mirror=https://mirror.ccs.tencentyun.com'" >> /etc/sysconfig/docker`
- `systemctl daemon-reload`
- `service docker restart`

#### `docke`命令 [docke](http://dockone.io/article/102)
-   `docker info` 查看Docker是否安装正确 
-   `docker images` 查看镜像列表
-   `docker ps` 查看容器列表
-   `sudo docker pull busybox` 拉取一个叫做`busybox`的镜像
-   `docker logs` 查看日志
-   删除容器
    -   `docker stop [id]`
    -   `docker rm [id]`
-   `docker commit $sample_job job1` 将容器的状态保存为镜像`
-   `docker search name` 查找镜像
-   `docker history (image_name)` 查看镜像的历史版本
-   `docker push (image_name)` 将镜像推送到registry

#### Dockerfile [Dockerfile](http://dockone.io/article/103)
所有Dockerfile都必须以FROM命令开始。 FROM命令会指定镜像基于哪个基础镜像创建，接下来的命令也会基于这个基础镜像（译者注：CentOS和Ubuntu有些命令可是不一样的）。FROM命令可以多次使用，表示会创建多个镜像
```
FROM <image name>
```
`Dockerfile`命令

1.MAINTAINER：设置该镜像的作者
```
MAINTAINER <author name>
```
2.RUN：在shell或者exec的环境下执行的命令。RUN指令会在新创建的镜像上添加新的层面，接下来提交的结果用在Dockerfile的下一条指令中
```
RUN <command>
```
3.ADD：复制文件指令。它有两个参数<source>和<destination>。destination是容器内的路径。source可以是URL或者是启动配置上下文中的一个文件
```
ADD <src> <destination>
```
4.CMD：提供了容器默认的执行命令。 Dockerfile只允许使用一次CMD指令。 使用多个CMD会抵消之前所有的指令，只有最后一个指令生效。 CMD有三种形式：
```
CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2
```
5.EXPOSE：指定容器在运行时监听的端口。语法如下：
```
EXPOSE <port>;
```
6.ENTRYPOINT：配置给容器一个可执行的命令，这意味着在每次使用镜像创建容器时一个特定的应用程序可以被设置为默认程序。同时也意味着该镜像每次被调用时仅能运行指定的应用。类似于CMD，Docker只允许一个ENTRYPOINT，多个ENTRYPOINT会抵消之前所有的指令，只执行最后的ENTRYPOINT指令。语法如下：
```
ENTRYPOINT ["executable", "param1","param2"]
ENTRYPOINT command param1 param2
```
7.WORKDIR：指定RUN、CMD与ENTRYPOINT命令的工作目录
```
WORKDIR /path/to/workdir
```
8.ENV：设置环境变量。它们使用键值对，增加运行程序的灵活性
```
ENV <key> <value>
```
9. USER：镜像正在运行时设置一个UID
```
USER <uid>
```
10. VOLUME：授权访问从容器内到主机上的目录
```
VOLUME ["/data"]
```
11.[更多命令](http://dockone.io/article/106)
例如
```
FROM node

MAINTAINER ChengYu "https://github.com/aikeProject"

# 优先将 ./package.json  复制到镜像中，预先加载第三方依赖
COPY . /app/

WORKDIR /app

RUN npm i

# 暴露3000端口
EXPOSE 3000

CMD npm start
```
   
