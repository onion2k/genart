import Rune from "rune.js";
import Helpers from "../Helpers";

let ts = performance.now();
let delta = 0;
let counter = 100;
let d = 1;

export default function(primitives, r) {
  for (var x = r.stage.children.length - 1; x >= 0; x--) {
    r.stage.remove(r.stage.children[x]);
  }
  r.off("update");

  let sq = [];
  var base = r.group();

  let s = 8;
  let g = 8;
  let perRow = Math.ceil(primitives.width / (s * 2 + g));
  let n = perRow * perRow * 2;

  for (let x = 0; x < n; x++) {
    let xPos =
      s / 2 +
      (x % perRow) * (s * 2 + g) +
      (Math.floor(x / perRow) % 2 ? (s * 2 + g) / 2 : 0);
    let yPos = s / 2 + Math.floor(x / perRow) * ((s * 2 + g) / 2);

    r.circle(xPos, yPos, s).fill("white");
  }

  r.on("update", () => {
    counter++;
    delta = performance.now() - ts;
    ts = performance.now();

    // let f = Math.sin(counter / 100);

    // if (counter % 200 === 0) {
    //   d = d * -1;
    // }

    // sq.forEach((r, i) => {
    //   r.rotate(
    //     r.state.rotation + i / c * 0.75 * d,
    //     r.state.x + s / 2,
    //     r.state.y + s / 2
    //   );
    // });
  });
}
