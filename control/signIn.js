/*
 *   cookie 路由
 */

const func = async(ctx) => {
    console.log(ctx.body);
    console.log(ctx.request.body);
    const name = ctx.body;
    console.log(name, ': signIn.js 7');
    ctx.cookies.set('username', name, {
        expires: new Date(Date.now() + 12000)
    });
    ctx.redirect('/index.swnb');
}
module.exports = {
    pathName: '/signin.swnb',
    method: 'post',
    func,
}