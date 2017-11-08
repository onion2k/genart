import Rune from 'rune.js';
import Helpers from '../Helpers';

let ts = performance.now();
let delta = 0;
let counter = 0;

export default function(primitives, r) {

    for (var x=r.stage.children.length-1;x>=0;x--) {
        r.stage.remove(r.stage.children[x]);
    }
    r.off('update');
    
    let sq = [];
    
    let c = 20;
    let s = 4;
    let g = (primitives.size-(c*s)) / c;
    
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
            .fill('hsv', 0, 0, 100);
    
        sq.push(group);
    
    }
    
    r.on('update', () => {
    
        counter++;
        delta = performance.now() - ts;
        ts = performance.now();
        let t = c*c;
        let f = Math.sin(counter/100);
        
        sq.forEach((group, i) => {

            group.children[0].fill('hsv',  Rune.map(i%t, 0, t, 0, 256), 100*f, 100);
    
        });
    });

}
