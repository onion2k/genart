import Rune from 'rune.js';
import genartCss from './genart.css';

var r = new Rune({
    container: "body",
    width: 800,
    height: 800
});

let sq = [];

let s = 30;
let g = 16;

for (let x=0; x<256; x++) {

    let t = x % 16;
    let l = Math.floor(x / 16);
    
    var group = r.group();
    group.move(20+t*(s+g), 20+l*(s+g));
    group.rotate(2*(x%7), t*(s+g) + s/2, l*(s+g) + s/2);
    var newrect = r.rect(0, 0, s, s, group).fill(x, x, 255);
    sq.push(group);
}

r.on('update', () => {
    sq.forEach((group) => {
        group.rotate(group.state.rotation+1, group.state.x + 10, group.state.y + 10);
    })
});

r.play();    
