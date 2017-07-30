const fs = require('fs');
const path = require('path');
const func = async(ctx) => {
    ctx.status = 200;
    ctx.type = 'text/html;charset=utf-8';
    const p = path.join(__dirname, '..', 'views/test.html');
    console.log(p, ':test.js 7')
    ctx.body = fs.createReadStream(p, 'utf-8');
}
module.exports = {
    pathName: '/test',
    method: 'get',
    func,
}