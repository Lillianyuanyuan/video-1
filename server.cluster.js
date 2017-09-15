const cluster = require('cluster');
if (cluster.isMaster) {
    cluster.fork();
    cluster.on('exit', (worker, code, signal) => {
        cosole.log(`exit code => ${code}`);
        cluster.fork();
        console.log(`restart it `);
    });
} else if (cluster.isWorker) {
}
