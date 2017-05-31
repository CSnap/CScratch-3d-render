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

        this._mesh = null;
        this._material = null;
        this._geometry = null;
    }
    
    setGeometry(newGeometry) {
        this._geometry = newGeometry;
    }
    
    setMaterial(newMaterial) {
        this._material = newMaterial;
    }
    
    getTexture() {
        return this._material;
    }
}

module.exports = ThreeDSkin;
