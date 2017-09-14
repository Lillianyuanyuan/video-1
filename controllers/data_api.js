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
    const dir = path.join(__dirname, '..', 'static/mediaData');
    const p = path.join(dir, ctx.params.type);
    let r = readir(p);
    r = r
        .then(files => {
            let data = {};
            let id = 1;
            for (let name of files) {
                name = name.split('_');
                const [user, filename] = [
                    name[0],
                    name.shift() ? name.join('') : void 0
                ];
                data[filename] = {
                    id,
                    user,
                    filename
                };
                id++;
            }
            return data;
        })
        .catch(e => {
            console.log(e);
        });
    const data = await r;
    ctx.body = JSON.stringify(data);
};

module.exports = {
    pathName: '/media/:type',
    get: func
};
