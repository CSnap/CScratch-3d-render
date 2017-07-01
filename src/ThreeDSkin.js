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

        this._mesh = new three.Mesh();

        this.is3D = true;
    }

    get object () {
        return this._mesh;
    }

    setGeometry (newGeometry) {
        this._mesh.geometry = newGeometry;
    }

    setMaterial (newMaterial) {
        this._mesh.material = newMaterial;
    }

    setColor (newColor) {
        this._mesh.material.color.setHex(newColor);
    }

    getTexture () {
        return this._mesh.material;
    }
}

module.exports = ThreeDSkin;
