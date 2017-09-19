/*
    video 模块
*/
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const util = require('util');

const getRange = require('../../shim/getRange');

const fsStat = util.promisify(fs.stat);
const fsExists = util.promisify(fs.exists);
//no finish
const getPath = async name => {
    const p = path.resolve(
        __dirname,
        '..',
        '..',
        'static/mediaData/video',
        name
    );
    let z = await fsExists(p);
    if (z) {
        return p;
    } else {
        console.log(`err ${p} not exist`);
        return false;
    }
};

const func = async ctx => {
    console.log(ctx.request.path);
    const filename = ctx.params.name;
    const p = path.resolve(
        __dirname,
        '..',
        '..',
        'static/mediaData/video',
        filename
    );
    let z = await fsExists(p);
    if (!z) {
        console.log(`err ${p}`);
        ctx.status = 404;
        return;
    }
    const stat = await fsStat(p);
    if (ctx.headers['range']) {
        console.log(ctx.headers['range']);
        let range = getRange(ctx.headers['range'], stat.size);
        console.log(range);
        if (range) {
            ctx.set(
                'content-Range',
                `bytes ${range.start}-${range.end}/${stat.size}`
            );
            ctx.status = 206;
            ctx.body = fs.createReadStream(p, {
                start: range.start,
                end: range.end
            });
        } else {
            ctx.status = 416;
        }
    } else {
        ctx.set({
            'content-type': mime.getType(p),
            'content-length': stat.size
        });
        ctx.status = 200;
        ctx.body = fs.createReadStream(p);
    }
};

module.exports = {
    pathName: '/video/:name',
    get: func
};
