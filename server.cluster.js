const cluster = require('cluster');
const { spawn } = require('child_process');
if (cluster.isMaster) {
    cluster.fork();
    cluster.on('exit', (worker, code, signal) => {
        console.log(`exit code => ${code}`);
        cluster.fork();
        console.log(`restart it `);
    });
} else if (cluster.isWorker) {
    let server = spawn('node', ['server.js']);

    // 捕获标准输出并将其打印到控制台
    server.stdout.on('data', data => {
        console.log(data.toString());
    });

    // 捕获标准错误输出并将其打印到控制台
    server.stderr.on('data', data => {
        console.log('错误\n' + data.toString());
    });
}
