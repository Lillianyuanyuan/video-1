# video
### 一个基于node的流媒体项目，可以上传视频或者音频文件，兼容pc和移动端在线观看；

#### 这个项目应用人群：

* 前端新手，这个项目使用的前端技术比较广，vue,react,html5(媒体播放，canvas)，css3，响应式页面，es6的诸多特性，node(koa2框架)；
因为基于mvc架构，我也写了很多注释，所以维护或者更改是很方便的,可以自己扩展功能；

* 树莓派用户，使用node编写服务器还是很简单的，不需要依赖nginx等，在linux上的环境配置还是很简单的，将下载好的电影上传到树莓派上，同一个内网内的用户在手机上看，不用互相拷贝。除此之外他本身可以替代ftp服务；

* 暂时只想到这么多了；

#### 使用到的技术：
* html5 页面的播放器基于html5，所以可以跨平台，页面特效是canvas和svg等特效，并且页面都是响应式；

* es6 前端页面的js用了es6的很多特性编写，但是我没有使用`babel`转换，在最新版本的火狐浏览器和`chrome` 浏览器测试无误，建议使用最新版本火狐和新版本chrome，会有很好的体验；

* node koa2 因为使用了koa2框架，需要支持async等新特性，所以node环境需要升级到最新的版本，后面介绍环境配置；

* vue react 框架，这个项目不同页面使用了不同的框架，可以提供给前端新手作为练习，有问题可以跟我联系；

配置和安装

* linux用户
    
    首先安装环境node和npm，如果安装过并且node环境已经是最新的，就可以跳过
    
        如果是centos(redhat)系统，在shell输入

            sudo yum install nodejs 

        如果是debain、ubuntu、kali ... 系统，在shell输入

            sudo apt-get install nodejs
        
        之后安装，后面就以ubuntu环境为例子，centos用户改成yum就好了
        
            sudo apt-get install npm 
    
        因为npm在国内使用很慢，建议使用cnpm，如果不想安装cnpm，可以跳过，跳过这一步的情况下，那么后面的cnpm就换成npm就好了，shell输入

            sudo npm i -g cnpm 

        我们下载n来更新node环境，后面的命令不区分linux的系统
        
            sudo cnpm i -g n
         
        更新node

            sudo n stable
        
        查看node环境，我测试的时候是v8.0.0,环境应该大于这个环境，查看环境

            node -v 

        
# 项目正在开发中