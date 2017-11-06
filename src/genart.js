import Rune from 'rune.js';
import genartCss from './genart.css';
import Helpers from './Helpers';

const primitives = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    widthHalf: document.body.clientWidth / 2,
    heightHalf: document.body.clientHeight / 2,
    center: new Rune.Vector(document.body.clientWidth/2, document.body.clientHeight/2),
}

primitives.size = primitives.height * 0.75;
primitives.offset = { x: primitives.widthHalf - primitives.size / 2, y: primitives.heightHalf - primitives.size / 2 }

var r = new Rune({
    container: "body",
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
        .fill('hsv', 192, 100, Rune.map(dist, 0, primitives.size/1.3, 50, 100));

    sq.push(group);

}

let ts = performance.now();
let delta = 0;
let counter = 0;

r.on('update', () => {

    counter++;
    delta = performance.now() - ts;
    ts = performance.now();

    sq.forEach((group, i) => {

        let dist = group.vec.distance(primitives.center);

        group.rotate(group.state.rotation+1+(Helpers.toPercent(dist,primitives.width)/5), group.state.x + (s/2), group.state.y + (s/2));

        group.move(Math.sin((counter+(i%c))/10),Math.cos((counter+(i%c))/10),true);

    });
});

r.play();    
