/*
 * 上传路由
 */
const path = require('path');
const fs = require('fs');
const { uploadDir } = require('../../config');
const formVar = require('../../shim/formVar');

const func = async ctx => {
    let userName = '';
    ctx.cookies.get('username')
        ? (userName = ctx.cookies.get('username'))
        : ctx.redirect('/sign.swnb');
    ctx.status = 200;
    ctx.type = 'text/html;charset=utf-8';
    const p = path.join(__dirname, '..', '..', 'views/upload.html');
    ctx.body = fs.createReadStream(p, 'utf-8');
};

const gethashfilename = pathname => {
    path.resolve(pathname);
};

const func_post = async ctx => {
    //假设数据传输过来是这样的
    /* => {uploads: [
            {
              "size": 748831,
              "path": "/tmp/f7777b4269bf6e64518f96248537c0ab.png",
              "name": "some-image.png",
              "type": "image/png",
              "mtime": "2014-06-17T11:08:52.816Z"
            },
            {
              "size": 379749,
              "path": "/tmp/83b8cf0524529482d2f8b5d0852f49bf.jpeg",
              "name": "nodejs_rulz.jpeg",
              "type": "image/jpeg",
              "mtime": "2014-06-17T11:08:52.830Z"
            }
          ]}
    */
    let files = ctx.request.body.files;
    console.log(files);
    Object.values(files).forEach(file => {
        if (Array.isArray(file)) {
            file = file[0];
        }
        console.log(file.path, typeof file.path);
        const hashname = path.basename(file.path);
        let filename = file.name;
        username = ctx.cookies.get('username');
        //整理username
        [username, filename] = [
            /_/.test(username) ? formVar(username) : username,
            formVar(filename)
        ];
        let totalFilename = username + '_' + filename;
        fs.rename(
            path.resolve(uploadDir, hashname),
            path.resolve(uploadDir, totalFilename),
            err => {
                err
                    ? console.log(err)
                    : console.log(
                          `upload file ${totalFilename} successed ,you can find it in ${path.resolve(
                              uploadDir,
                              totalFilename
                          )}`
                      );
            }
        );
    });
    ctx.status = 204;
};

module.exports = {
    pathName: '/upload',
    get: func,
    post: func_post
};
