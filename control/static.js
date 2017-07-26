/*
 *    静态文件路由
 */
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const { ETag } = require('../config');
const { inspect } = require('util');
const zlib = require('zlib');
//test

function encoding(ctx, code) {
    if (/\bgzip\b/.test(code)) {
        console.log('gzip :static.js 13');
        return 'gzip';
    } else if (/\bdeflate\b/.test(code)) {
        console.log('deflate :static.js 15');
        return 'deflate'
    } else {
        return ''
    }
}

const func = async(ctx, next) => {
    let p = ctx.request.path;
    //安全处理路径
    p = path.normalize(p);
    p = path.join(__dirname, '../', p);
    //回调用promise来写
    const promise = new Promise((resolve) => {
        let flag = {
            lastModified: "",
            ifModSin: 'if-modified-since',
        }
        fs.stat(p, (err, stats) => {
            if (!err && stats.isFile()) {
                console.log(p, ': static.js 18');
                //获取更改时间
                flag.lastModified = stats.mtime.toUTCString();
                resolve(flag);
            } else {
                if (err) console.log(err);
                resolve(false);
            }
        });
    });
    const flag = await promise;
    if (flag) {
        if (ctx.headers[flag.ifModSin] && ctx.headers[flag.ifModSin] === flag.lastModified) {
            ctx.status = 304;
            console.log(ctx.headers[flag.ifModSin]);
        } else {
            //设置压缩
            const contentType = mime.lookup(p);
            const accEncode = ctx.headers['accept-encoding'];
            const contentEncoding = encoding(accEncode);
            ctx.response.status = 200;
            if (contentEncoding === 'gzip') {
                ctx.set({
                    'Last-Modified': flag.lastModified,
                    'content-type': contentType,
                    'content-encoding': contentEncoding,
                });
                ctx.response.body = fs.createReadStream(p, 'utf-8').pipe(zlib.createGzip());
            } else if (contentEncoding === 'deflate') {
                ctx.set({
                    'Last-Modified': flag.lastModified,
                    'content-type': contentType,
                    'content-encoding': contentEncoding,
                });
                ctx.response.body = fs.createReadStream(p, 'utf-8').pipe(zlib.createDeflate());
            }
        }
    } else {
        ctx.redirect('/404');
    }
}


module.exports = {
    pathName: '/static/:type/:name',
    method: 'get',
    func,
}