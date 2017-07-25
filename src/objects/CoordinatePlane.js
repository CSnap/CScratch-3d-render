const three = require('three');
const fontData = require('./helvetiker_regular.typeface.json');

var geometry, textGeometry, textShapes, grid, text, label, xaxis, yaxis, zaxis, material, object, size = 250, step = 25;

geometry = new three.Geometry();
textGeometry = new three.Geometry();
material = new three.LineBasicMaterial({color: 'black'});
object = new three.Object3D();
font = new three.Font(fontData);

function addLabel(x, y, z, label, lColor, lSize, rotation) {
    textShapes = font.generateShapes( label, 16 );
    text = new three.BufferGeometry().fromGeometry(new three.ShapeGeometry( textShapes ));
    text.computeBoundingBox();
    text.computeVertexNormals();
    label = new three.Mesh( text, new three.MeshBasicMaterial( { color: lColor } ) ) ;
    label.material.side = three.DoubleSide;
    label.position.fromArray([x, y, z]);
    label.rotation.x = rotation;
    // label.updateMatrix();
    debugger;
    object.add( label );
}

for ( var i = -size; i <= size; i+= step) {
    geometry.vertices.push(new three.Vector3( -size, i,   -0.04));
    geometry.vertices.push(new three.Vector3( size,i ,  -0.04));
    geometry.vertices.push(new three.Vector3( i, -size, -0.04 ));
    geometry.vertices.push(new three.Vector3( i, size,  -0.04));
}
for ( var i = 0; i <= size*(2/3); i+= step) {
    geometry.vertices.push(new three.Vector3( -12, 0, i ));
    geometry.vertices.push(new three.Vector3( 12, 0,  i));
}
grid = new three.LineSegments(geometry, material);

object.add(grid);

var curve = new three.LineCurve3(new three.Vector3( 0, 0,  -0.04), new three.Vector3( size, 0,  -0.04));

geometry = new three.BufferGeometry().fromGeometry(new three.TubeGeometry(curve, 0, 5 / 2, 0, true));
material = new three.MeshBasicMaterial({color: 'red'});

xaxis = new three.Mesh(geometry, material);

object.add(xaxis);

addLabel(size, 0, -0.04, 'X', 'red', 16, 0);

curve = new three.LineCurve3(new three.Vector3( 0, 0,  -0.04), new three.Vector3(0, size, -0.04));
geometry = new three.BufferGeometry().fromGeometry(new three.TubeGeometry(curve, 0, 5 / 2, 0, true));
material = new three.MeshBasicMaterial({color: 'green'});

yaxis = new three.Mesh(geometry, material);

object.add(yaxis);

addLabel( 0, size, -0.04, 'Y', 'green', 16, 0);

curve = new three.LineCurve3(new three.Vector3( 0, 0, 0), new three.Vector3(0, 0, size*(2/3)));
geometry = new three.BufferGeometry().fromGeometry(new three.TubeGeometry(curve, 0, 5 / 2, 0, true));
material = new three.MeshBasicMaterial({color: 'blue'});

zaxis = new three.Mesh(geometry, material);

object.add(zaxis);

addLabel( 0, 0, size*(2/3), 'Z', 'blue', 16, Math.PI/2);
object.name = "coordinate plane";

module.exports = object;
