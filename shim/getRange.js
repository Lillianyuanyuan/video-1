module.exports = (str, size) => {
    if (str.indexOf(',') != -1) {
        return null;
    }
    let pos;
    if (str.indexOf('=') != -1) {
        pos = str.indexOf('=');
        str = str.substr(6, str.length);
    }
    let range = str.split('=');
    console.log(range);
    let start = parseFloat(range[0], 10);
    let end = parseInt(range[1], 10) || size - 1;
    console.log(start);
    console.log(end);
    if (isNaN(start)) {
        start = size - end;
        end = size - 1;
    } else if (isNaN(start)) {
        end = size - 1;
    }
    if (isNaN(start) || isNaN(end) || start > end || end > size) {
        return;
    }
    return {
        start: start,
        end: end
    };
};
