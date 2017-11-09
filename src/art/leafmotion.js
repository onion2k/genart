import Rune from 'rune.js';
import Svg from 'rune.svg.js';
import Helpers from '../Helpers';

let ts = performance.now();
let delta = 0;
let counter = 0;

const leaf = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 228 186.25" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M104 51c41,-3 73,5 104,34 -16,-42 -44,-61 -82,-82 4,6 4,9 3,13 -15,-7 -38,-14 -58,-16 5,7 9,9 7,15 -27,0 -54,0 -78,-14 11,50 33,82 59,101 -2,5 -6,6 -13,9 25,11 42,13 59,12 -1,4 -3,7 -9,11 28,1 79,-7 107,-24 10,12 16,24 24,39 1,-9 2,-15 1,-24 -29,-44 -72,-77 -124,-74z"/></g></svg>`

const svgLeaf = new Svg(leaf);
const svgLeafGroup = svgLeaf.toGroup().fill("#FF000");

export default function(primitives, r) {

    for (var x=r.stage.children.length-1;x>=0;x--) {
        r.stage.remove(r.stage.children[x]);
    }
    r.off('update');
    
    let sq = [];
    
    let c = 11;
    let g = 0;
    let s = 105;

    for (let i=0; i<(c*c); i++) {
    
        let t = (i % c);
        let l = (Math.floor(i / c));
        
        var group = r.group();
        let x = primitives.offset.x + t*(s+g);
        let y = primitives.offset.y + l*(s+g);
        
        group.vec = new Rune.Vector(x, y);
        group.move(x, y);
    
        let dist = group.vec.distance(primitives.center);
        let leaf = svgLeafGroup.copy().scale(0.25).fill('hsv', 0+(Math.random()*64), 100, 100);
        leaf.move(25, 35);
        
        group.add(leaf);
        
        sq.push(group);
    
    }
    
    r.on('update', () => {
    
        counter++;
        delta = performance.now() - ts;
        ts = performance.now();
    
        sq.forEach((group, i) => {

            group.rotate(group.state.rotation+1-(2*(i%2)),group.state.x,group.state.y);
            
        });
    });

}
