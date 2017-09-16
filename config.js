/*
 *   swnb github: 
 */
const path = require('path');
module.exports = {
    ETag: undefined, //因为选择了last-modified，所以就放弃了etag

    port: 8000, //端口号

    protect_static_file: ['js/save.js', 'js/test.js'], //需要保护的静态文件，不会被直接访问，会有权限认证

    root: 'swnb', //root 用户,有权访问私有文件，改成你的用户名就好了

    cookies_expires: 60 * 60000, // cookies过期时间为一个小时,1000是一秒,

    uploadDir: path.join(__dirname, '/static/mediaData/video/'),

    clean_media_after_exit: false //如果要在进程退出的时候清理一些聊天记录或者文件夹里面的一些命名不规范的媒体文件，就将这个改成true
};
