/*
 *   cookie 路由
 */
const path = require('path');
const func = async(ctx) => {
    const name = ctx.request.body.fields.username;
    console.log(name, 'signin : signIn.js 7');
    const config = path.join(__dirname, '..', 'config.js');
    let expires = require(config).cookies_expires;
    expires = new Date(Date.now() + expires);
    ctx.cookies.set('username', name, {
        expires,
    });
    ctx.redirect('/index.swnb');
    // ctx.status = 301;
    // ctx.set({ 'Location': '/index.swnb' });
}
module.exports = {
    pathName: '/signin.swnb',
    method: 'post',
    func,
}