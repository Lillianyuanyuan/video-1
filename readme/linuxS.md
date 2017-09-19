首先需要`node v8.0.0` 以上的node环境,后面以ubuntu为例,centos改成yum就好了

    sudo apt-get install nodejs

[安装yarn](https://yarnpkg.com/en/docs/install)

> 也可以使用npm,但是比较慢

yarn 安装 n (更新node版本)

    sudo yarn global install n && sudo n stable

下载项目
    
    git clone https://github.com/swnb/video.git

进入目录执行

    cd video && node server.js

考虑到单线程的不稳定型，我写了一个多进程的运行脚本，如果需要考虑稳定异常退出，那么就请使用

    node server.cluster.js

推荐使用安装`pm2`并使用运行

pm2的使用这里就不多说了

上面是安装的简化教程,如果不明白建议看[安装指导](./linux.md)来安装

感谢大家，希望使用愉快