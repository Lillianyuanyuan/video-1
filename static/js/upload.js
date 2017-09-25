/* upload file*/
let log = console.log;

function $(str) {
    let a;
    if (typeof str === 'string') {
        a = document.querySelector(str);
    } else {
        a = str;
    }
    let b = function() {
        this.obj = a;
    };
    b.prototype = {
        ev(str, fn) {
            this.obj.addEventListener(str, fn);
        },
        s(obj) {
            for (let x in obj) {
                this.obj.style[x] = obj[x];
            }
        },
        html(h) {
            this.obj.innerHTML = h.innerHTML;
        },
        setA(attr, value) {
            this.obj.setAttribute(attr, value);
        }
    };
    return new b();
}

(() => {
    $('#audio').ev('click', () => {
        fetch('/media/audio')
            .then(data => data.json())
            .then(data => {
                let ul = document.createElement('ul');
                for (let x in data) {
                    let name = x;
                    let li = document.createElement('li');
                    li.setAttribute('data-id', data[x].id);
                    li.innerText = name;
                    ul.appendChild(li);
                }
                $('#audio_l').html(ul);
            });
    });
    $('#video').ev('click', () => {
        fetch('/media/video')
            .then(data => data.json())
            .then(data => {
                console.log(data);
                let ul = document.createElement('ul');
                for (let x in data) {
                    let name = x;
                    let li = document.createElement('li');
                    li.setAttribute('data-id', data[x].id);
                    li.innerText = name;
                    ul.appendChild(li);
                }
                $('#video_l').html(ul);
            });
    });
})();
