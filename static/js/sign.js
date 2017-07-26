(() => {
    let p = document.querySelector('.welcome');
    let input = document.getElementsByName('username');
    let button = document.getElementById('button');
    let count = 0;
    input[0].addEventListener('input', function() {
        p.innerHTML = 'welcome ' + '<br/>' + this.value;
        button.classList.add('buttonro');
        if (count === 0) {
            let script = document.createElement('script');
            script.src = '/static/js/logCanvas.js';
            console.log(document.domain);
            document.body.appendChild(script);
            count += 1;
        }
    });
})()