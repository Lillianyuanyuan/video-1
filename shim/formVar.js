//  ab_cd_ef => abCdEf
function upperFirstWord(str) {
    let tmp = str.split('');
    tmp[0] = tmp[0] ? tmp[0].toUpperCase() : '-';
    return tmp.join('');
}
module.exports = str => {
    let str_tmp = str.split('_');
    if (str_tmp.length > 1) {
        str_tmp = str_tmp.map(
            (ele, index) => (index !== 0 ? upperFirstWord(ele) : ele)
        );
        return str_tmp.join('');
    } else {
        return str_tmp.join('');
    }
};
