const path = require('path');
const fs = require('fs');
const mime = require('mime');
const util = require('util');

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
    const p = getPath(filename);
    if (p) {
        const stat = await fsStat(p);
        ctx.set({
            'content-type': mime.getType(p),
            'content-length': stat.size
        });
        ctx.status = 200;
        ctx.body = fs.createReadStream(p);
    } else {
        ctx.redirect('/404');
    }
};

module.exports = {
    pathName: 'video/:name',
    get: func
};
