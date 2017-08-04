let path = document.querySelector('path');

path_d_change(path, [0.08, 0.08]);

function path_d_change(path, arr) {
    let stop = false;
    let resolve_path_d = (d, direct_arr) => {
        let pattern = /Q([\d\.]+),([\d\.]+)/;
        let reg_arr = d.match(pattern);
        let [, x, y] = reg_arr;
        x = direct_arr[0] + parseFloat(x);
        y = direct_arr[1] + parseFloat(y);
        if (y > 80) stop = true;
        return d.replace(pattern, 'Q' + x + ',' + y);
    }
    let change_path_d = () => {
        let d = resolve_path_d(path.getAttribute('d'), arr);
        path.setAttribute('d', d);
        if (!stop) {
            requestAnimationFrame(change_path_d);
        }
    };
    change_path_d();
}