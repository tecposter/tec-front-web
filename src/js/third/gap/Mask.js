import {Mask as GapMask} from 'gap-front-mask';

export class Mask extends GapMask {
    hideMask() {
        // require https://daneden.github.io/animate.css/
        this.outerElem.hide();
    }
}
