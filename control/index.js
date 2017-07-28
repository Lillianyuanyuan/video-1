const path = require('path');
const fs = require('fs');
const func = async(ctx) => {
    ctx.status = 200;
    ctx.type = 'text/html;charset=utf-8';
    const p = path.join(__dirname, '..', '/views/index.html')
    ctx.body = fs.createReadStream(p, 'utf-8');
}
module.exports = {
    pathName: '/index.swnb',
    method: 'get',
    func,
}