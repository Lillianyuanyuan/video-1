/*
 *       登录模块
 */
const fs = require('fs');
const path = require('path');
const func = async(ctx, next) => {
    const log = () => {
        ctx.status = 200;
        ctx.type = 'text/html;charset=utf-8';
        const p = path.join(__dirname, '..', 'views/sign.html');
        ctx.body = fs.createReadStream(p, 'utf-8');
    }
    ctx.cookies.get('username') ? (ctx.redirect('/index.swnb')) : log();
}
module.exports = {
    pathName: '/sign.swnb',
    method: 'get',
    func,
}