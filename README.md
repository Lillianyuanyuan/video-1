# video
### 一个基于node的流媒体项目，可以上传视频或者音频文件，附带一个websocket的聊天室，响应布局；

 ![sign page](./readme/swnb_1.mp4)


 ![index page](./readme/swnb_2.mp4)


 ![vue page](./readme/swnb_3.mp4)

## 这个项目面向对象：

* 前端朋友，这个项目使用的前端技术比较广，vue,html5(媒体播放，canvas)，css3，svg动画，响应式页面，es6语法，node(koa2框架)；基于mvc架构，我也写了很多注释，所以维护或者更改是很方便的,可以自己扩展功能，我也会之后写新的东西；

* 树莓派用户，使用node写后台还是很简单的，在linux上的环境配置也很简单的，将下载好的电影上传到树莓派上，同一个内网内的用户在手机上看，不用互相拷贝。除此之外他本身可以替代ftp的一部分功能；

* 暂时只想到这么多了；

## 使用到的技术：
* html5 : 页面的播放器基于html5，所以可以跨平台，页面特效是canvas和svg等实现的。

* es6 :js用了es6的语法，在最新版本的火狐浏览器和`chrome` 浏览器测试无误，建议使用最新版本火狐和新版本chrome，会有很好的体验；

* node koa2 : 因为使用了koa2框架，需要支持async等新特性，所以node环境需要升级到`8.0.0`的版本，后面介绍环境配置；

* vue  : 这个项目的的页面项目在[page](https://github.com/swnb/vue_webpage)，有问题可以跟我联系；

## 配置和安装

* linux用户
    
    如果没有linux使用经验,建议仔细阅读[详细配置指导](./readme/linux.md)来配置环境,如果是linux熟练使用者,请直接阅读[简略配置指导](./readme/linuxS.md).
    
    因为[linux初级详细指导](./readme/linux.md)写的非常详细.所以如果运行失败,建议仔细阅读安装指导

    [linux详细安装指导](./readme/linux.md)

    [linux简单安装指导](./readme/linuxS.md)
        

欢迎大家有问题给我发邮件，很希望能跟大家成为朋友
