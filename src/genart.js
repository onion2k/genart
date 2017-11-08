import Rune from 'rune.js';
import genartCss from './genart.css';
import Helpers from './Helpers';

const container = document.getElementById('art');
const primitives = {
    width: container.clientWidth,
    height: container.clientHeight,
    widthHalf: container.clientWidth / 2,
    heightHalf: container.clientHeight / 2,
    center: new Rune.Vector(container.clientWidth/2, container.clientHeight/2),
}

primitives.size = primitives.height * 0.75;
primitives.offset = { x: primitives.widthHalf - primitives.size / 2, y: primitives.heightHalf - primitives.size / 2 }

let r;
r = new Rune({
    container: "#art",
    width: primitives.width,
    height: primitives.height
});
r.on('update', () => {});
r.play();

let ts = performance.now();
let delta = 0;
let counter = 0;

class art {

    constructor(){

    }

    bluesquares() {

        for (var x=r.stage.children.length-1;x>=0;x--) {
            r.stage.remove(r.stage.children[x]);
        }
        r.off('update');
        
        let sq = [];
        
        let c = 16;
        let g = 16;
        let s = (primitives.size-(g*c)) / c;
        
        for (let i=0; i<(c*c); i++) {
        
            let t = i % c;
            let l = Math.floor(i / c);
            
            var group = r.group();
            let x = primitives.offset.x + t*(s+g);
            let y = primitives.offset.y + l*(s+g);
            
            group.vec = new Rune.Vector(x, y);
            group.move(x, y);
        
            let dist = group.vec.distance(primitives.center);
        
            r.rect(0, 0, s, s, group)
                .stroke(false)
                .fill('hsv', 192, 100, Rune.map(dist, 0, primitives.size/1.3, 50, 100));
        
            sq.push(group);
        
        }
        
        r.on('update', () => {
        
            counter++;
            delta = performance.now() - ts;
            ts = performance.now();
        
            sq.forEach((group, i) => {
        
                let dist = group.vec.distance(primitives.center);
        
                group.rotate(group.state.rotation+1+(Helpers.toPercent(dist,primitives.width)/5), group.state.x + (s/2), group.state.y + (s/2));
        
            });
        });

    }
    
    rainbowheart() {
        
        for (var x=r.stage.children.length-1;x>=0;x--) {
            r.stage.remove(r.stage.children[x]);
        }
        r.off('update');
        
        let sq = [];
        
        let c = 21;
        let g = 13;
        let s = (primitives.size-(g*c)) / c;

        var base = r.group();
        
        for (let i=0; i<(c*c); i++) {
        
            let t = i % c;
            let l = Math.floor(i / c);
            
            var group = r.group(0,0,base);
            let x = primitives.offset.x + t*(s+g);
            let y = primitives.offset.y + l*(s+g);
            
            group.vec = new Rune.Vector(x, y);
            group.move(x, y);
        
            let dist = group.vec.distance(primitives.center);
        
            r.rect(0, 0, s, s, group)
                .stroke('#ffffff')
                .fill('hsv', Rune.map(dist, 0, primitives.size/1.8, 256, 0), 100, 100);
        
            sq.push(group);
        
        }

        r.on('update', () => {
        
            counter++;
            delta = performance.now() - ts;
            ts = performance.now();

            let f = Math.sin(counter/100);
        
            sq.forEach((group, i) => {
                
                group.move((((i%c)-c/2) * f * 0.01), ((Math.floor(i/c)-c/2) * f * 0.01), true);
                group.rotate(group.state.rotation+1, group.state.x + (s/2), group.state.y + (s/2));

            });
        });

    }

    switchTo(a) {
        switch (a) {
            case "bluesquares": this.bluesquares(); break;
            case "rainbowheart": this.rainbowheart(); break;
        }
    }

}

let _art = new art();
_art.bluesquares();

document.addEventListener('DOMContentLoaded', function() {

    let l = document.querySelectorAll('li');

    l.forEach((l) => {
        l.addEventListener('click', (e) => {
            _art.switchTo(e.target.getAttribute('data-art'));
        })
    });

});
