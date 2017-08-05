(() => {
    let p = document.querySelector('.welcome');
    let input = document.querySelector('input');
    let button = document.querySelector('.button');
    let count = 0;
    input.addEventListener('input', function() {
        p.innerHTML = 'welcome ' + '<br/>' + this.value;
    });
    button.addEventListener('click', () => {
        if (input.value.length > 0) {
            if (/\s/.test(input.value)) {
                alert('不能有空格');
            } else {
                const formdata = new FormData();
                formdata.append('username', input.value);
                fetch('/sign.swnb', {
                    method: 'post',
                    body: formdata,
                    credentials: 'same-origin',
                }).then(() => {
                    window.location.reload();
                })
            }
        } else {
            alert('请输入你的名字作为你的标识');
        }
    })

})();