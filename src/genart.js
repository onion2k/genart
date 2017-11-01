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

let c = 24;
let g = -20;
let s = (primitives.size-(g*c)) / c;

for (let i=0; i<(c*c); i++) {

    let t = i % c;
    let l = Math.floor(i / c);
    
    var group = r.group();
    let x = primitives.offset.x + t*(s+g);
    let y = primitives.offset.y + l*(s+g);
    
    group.vec = new Rune.Vector(x, y);
    group.move(x, y);
    // group.rotate(3*(i%7), x+s/2, y+s/2);

    let dist = group.vec.distance(primitives.center);

    r.rect(0, 0, s, s, group).stroke('hsv', 0, 0, 100).fill('hsv', Rune.map(i, 0, c*c, 0, 256), 100, 100);

    sq.push(group);

}

r.on('update', () => {
    sq.forEach((group) => {
        let dist = group.vec.distance(primitives.center);
        group.rotate(group.state.rotation+1+(Helpers.toPercent(dist,primitives.width)/25), group.state.x + (s/2), group.state.y + (s/2));
    })
});

r.play();    

