/*
 * 404路由 
 */

const path = require('path');
const fs = require('fs');
const mime = require('mime');
const func = async(soc, next) => {
    soc.response.status = 200;
    let p = path.join(__dirname, '../', 'views/404.html');
    soc.response.type = mime.lookup(p);
    console.log(p, ': nofound.js 7');
    soc.response.body = fs.createReadStream(p, 'utf-8');
    return
}

module.exports = {
    pathName: '/404',
    method: 'get',
    func,
}