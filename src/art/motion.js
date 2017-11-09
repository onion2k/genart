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
    
    let c = 12;
    let g = 20;
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
    
        r.circle(0, 0, s, group)
            .stroke('#ffffff')
            .fill('hsv', 0, 100, 100);
    
        sq.push(group);
    
    }
    
    r.on('update', () => {
    
        counter++;
        delta = performance.now() - ts;
        ts = performance.now();
    
        sq.forEach((group, i) => {

            group.move(1, 1, true);

            if (group.state.x > primitives.width+s) { group.move(-1*s, group.state.y); }
            if (group.state.y > primitives.height+s) { group.move(group.state.x, -1*s); }
            
        });
    });

}
