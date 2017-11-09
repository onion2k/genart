import Rune from 'rune.js';
import genartCss from './genart.css';
import Helpers from './Helpers';

import bluesquares from './art/bluesquares';
import rainbowgrid from './art/rainbowgrid';
import lightgrid from './art/lightgrid';
import leafmotion from './art/leafmotion';

const container = document.getElementById('art');
const primitives = {
    width: container.clientWidth,
    height: container.clientHeight,
    size: container.clientHeight,
    widthHalf: container.clientWidth / 2,
    heightHalf: container.clientHeight / 2,
    center: new Rune.Vector(container.clientWidth/2, container.clientHeight/2),
}
primitives.offset = { x: primitives.widthHalf - primitives.size / 2, y: primitives.heightHalf - primitives.size / 2 }

let r = new Rune({
    container: "#art",
    width: primitives.width,
    height: primitives.height
});
r.on('update', () => {});
r.play();

class art {

    switchTo(a) {
        switch (a) {
            case "bluesquares": bluesquares(primitives, r); break;
            case "lightgrid": lightgrid(primitives, r); break;
            case "rainbowgrid": rainbowgrid(primitives, r); break;
            case "leafmotion": leafmotion(primitives, r); break;
        }
    }

}

let defaultLink = window.location.hash.substring(1) || 'bluesquares';

let _art = new art()
    _art.switchTo(defaultLink);

document.addEventListener('DOMContentLoaded', function() {

    let l = document.querySelectorAll('li');

    l.forEach((l) => {
        l.addEventListener('click', (e) => {
            _art.switchTo(e.target.getAttribute('data-art'));
            window.location.hash = e.target.getAttribute('data-art');
        })
    });

});
