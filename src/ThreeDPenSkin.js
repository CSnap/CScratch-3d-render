const three = require('three');

const Skin = require('./Skin');
const EllipseCurve3 = require('./EllipseCurve3');

class ThreeDPenSkin extends Skin {
    constructor (id, renderer) {
        super(id);

        /**
         * @private
         * @type {RenderWebGL}
         */
        this._renderer = renderer;

        this._group = new three.Group();

        this.is3D = true;
    }

    dispose () {
        this._group = null;
    }

    get object () {
        return this._group;
    }

    clear () {
        this._group.children = [];
    }

    _getPenMaterial (colorArray) {
        let color = new three.Color();
        color.fromArray(colorArray);
        return new three.MeshLambertMaterial({color: color});
    }

    drawStamp (stampElement) {
        this._group.add(stampElement.clone());
    }

    _addObjectFromGeometry (geometry, position, rotation, color) {
        let object = new three.Mesh(geometry, this._getPenMaterial(color));
        object.position.fromArray(position);
        object.rotation.fromArray(rotation.map(three.Math.degToRad));

        this._group.add(object);
    }

    drawSphere (penAttributes, radius, position) {
        this._addObjectFromGeometry(
            new three.SphereBufferGeometry(radius / 2),
            position,
            [0, 0, 0],
            penAttributes.color4f
        );
    }

    drawCube (penAttributes, dimensions, position, rotation) {
        this._addObjectFromGeometry(
            new three.BoxBufferGeometry(dimensions[0], dimensions[1], dimensions[2]),
            position,
            rotation,
            penAttributes.color4f
        );
    }

    drawCylinder (penAttributes, dimensions, position, rotation) {
        this._addObjectFromGeometry(
            new three.CylinderBufferGeometry(dimensions[0], dimensions[1], dimensions[2]),
            position,
            rotation,
            penAttributes.color4f
        );
    }

    drawArc (penAttributes, dimensions, position, rotation) {
        const curve = new EllipseCurve3(
            0, 0,
            dimensions[0] / 2, dimensions[1],
            0, Math.PI,
            false,
            0
        );
        this._addObjectFromGeometry(
            new three.TubeBufferGeometry(curve, null, penAttributes.diameter / 2),
            position,
            rotation,
            penAttributes.color4f
        );
    }

    drawTorus (penAttributes, dimensions, position, rotation) {
        const curve = new EllipseCurve3(
            0, 0,
            dimensions[0] / 2, dimensions[1] / 2,
            0, Math.PI * 2,
            false,
            0
        );
        this._addObjectFromGeometry(
            new three.TubeBufferGeometry(curve, null, penAttributes.diameter / 2),
            position,
            rotation,
            penAttributes.color4f
        );
    }

    drawPoint (penAttributes, position) {
        this.drawSphere(penAttributes, penAttributes.diameter / 2, position);
    }

    drawLine (penAttributes, oldPosition, newPosition) {
        const start = new three.Vector3(oldPosition[0], oldPosition[1], oldPosition[2]);
        const end = new three.Vector3(newPosition[0], newPosition[1], newPosition[2]);
        const radius = penAttributes.diameter / 2;
        const height = start.distanceTo(end);
        let geometry = new three.CylinderBufferGeometry(radius, radius, height);
        geometry.translate(0, height / 2, 0);
        geometry.rotateX(Math.PI / 2);

        let object = new three.Mesh(geometry, this._getPenMaterial(penAttributes.color4f));
        object.position.copy(start);
        object.lookAt(end);

        this._group.add(object);
    }
}

module.exports = ThreeDPenSkin;
