/*
 *    读取数据
 */
const path = require('path');
const fs = require('fs');

//读取文件的路径确认文件是否成存在
const readir = path => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            err ? reject(err) : resolve(files);
        });
    });
};

const func = async ctx => {
    const dir = path.join(__dirname, '..', '..', 'static/mediaData');
    //安全处理路径
    const p = path.join(dir, path.normalize(ctx.params.type));
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
};

module.exports = {
    pathName: '/media/:type',
    get: func
};
