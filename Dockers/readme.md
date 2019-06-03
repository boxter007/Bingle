通过Docker镜像保存各种语言的编译环境，使用的时候通过连接池动态调用Docker镜像来编译和运行。这样保证了代码执行的安全性和执行效率
### 安装Docker
#### MacOS
1. 打开终端
2. 通过brew安装Docker，执行过程时间较长。
```d
brew cask install docker
```
当看到docker was successfully installed!的时候表示安装成功，这个时候Applications文件夹中多了个Docker.app，可以点击直接启动。
3. 在终端中,查看docker版本
```d
docker --version
Docker version 18.09.2, build 6247962
```
4. 镜像加速。鉴于国内网络问题，后续拉取 Docker 镜像十分缓慢，我们可以需要配置加速器来解决：http://hub-mirror.c.163.com。
在任务栏点击 Docker for mac 应用图标 -> Perferences... -> Daemon -> Registry mirrors。在列表中填写加速器地址即可。修改完成之后，点击 Apply & Restart 按钮，Docker 就会重启并应用配置的镜像地址了。
5. 查看是否配置成功
```d
 docker info
 ```
