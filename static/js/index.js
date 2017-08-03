(() => {
    let button = document.querySelector('.icon');
    let li = document.querySelectorAll('.list li');
    let swi = true;
    let count = 1;
    li = Array.from(li);
    for (let i of li) {
        i.classList.add('transformleft');
    }
    button.addEventListener('click', () => {
        if (swi) {
            for (let i of li) {
                if (count) {
                    i.classList.add('transition');
                }
                i.classList.remove('transformleft');
            }
        } else {
            for (let i of li) {
                i.classList.add('transformleft');
            }
        }
        swi = !swi;
        count = null;
    })
})();
(() => {
    let x = 20;
    let add = true;
    let path = document.querySelector('path');

    function render() {
        let d = 'M0,0 Q0,30 0,20 Q' + x + ',100 20,70 T40,70 T60,70 T80,70 T100,20 Q100,30 150,0';
        path.setAttribute('d', d);
        if (x < 0) {
            add = true;
        }
        if (x > 15) {
            add = false;
        }
        if (add) {
            x += 0.2;
        } else {
            x -= 0.2;
        }
        requestAnimationFrame(render);
    };
    render();
})();
if (parseInt(window.innerWidth) > 360) {
    let sc = document.createElement('script');
    sc.src = '/static/canvas/index.js';
    document.body.appendChild(sc);
}