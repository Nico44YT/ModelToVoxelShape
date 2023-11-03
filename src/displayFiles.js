const { Select, MultiSelect } = require('enquirer');
const fs = require('fs');
const path = require('path');
const os = require('os');

function getModels() {
    const baseFolderPath = path.join(__dirname, "../models");

    const files = fs.readdirSync(baseFolderPath);

    const models = [];

    for(const file in files) {
        if(files[file].endsWith(".json")) {
            models.push(files[file]);
        }
    }

    return models;
}

module.exports = {
    getModels
}