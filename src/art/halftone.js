import Rune from "rune.js";
import Helpers from "../Helpers";

let ts = performance.now();
let delta = 0;
let counter = 0;
let d = 0.99;
let base;

export default function(primitives, r) {
    for (var x = r.stage.children.length - 1; x >= 0; x--) {
        r.stage.remove(r.stage.children[x]);
    }
    r.off("update");

    base = r.group();

    let sq = [];

    let s = 15;
    let g = 15;
    let perRow = Math.ceil(primitives.width / (s * 2 + g));
    let n = perRow * perRow * 2;

    for (let x = 0; x < n; x++) {
        let xPos =
        s / 2 +
        (x % perRow) * (s * 2 + g) +
        (Math.floor(x / perRow) % 2 ? (s * 2 + g) / 2 : 0);
        let yPos = s / 2 + Math.floor(x / perRow) * ((s * 2 + g) / 2);

        var group = r.group(0,0,base);
        
        group.move(xPos, yPos);

        r.circle(0, 0, s, group).fill("white");

        sq.push(group);
        
    }

    r.on("update", () => {
        counter++;
        delta = performance.now() - ts;
        ts = performance.now();

        let f = Math.sin(counter / 100);

        if (counter % 50 === 0) {
            d = (d>1) ? 0.99 : 1.01;
        }

        sq.forEach((r, i) => {
            r.scale(d, 1);
        });

    });
}
