const three = require('three');
const fontData = require('./helvetiker_regular.typeface.json');

var geometry, textGeometry, textShapes, grid, text, label, xaxis, yaxis, zaxis, material, object, size = 250, step = 25;

geometry = new three.Geometry();
textGeometry = new three.Geometry();
material = new three.LineBasicMaterial({color: 'black'});
object = new three.Object3D();
font = new three.Font(fontData);

function addLabel(x, y, z, label, lColor, lSize, rotation) {
    text = new three.BufferGeometry().fromGeometry(new three.TextGeometry(label, {
        font: font,
        size: lSize,
        height: 5,
    }));
    text.computeBoundingBox();
    text.computeVertexNormals();
    label = new three.Mesh( text, new three.MeshBasicMaterial( { color: lColor } ) ) ;
    label.position.fromArray([x, y, z]);
    label.rotation.x = rotation;
    object.add( label );
}

for ( var i = -size; i <= size; i+= step) {
    geometry.vertices.push(new three.Vector3( -size, -0.04, i));
    geometry.vertices.push(new three.Vector3( size, -0.04, i));
    geometry.vertices.push(new three.Vector3( i, -0.04, -size ));
    geometry.vertices.push(new three.Vector3( i,  -0.04, size));
}
for ( var i = 0; i <= size*(2/3); i+= step) {
    geometry.vertices.push(new three.Vector3( -12, i, 0 ));
    geometry.vertices.push(new three.Vector3( 12,  i, 0));
}
grid = new three.LineSegments(geometry, material);

object.add(grid);

var curve = new three.LineCurve3(new three.Vector3( 0, 0,  -0.04), new three.Vector3( size, 0,  -0.04));

geometry = new three.BufferGeometry().fromGeometry(new three.TubeGeometry(curve, 0, 5 / 2, 0, true));
material = new three.MeshBasicMaterial({color: 'red'});

xaxis = new three.Mesh(geometry, material);

object.add(xaxis);

addLabel(size, -0.04, 0, 'X', 'red', 16, 0);

curve = new three.LineCurve3(new three.Vector3( 0,  -0.04, 0), new three.Vector3(0, -0.04, size));
geometry = new three.BufferGeometry().fromGeometry(new three.TubeGeometry(curve, 0, 5 / 2, 0, true));
material = new three.MeshBasicMaterial({color: 'green'});

yaxis = new three.Mesh(geometry, material);

object.add(yaxis);

addLabel( 0, -0.04, size, 'Z', 'green', 16, 0);

curve = new three.LineCurve3(new three.Vector3( 0, 0, 0), new three.Vector3(0, size*(2/3), 0));
geometry = new three.BufferGeometry().fromGeometry(new three.TubeGeometry(curve, 0, 5 / 2, 0, true));
material = new three.MeshBasicMaterial({color: 'blue'});

zaxis = new three.Mesh(geometry, material);

object.add(zaxis);

addLabel( 0, size*(2/3), 0, 'Y', 'blue', 16, Math.PI/2);
object.name = "coordinate plane";

module.exports = object;
