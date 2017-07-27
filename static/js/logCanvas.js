   (() => {
       let ca = document.querySelector('canvas');
       let html = document.getElementsByTagName('html');
       let range = 60;
       if (parseInt(window.innerWidth) < 750) {
           range = 20;
       }
       ca.style.position = 'absolute';
       ca.style.top = '-1rem';
       ca.style.left = '20px';
       ca.style.zIndex = '-1';
       let w = ca.width = document.body.clientWidth - 40;
       let h = ca.height = window.innerHeight - 120;
       let poinlist = [];
       let con = ca.getContext('2d');
       window.onresize = function() {
           if (parseInt(window.innerWidth) < 750) {
               range = 20;
               poinlist = [];
               for (let i = 0; i < range; i++) {
                   let tmp = new poin();
                   tmp.init();
                   poinlist.push(tmp);
               }
           }
           w = ca.width = document.body.clientWidth - 40;
           h = ca.height = window.innerHeight;
       };

       function random(min, max, swift) {
           let e = Math.random() * (max - min) + min;
           if (swift === 1) {
               return Math.floor(e);
           } else return e;
       }

       function poin() {}
       poin.prototype = {
           init: function() {
               this.x = random(20, w - 10);
               this.y = random(20, h - 10);
               this.vx = random(-1, 1);
               this.vy = random(-1, 1);
               this.r = random(2, 7);
               this.opacity = random(0.5, 1);
               this.color = 'rgba(' + random(150, 200, 1) + ',' + random(0, 120, 1) + ',' + random(75, 200, 1) + ',' + this.opacity + ')';
           },
           draw: function() {
               con.beginPath();
               con.fillStyle = this.color;
               con.arc(this.x, this.y, this.r, 0, Math.PI * 2);
               con.fill();
               this.update();
           },
           update: function() {
               if (this.x > 5 && this.x < w - 20 && this.y > 5 && this.y < h - 20) {
                   this.y += this.vy;
                   this.x += this.vx;
               } else {
                   this.init();
               }
           }
       };
       //    let observer=new poin();
       //    observer.init();
       //    setInterval(function(){observer.draw()},1000/60);
       //    setInterval(()=>{console.log(observer.vx,observer.vy)},1000);
       for (let i = 0; i < range; i++) {
           let tmp = new poin();
           tmp.init();
           poinlist.push(tmp);
       }

       function move() {
           con.clearRect(0, 0, w, h);

           for (let i of poinlist) {
               i.draw();
           }
           console.log(poinlist.length);
           requestAnimationFrame(move);
       }
       move();
   })();