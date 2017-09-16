// created by swnb （小白不黑）
const fs = require('fs');
const path = require('path');
const util = require('util');
const Koa = require('koa');
const { port, uploadDir, clean_media_after_exit } = require('./config');
const koabody = require('koa-body');
const router = require('koa-router')();
const websocket = require('./controllers/websocket/ws');
const app = new Koa();
const cleanTmpFiles = require('./shim/cleanTmpFiles');

//promise封装fs.readdir
const fsReadDir = util.promisify(fs.readdir);

async function main() {
    const files = await fsReadDir(path.join('./', 'controllers', 'routers'));
    files.forEach(file => {
        //确认是js文件
        if (file.endsWith('.js')) {
            const p = path.join(__dirname, 'controllers', 'routers', file);
            console.log('router:', file);
            //获取文件和方法
            const { pathName, get, post } = require(p);
            //注册路由
            post
                ? router.post(
                      pathName,
                      koabody({
                          multipart: true,
                          formidable: { encoding: 'utf-8', uploadDir }
                      }),
                      post
                  )
                : void 0;
            get ? router.get(pathName, get) : void 0;
        }
    });

    //注册路由
    app.use(router.routes());

    //路由注册完成后
    console.log('router register finish');

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

process.on('exit', () => {
    if (clean_media_after_exit) {
        cleanTmpFiles();
    }
});
