//const twgl = require('twgl.js');
const three = require('three');

const Skin = require('./Skin');

class ThreeDSkin extends Skin {
    /**
     * Create a new Bitmap Skin.
     * @extends Skin
     * @param {!int} id - The ID for this Skin.
     * @param {!RenderWebGL} renderer - The renderer which will use this skin.
     */
    constructor (id, renderer) {
        super(id);

        /** @type {!RenderWebGL} */
        this._renderer = renderer;

        this.object = null;

        this.is3D = true;
    }
}

module.exports = ThreeDSkin;
