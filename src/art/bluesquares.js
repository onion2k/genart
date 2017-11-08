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
