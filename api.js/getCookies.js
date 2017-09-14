module.exports = cookie => {
    if (/;/.test(cookie)) {
        let cookies = {};
        let arr = cookie.split(';');
        arr = arr.map(ele => ele.split('='));
        for (z of arr) {
            cookies[z[0]] = z[1];
        }
        return cookies;
    } else {
        let split = cookie.split('=');
        let cookies = {};
        cookies[split[0]] = split[1];
        return cookies;
    }
};
