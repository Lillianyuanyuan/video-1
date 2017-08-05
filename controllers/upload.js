/*
 * 登录路由
 */
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const func = async(ctx) => {
    let userName = '';
    ctx.cookies.get('username') ? (userName = ctx.cookies.get('username')) : (ctx.redirect('/sign.swnb'));
    ctx.status = 200;
    ctx.type = 'text/html;charset=utf-8';
    const p = path.join(__dirname, '..', 'views/upload.html');
    ctx.body = fs.createReadStream(p, 'utf-8');
};

const func_post = async(ctx) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepExtensions = true; //保留后缀格式    
    form.uploadDir = require('../config').uploadDir;
    let files = [],
        fields = [];
    form.on('field', (field, value) => {
        console.log(field, value);
        fields.push({ field, value });
    });
    form.on('file', (field, file) => {
        console.log(field, file);
        files.push({ field, file });
    });
    form.on('end', () => {
        console.log('load file finish');
        console.log(fields, files);
    });
    form.parse(ctx.req);
    ctx.status = 204;
}

module.exports = {
    pathName: '/upload',
    get: func,
    post: func_post,
}