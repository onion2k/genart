import Rune from 'rune.js';
import Helpers from '../Helpers';

let ts = performance.now();
let delta = 0;
let counter = 100;
let d = 1;

export default function(primitives, r) {

    for (var x=r.stage.children.length-1;x>=0;x--) {
        r.stage.remove(r.stage.children[x]);
    }
    r.off('update');
    
    let sq = [];
    
    let c = 30;
    let g = 8;
    let size = 40;
    let s = (primitives.size-(g*c)) / c;

    var base = r.group();
    
    for (let i=c; i>0; i--) {
    
        var group = r.group(primitives.widthHalf,primitives.heightHalf,base);

        let x1 = (Math.sin(60 * (Math.PI/180)) * size*i);
        let y1 = (Math.cos(60 * (Math.PI/180)) * size*i);

        let x2 = (Math.sin(180 * (Math.PI/180)) * size*i);
        let y2 = (Math.cos(180 * (Math.PI/180)) * size*i);

        let x3 = (Math.sin(300 * (Math.PI/180)) * size*i);
        let y3 = (Math.cos(300 * (Math.PI/180)) * size*i);
        
        r.triangle(x1,y1, x2,y2, x3,y3, group)
            .fill('hsv', 0, 0, (i%2===0)?0:100);
    
        sq.push(group);
    
    }

    r.on('update', () => {
    
        counter++;
        delta = performance.now() - ts;
        ts = performance.now();

        let f = Math.sin(counter/100);

        if (counter%200===0) { d = d * -1; }
    
        sq.forEach((r, i) => {
            
            r.rotate(r.state.rotation + (i / c) * 0.75 * d, r.state.x + (s/2), r.state.y + (s/2));

        });
    });

}