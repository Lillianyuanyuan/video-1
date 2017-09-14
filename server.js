// created by swnb （小白不黑）
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const { port, uploadDir } = require('./config');
const koabody = require('koa-body');
const router = require('koa-router')();
const websocket = require('./controllers/websocket/ws');
const app = new Koa();

async function main() {
    const message = await new Promise(resolve => {
        fs.readdir('./controllers/', (err, files) => {
            if (!err) {
                for (let file of files) {
                    //确认是js文件
                    if (file.endsWith('.js')) {
                        const p = path.join(__dirname, 'controllers', file);
                        console.log('router:', file);
                        //获取文件和方法
                        const { pathName, get, post } = require(p);
                        //注册路由
                        post
                            ? router.post(
                                  pathName,
                                  koabody({
                                      multipart: true,
                                      formidable: {
                                          encoding: 'utf-8',
                                          uploadDir
                                      }
                                  }),
                                  post
                              )
                            : void 0;
                        get ? router.get(pathName, get) : void 0;
                    }
                }
                //注册路由
                app.use(router.routes());
                resolve('router register finish');
            } else {
                console.log(err);
                process.exit(0);
            }
        });
    });
    //路由注册完成后
    console.log(message);
    //处理错误的路由
    app.use(async (ctx, next) => {
        if (ctx.request.path === '/') {
            ctx.redirect('/sign.swnb');
        } else {
            ctx.redirect('/404');
        }
        await next();
    });
    // 获取server
    const server = app.listen(port);
    //交给ws使用，开启websocket
    websocket(server);
}

//开始运行
main();
