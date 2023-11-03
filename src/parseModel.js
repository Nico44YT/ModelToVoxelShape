const { Select, MultiSelect } = require('enquirer');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function parseModel(dirPath, modelName) {
    const modelPath = path.join(dirPath, modelName);

    let file = fs.readFileSync(modelPath);
    file = JSON.parse(file);

    let elements = file.elements;

    const shapes = [];

    for(const i in elements) {
        let _from = elements[i].from;
        let _to = elements[i].to;

        shapes.push(`Block.box(${_from[0]}D, ${_from[1]}D, ${_from[2]}D, ${_to[0]}D, ${_to[1]}D, ${_to[2]}D)`);
    }

    writeFile(dirPath, modelName, shapes);
};

async function writeFile(dirPath, modelName, shapes) {
    let data = 
    "@Override\n" +
    "public VoxelShape getShape(BlockState state, BlockGetter getter, BlockPos pos, CollisionContext collContext) {\n" + 
    "   VoxelShape SHAPE = Shapes.empty();\n";

    for(const i in shapes) {
        data += `   SHAPE = Shapes.join(SHAPE, ${shapes[i]}, BooleanOp.OR);\n`
    }

    data += "   return SHAPE;\n}";

    fs.writeFile(path.join(dirPath, modelName.replace(".json", ".txt")), data, (err) => {
        if(err) throw err;

        console.log("File written")
    })
}

module.exports = {
    parseModel,
    writeFile
}