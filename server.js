const fs = require('fs');
const path = require('path');
const evEmit = require('events');
const e = new evEmit();
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();
const app = new Koa();
app.use(bodyparser);
fs.readdir('./control/', (err, files) => {
    if (!err) {
        for (file of files) {
            if (file.endsWith('.js')) {
                let p = path.resolve('./control', file);
                const { pathName, method, func } = require(p);
                if (method === 'get') {
                    router.get(pathName, func);
                }
            }
        }
        e.emit('readdir_end', 'read_finish');
    } else {
        throw new Error('can not read dir control ');
    }
});
e.on('readdir_end', (i) => {
    console.log(router);
})