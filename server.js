// created by swnb （小白不黑）

const fs = require('fs');
const path = require('path');
const util = require('util');
const evEmit = require('events');
const e = new evEmit();
const Koa = require('koa');
const bodyparser = require('koa-bodyparser')();
const router = require('koa-router')();
const app = new Koa();
app.use(bodyparser);
fs.readdir('./control/', (err, files) => {
    if (!err) {
        for (file of files) {
            if (file.endsWith('.js')) {
                const p = path.resolve('./control', file);
                console.log('router:', file);
                const { pathName, method, func } = require(p);
                if (method === 'get') {
                    router.get(pathName, func);
                }
            }
        }
        app.use(router.routes());
        e.emit('router_end', 'router_finish');
    } else {
        console.log(err);
    }
});
e.on('router_end', (message) => {
    console.log(message);
    const p = path.resolve('./control/staticControl/staticFile.js');
    const func = require(p);
    app.use(func);
    app.listen(8080);
})