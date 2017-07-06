const three = require('three');

class EllipseCurve3 extends three.EllipseCurve {
    constructor (aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
        super(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
    }

    getPoint (t) {
        const point = super.getPoint(t);
        return new three.Vector3(point.x, point.y, 0);
    }
}

module.exports = EllipseCurve3;
