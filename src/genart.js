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

let ts = performance.now();
let delta = 0;
let counter = 0;
let sq;

function bluesquares() {

    if (r!==undefined) { delete r.el; }
    
    r = new Rune({
        container: "#art",
        width: primitives.width,
        height: primitives.height
    });    

    sq = [];
    
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
     
    r.play();

}

function redsquares() {

    console.log('red');

    console.log(sq);

    if (r !== undefined) {
        r.pause();
        sq.forEach((group,i)=>{ group.removeParent();});
        // r = new Rune({
        //     container: "#art",
        //     width: primitives.width,
        //     height: primitives.height
        // });
    }

    return;

    r = new Rune({
        container: "#art",
        width: primitives.width,
        height: primitives.height
    });    

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
            .fill('hsv', 64, 100, Rune.map(dist, 0, primitives.size/1.3, 50, 100));
    
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

    r.play();

}

bluesquares();

let arts = {
    'bluesquares': ()=>{ bluesquares(); },
    'redsquares':  ()=>{ redsquares(); }
}

document.addEventListener('DOMContentLoaded', function() {

    let l = document.querySelectorAll('li');

    l.forEach((l) => {
        l.addEventListener('click', (e) => {
            console.log(e.target.getAttribute('data-art'));
            arts[e.target.getAttribute('data-art')]();
        })
    });

});
