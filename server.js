// created by swnb （小白不黑）
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const koabody = require('koa-body')({ multipart: true });
const router = require('koa-router')();
const app = new Koa();
const main = async() => {
    const router_flag = new Promise((resolve) => {
        fs.readdir('./control/', (err, files) => {
            if (!err) {
                for (file of files) {
                    if (file.endsWith('.js')) {
                        const p = path.resolve('./control', file);
                        console.log('router:', file);
                        const { pathName, method, func } = require(p);
                        //注册路由
                        (method === 'post' || method === 'get') ? ((method === 'get') ? router.get(pathName, func) : router.post(pathName, koabody, func)) : console.log('something wrong about router');
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

    const swi = await router_flag;
    const { port } = require('./config');
    console.log(swi);
    //路由注册完成后
    if (swi) {
        app.use(async(ctx, next) => {
            if (ctx.request.path === '/') {
                ctx.redirect('/sign.swnb');
            } else {
                ctx.redirect('/404');
            }
            await next();
        });
        app.listen(port);
    }
};

main();