const { Select, MultiSelect } = require('enquirer');
const fs = require('fs');
const path = require('path');
const os = require('os');

const {getModels} = require("./src/displayFiles");
const {parseModel} = require("./src/parseModel");

async function main() {

  console.log("Forge Model VoxelShape Parser.\n\nThis is a very simple .json model parser\n\n")

  const prompt = new Select({
    name: "model",
    message: "Which Model would you like to parse (press Enter): ",
    choices: [...getModels()]
  });

  //console.log(getModels());

  const model = await prompt.run();

  console.log("Parsing...");
  parseModel(path.join(__dirname, "models"), model);

}

main();