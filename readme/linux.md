首先安装环境node和yarn,如果安装过并且node环境已经是最新的,就可以跳过,(由于操作系统版本环境的不同,不便赘述,所以这里先安装npm,再通过npm安装yarn,)

如果是树莓派用户,先通过ssh连接到你的树莓派的shell

安装node:后面就以 debain、ubuntu、kali 等系统环境为例子,如果是centos(redHat)系统,把apt-get改成yum就好了

    sudo apt-get install nodejs

安装npm

    sudo apt-get install npm 

安装yarn:因为国内使用npm比较慢，所以使用yarn，如果不想安装yarn,可以使用npm自行安装,记得更新要node版本

    sudo npm i -g yarn 

yarn安装n:更新node环境

    sudo yarn global add n

更新node

    sudo n stable

查看node环境，我测试的时候是v8.0.0,环境版本应该大于这个环境，查看环境版本

    node -v 

更改权限:在linux系统下,由于权限问题,建议把文件所有者改成你的用户名,并且给予文件执行权利

* 如果是kali用户,因为默认是root,所以只需要给予x权限即可:
    
        sudo chmod +x -R ./

* 其他linux系统用户(如果你不知道你的用户名是什么,输入 who 查看)

        sudo chown 你的用户名 -R  ./ && sudo chmod +x -R ./

运行这个进程和关闭当前这个进程:

给两种方案:

* 第一种,不放入后台(终端会打出控制信息):

    运行进程

        node server.js

    杀死进程进程

        使用ctrl+c快捷键


* 第二种放入后台(不打出控制信息,建议没有linux使用经验的使用者慎重使用下面的命令,我会尽可能详细讲解):


    如果想让当前进程放入后台,并且不在终端有信息输出,下面代码会在当前文件夹创建一个代码nohup.out,里面会保存控制信息(需要注意的是,当你输入下面的命令,需要再摁一次enter键才可以生效,否则无效):

        nohup node server.js &


    如果你想停止放入后台的当前运行进程:

    * 第一步查询node进程的pid:

            ps -ef|grep node


    * 第二步杀死进程:(pid是下面代码屏幕输出的第一行的第二列的数字)

            sudo kill -15 你查到的pid

上面详细讲解了linux用户的环境配置和运行关闭的问题,在运行过后,我们就可以看效果了

如果是树莓派用户