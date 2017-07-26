// created by swnb （小白不黑）
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser')();
const router = require('koa-router')();
const app = new Koa();
app.use(bodyparser);
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
                        (method === 'post' || method === 'get') ? ((method === 'get') ? router.get(pathName, func) : router.post(pathName, func)) : console.log('something wrong about router');
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
        const { port } = require('./config');
        app.listen(port);
    }
};
main();