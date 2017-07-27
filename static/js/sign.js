(() => {
    let p = document.querySelector('.welcome');
    let input = document.querySelector('input');
    let button = document.getElementById('button');
    let count = 0;
    input.addEventListener('input', function() {
        p.innerHTML = 'welcome ' + '<br/>' + this.value;
        button.classList.add('buttonro');
        if (count === 0) {
            let script = document.createElement('script');
            script.src = '/static/js/logCanvas.js';
            document.body.appendChild(script);
            count += 1;
        }
    });
    button.addEventListener('click', () => {
        if (input.value.length > 0) {
            if (/\s/.test(input.value)) {
                alert('不能有空格');
            } else {
                const formdata = new FormData();
                formdata.append('username', input.value);
                let xhr = new XMLHttpRequest();
                xhr.open('post', '/signin.swnb', true)
                xhr.onload = (res) => {
                    console.log(res);
                }
                xhr.send(formdata);
                // fetch('/signin.swnb', {
                //     method: 'POST',
                //     body: formdata,
                // }).then((response) => {
                //     console.log(response);
                // })
            }
        } else {
            alert('请输入你的名字作为你的标识');
        }
    })

})()