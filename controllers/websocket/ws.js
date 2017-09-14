/*
    一个webscoket模块
*/
const websocket = require('ws');
const getCookies = require('../../api.js/getCookies');

const fs = require('fs');
const util = require('util');
const path = require('path');

//暂时不考虑这个函数，以后完善，留个坑，
async function _initMessageLine() {
    const readFile = util.promisify(fs.readFile);
    let data = await readFile(path.join(__dirname, 'message'));
    data = JSON.parse(data);
    return data;
}

let data = [];
//如果被锁是真的，过段时间再尝试，过程不会有逻辑错误导致信息消失
let locked = false;
function _messageLine(message, cookies) {
    if (locked) {
        return setTimeout(function() {
            _messageLine(message, cookies);
        }, 1);
    }
    let info = {};
    info[cookies.id] = message;
    data.push(info);
    if (data.length >= 50) {
        locked = true;
        fs.appendFile(
            // 写入一个文件里面，可以转化回来
            path.join(__dirname, '..', '..', 'chatdata/message'),
            JSON.stringify({ Date: new Date(), data }),
            err => {
                if (err) console.log(err, 'from ws.js 35');
                data = [];
                locked = false;
            }
        );
    }
}

//退出代码还没有确定，待写
function _afterExit() {
    process.on('exit', () => {});
}

module.exports = function(server) {
    const wss = new websocket.Server(server);
    wss.on('connection', (ws_clinet, request) => {
        ws_clinet.on('message', data => {
            let cookies = getCookies(request.headers.cookie);
            _messageLine(message, cookies);
        });
    });
    // _initMessageLine();
};
