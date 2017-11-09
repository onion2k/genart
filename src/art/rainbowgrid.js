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
    let g = 8;
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