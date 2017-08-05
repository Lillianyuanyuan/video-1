(() => {
    let path = document.querySelector('aside svg path')
    let button = document.querySelector('#svgswitch');
    let swi = true;
    button.addEventListener('click', function() {
        if (swi) this.classList.add('fade');
        setTimeout(() => {
            this.style.display = 'none';
            let div = document.querySelector('aside');
            div.style.width = '25vw';
            let x = -50,
                y = -50;

            function update() {
                if (!(x > 100)) {
                    x += 1
                }
                y += 1;
                path.setAttribute('d', 'M0,0 L0,100 Q' + x + ',' + y + ' 100,0');
                if (!(y > 500)) {
                    requestAnimationFrame(update);
                }
            }
            update();
        }, 1000);
        swi = !swi;
    });

})()