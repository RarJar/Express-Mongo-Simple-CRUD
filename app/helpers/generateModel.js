const fs = require("fs");
const path = require("path");

function generateModel(modelName) {
  const modelTemplate = `
      class ${modelName} {
          // Define model methods here
      }

      module.exports = ${modelName};
    `;

  const modelsDir = path.join(__dirname, "../models");
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir);
  }

  const modelFile = path.join(modelsDir, `${modelName}.js`);

  if (fs.existsSync(modelFile)) {
    console.error(`Model ${modelName} already exists!`);
    return;
  }

  fs.writeFileSync(modelFile, modelTemplate);

  console.log(`${modelName} model created successfully!`);
}

// Extracting model name from command line arguments
const [, , modelName] = process.argv;

if (!modelName) {
  console.error("Please provide a model name.");
  process.exit(1);
}

generateModel(modelName.replace(".js", ""));
