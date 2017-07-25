const fs = require('fs');
const path = require('path');
const objects = [
    require('./CoordinatePlane'),
    require('./Box')
];

const targetDir = path.resolve(__dirname, "../../dist/assets");
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

objects.forEach(object => {
    fs.writeFileSync(path.resolve(targetDir, object.name + ".json"), JSON.stringify(object.toJSON()));
});
