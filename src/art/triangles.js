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
    
    let c = 30;
    let g = 8;
    let size = 20;
    let s = (primitives.size-(g*c)) / c;

    var base = r.group();
    
    for (let i=c; i>0; i--) {
    
        let x1 = primitives.widthHalf + (Math.sin(60 * (Math.PI/180)) * size*i);
        let y1 = primitives.heightHalf + (Math.cos(60 * (Math.PI/180)) * size*i);

        let x2 = primitives.widthHalf + (Math.sin(180 * (Math.PI/180)) * size*i);
        let y2 = primitives.heightHalf + (Math.cos(180 * (Math.PI/180)) * size*i);

        let x3 = primitives.widthHalf + (Math.sin(300 * (Math.PI/180)) * size*i);
        let y3 = primitives.heightHalf + (Math.cos(300 * (Math.PI/180)) * size*i);
        
        r.triangle(x1,y1, x2,y2, x3,y3)
            .fill('hsv', 0, 0, (i%2===0)?0:100);
    
        // sq.push(group);
    
    }

    r.on('update', () => {
    
        // counter++;
        // delta = performance.now() - ts;
        // ts = performance.now();

        // let f = Math.sin(counter/100);
    
        // sq.forEach((group, i) => {
            
        //     group.move((((i%c)-c/2) * f * 0.01), ((Math.floor(i/c)-c/2) * f * 0.01), true);
        //     group.rotate(group.state.rotation+1, group.state.x + (s/2), group.state.y + (s/2));

        // });
    });

}