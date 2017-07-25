/*
 * 登录路由
 */
const path = require('path');
const fs = require('fs');
const func = async(ctx, next) => {
    let userName = '';
    ctx.cookies.get('username') ? (userName = ctx.cookies.get('username')) : (ctx.redirect('/sign.swnb'));
    ctx.status = 200;
    ctx.type = 'text/html;charset=utf-8';
    const p = path.join(__dirname, '..', 'views/upload.html');
    ctx.body = fs.createReadStream(p, 'utf-8');
};
module.exports = {
    pathName: '/upload',
    method: 'get',
    func,
}