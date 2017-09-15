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
function _messageLine(id, message) {
    if (locked) {
        return setTimeout(function() {
            _messageLine(id, message);
        }, 1);
    }
    data.push({
        id,
        message
    });
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
    const wss = new websocket.Server({ server });
    wss.on('connection', (ws_client, request) => {
        let cookies = {};
        if (request.headers.cookie) {
            cookies = getCookies(request.headers.cookie);
        } else {
            console.log('err websocket connect no cookies');
            return;
        }
        console.log(`websokcet is connect from ${cookies.id}`);

        //建立连接时
        ws_client.on('open', () => {
            let info = {
                code: 2,
                id: cookies.id
            };
            wss.clients.forEach(client => {
                if (client.readyState === websocket.OPEN) {
                    client.send(JSON.stringify(info));
                }
            });
        });

        //传入数据时
        ws_client.on('message', message => {
            let info = {
                code: 3,
                id: cookies.id,
                message
            };
            wss.clients.forEach(client => {
                if (client.readyState === websocket.OPEN) {
                    client.send(JSON.stringify(info));
                }
            });
            _messageLine(info.id, message);
        });

        //断开连接时
        ws_client.on('close', () => {
            let info = {
                code: 4,
                id: cookies.id
            };
            console.log(`websokcet is closing from ${cookies.id}`);
            wss.clients.forEach(client => {
                if (
                    client !== ws_client &&
                    client.readyState === websocket.OPEN
                ) {
                    client.send(jSON.stringify(info));
                }
            });
        });
    });
    // _initMessageLine();
};
