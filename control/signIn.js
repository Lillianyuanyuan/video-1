/*
 *   cookie 路由
 */

const func = async(ctx) => {
    const name = ctx.request.body.fields.username;
    console.log(name, ': signIn.js 7');
    ctx.cookies.set('username', name, {
        expires: new Date(Date.now() + 12000).toUTCString(),
    });
    ctx.redirect('/index.swnb');
}
module.exports = {
    pathName: '/signin.swnb',
    method: 'post',
    func,
}