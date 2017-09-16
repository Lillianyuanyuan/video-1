/*
 *    静态文件路由
 */
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const { ETag } = require('../../config');
const zlib = require('zlib');

//确认压缩方式
function encoding(code) {
    if (/\bgzip\b/.test(code)) {
        console.log('gzip :static.js 14');
        return 'gzip';
    } else if (/\bdeflate\b/.test(code)) {
        console.log('deflate :static.js 17');
        return 'deflate';
    } else {
        return '';
    }
}

const func = async ctx => {
    let p = ctx.request.path;
    //安全处理路径
    p = path.normalize(p);
    p = path.join(__dirname, '..', '..', p);
    //回调用promise来写
    const promise = new Promise(resolve => {
        fs.stat(p, (err, stats) => {
            if (!err && stats.isFile()) {
                console.log(p, ': static.js 32');
                //获取更改时间,这里是UTC时间
                const lastModified = stats.mtime.toUTCString();
                resolve(lastModified);
            } else {
                if (err) console.log(err);
                else console.log('not file');
                resolve(false);
            }
        });
    });

    const flag = await promise;

    if (flag) {
        if (
            ctx.headers['if-modified-since'] &&
            ctx.headers['if-modified-since'] === flag
        ) {
            ctx.status = 304;
            console.log(
                'if-modified-since',
                ctx.headers['if-modified-since'],
                'static.js 47'
            );
        } else {
            //设置压缩
            const contentType = mime.lookup(p);
            const accEncode = ctx.headers['accept-encoding'];
            const contentEncoding = encoding(accEncode);
            ctx.response.status = 200;
            ctx.set({
                'content-type': contentType,
                'last-modified': flag
            });
            switch (contentEncoding) {
                case 'gzip':
                    ctx.set('content-encoding', contentEncoding);
                    ctx.response.body = fs
                        .createReadStream(p, 'utf-8')
                        .pipe(zlib.createGzip());
                    break;
                case 'deflate':
                    ctx.set('content-encoding', contentEncoding);
                    ctx.response.body = fs
                        .createReadStream(p, 'utf-8')
                        .pipe(zlib.createDeflate());
                    break;
                default:
                    ctx.response.body = fs.createReadStream(p, 'utf-8');
                    break;
            }
        }
    } else {
        ctx.status = 404;
    }
};

module.exports = {
    pathName: '/static/:type/:name',
    get: func
};
