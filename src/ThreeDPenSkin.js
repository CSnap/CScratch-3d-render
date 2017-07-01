const three = require('three');

const Skin = require('./Skin');

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

    get object () {
        return this._group;
    }

    clear () {
        this._group.children = [];
    }

    drawStamp (stampElement) {
        this._group.add(stampElement.clone());
    }

    drawPoint (penAttributes, position) {
        let geometry = new three.Geometry();
        geometry.vertices.push(new three.Vector3(position[0], position[1], position[2]));

        let color = new three.Color();
        color.fromArray(penAttributes.color4f);
        const material = new three.PointsMaterial({color: color, size: penAttributes.diameter});

        this._group.add(new three.Points(geometry, material));
    }

    drawLine (penAttributes, oldPosition, newPosition) {
        /* let geometry = new three.Geometry();
        geometry.vertices.push(new three.Vector3(oldPosition[0], oldPosition[1], oldPosition[2]));
        geometry.vertices.push(new three.Vector3(newPosition[0], newPosition[1], newPosition[2]));

        let color = new three.Color();
        color.fromArray(penAttributes.color4f);
        const material = new three.LineBasicMaterial({color: color, linewidth: penAttributes.diameter});

        this._group.add(new three.Line(geometry, material)); */
        const start = new three.Vector3(oldPosition[0], oldPosition[1], oldPosition[2]);
        const end = new three.Vector3(newPosition[0], newPosition[1], newPosition[2]);
        const radius = penAttributes.diameter / 2;
        const height = start.distanceTo(end);
        let geometry = new three.CylinderBufferGeometry(radius, radius, height);
        geometry.translate(0, height / 2, 0);
        geometry.rotateX(Math.PI / 2);

        let color = new three.Color();
        color.fromArray(penAttributes.color4f);
        const material = new three.MeshLambertMaterial({color: color});

        let object = new three.Mesh(geometry, material);
        object.position.copy(start);
        // object.rotation.copy(end.sub(start).normalize());
        object.lookAt(end);

        this._group.add(object);
    }
}

module.exports = ThreeDPenSkin;
