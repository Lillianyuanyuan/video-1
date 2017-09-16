const path = require('path');
const fs = require('fs');
const func = async ctx => {
    const name = ctx.cookies.get('username');
    if (name) {
        ctx.status = 200;
        ctx.type = 'text/html;charset=utf-8';
        const p = path.join(__dirname, '..', '/views/index.html');
        ctx.body = fs.createReadStream(p, 'utf-8');
    } else {
        console.log('no cookies match username index.js 11');
        ctx.redirect('/sign.swnb');
    }
};
module.exports = {
    pathName: '/index.swnb',
    get: func
};
