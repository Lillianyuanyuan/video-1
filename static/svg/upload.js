(() => {

    //锁住动画
    let lock = false;

    //中央信道
    let message = [];

    //开始终结状态
    function showUp(up) {
        if (up) {
            $('#close').s({ width: '100%' });
            $('aside section').s({ width: '100%' });
        } else {
            $('#close').s({ width: '0' });
            $('aside section').s({ width: '0' });
        }
    }

    //svg出现
    function fadeIn() {
        let x = -50,
            y = -50;
        let raf;

        function update() {
            if (!(x > 100)) {
                x += 1;
                y += 1;
            } else {
                y += 2;
            }
            $('aside svg path').setA('d', 'M0,0 L0,100 Q' + x + ',' + y + ' 100,0');
            if (!(y > 250)) {
                raf = requestAnimationFrame(update);
            } else {
                cancelAnimationFrame(raf);
                //解锁
                lock = false;
                for (let x of message) {
                    x.emit();
                }
            }
        }
        update();
        setTimeout(function() {
            showUp(true);
        }, 1500);
    }

    //svgo消失
    function fadeOut() {
        message = [];
        let x = 100,
            y = 250;
        let raf;

        function update() {
            if (!(x > -100)) {
                x -= 1;
                y -= 1;
            } else {
                x -= 2;
                y -= 2;
            }
            $('aside svg path').setA('d', 'M0,0 L0,100 Q' + x + ',' + y + ' 100,0');
            if (!(y < -20)) {
                raf = requestAnimationFrame(update);
            } else {
                cancelAnimationFrame(raf);
                $('#open').s({ transform: 'rotate(0) scale(1)' });
                $('aside').s({ width: '0' });
            }
        }
        update();
    }

    //打开
    $('#open').ev('click', function() {
        if (!lock) {
            lock = true;
            $(this).s({ transform: 'rotate(360deg) scale(0)' });
            setTimeout(function() {
                $('aside').s({ width: '25vw' });
                fadeIn();
            }, 1000);
        }
    });

    //关闭
    $('#close').ev('click', function() {
        showUp(false);
        if (!lock) {
            fadeOut();
        } else {
            //放入待定事件,等待处理
            message.push({
                emit: function() {
                    fadeOut();
                }
            });
        };

    })
})()