// created by swnb （小白不黑）
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const { port } = require('./config');
// const koabody = require('koa-body')({
//     multipart: true,
//     formidable: {
//         uploadDir: './',
//         maxFieldsSize: 700 * 1024 * 1024,
//         keepExtensions: true,
//     }
// });
const router = require('koa-router')();
const app = new Koa();

function main() {
    const routerRigister = new Promise((resolve) => {
        fs.readdir('./controllers/', (err, files) => {
            if (!err) {
                for (file of files) {
                    if (file.endsWith('.js')) {
                        const p = path.join(__dirname, 'controllers', file);
                        console.log('router:', file);
                        const { pathName, get, post } = require(p);
                        //注册路由
                        post ? router.post(pathName, post) : void(0);
                        get ? router.get(pathName, get) : void(0);
                    }
                }
                //注册路由
                app.use(router.routes());
                resolve('router register finish');
            } else {
                console.log(err);
            }
        });
    });
    //路由注册完成后
    routerRigister.then((message) => {
        console.log(message);
        app.use(async(ctx, next) => {
            if (ctx.request.path === '/') {
                ctx.redirect('/sign.swnb');
            } else {
                ctx.redirect('/404');
            }
            await next();
        });
        app.listen(port);
    })
};

main();