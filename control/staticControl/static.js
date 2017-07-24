const path = require('path');
module.exports = async(soc, next) => {
    let p = soc.request.path;
    if (p.startsWith('/static')) {
        p = path.resolve(path.join('./', path.normalize(p)));
    }
    await next();
}