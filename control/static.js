/*
 *    静态文件路由
 */
const path = require('path');
const fs = require('fs');
const mime = require('mime');
//test
const func = async(soc, next) => {
    let p = soc.request.path;
    //安全处理路径
    p = path.normalize(p);
    p = path.join(__dirname, '../', p);
    console.log(p, ': static.js 8');
    //回调用promise来写
    const promise = new Promise((resolve) => {
        fs.exists(p, (bool) => {
            resolve(bool);
        });
    });
    const swi = await promise;
    if (swi) {
        soc.response.type = mime.lookup(p);
        soc.response.status = 200;
        soc.response.body = fs.readFileSync(p, 'utf-8');
    } else {
        soc.redirect('/404');
    }
}
module.exports = {
    pathName: '/static/:type/:name',
    method: 'get',
    func,
}