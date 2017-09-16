/*
 *    读取数据
 */
const path = require('path');
const fs = require('fs');
const util = require('util');

//promise封装
const readir = util.promisify(fs.readdir);

const func = async ctx => {
    const dir = path.join(__dirname, '..', '..', 'static/mediaData');
    //安全处理路径
    const p = path.join(dir, path.normalize(ctx.params.type));
    try {
        //读取文件夹里面的文件按
        let files = await readir(p);
        let data = {};
        let id = 1;
        files.forEach(fileName => {
            const name = fileName.split('_');
            const [user, filename] = [name[0], name[1]];
            data[filename] = {
                id: id++,
                user,
                filename
            };
        });

        /*      返回数据对象，作为数据的输出
     *      {id,user,filename}
     */

        ctx.body = JSON.stringify(data);
    } catch (e) {
        console.log(err);
    }
};

module.exports = {
    pathName: '/media/:type',
    get: func
};
