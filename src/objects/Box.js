const three = require('three');

let object = new three.Mesh(
    new three.BoxBufferGeometry(50, 50, 50),
    new three.MeshLambertMaterial({color: "blue"})
);
object.name = "box";

module.exports = object;
