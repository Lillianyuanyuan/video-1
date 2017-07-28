/*
 *   swnb github: 
 */
module.exports = {
    ETag: undefined, //因为选择了last-modified，所以就放弃了etag
    port: 8080, //端口号
    protect_static_file: ['js/save.js', 'js/test.js'], //需要保护的静态文件，不会被直接引用，会有权限认证
    root: 'swnb', //root 用户
}