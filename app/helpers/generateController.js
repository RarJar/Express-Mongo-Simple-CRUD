const fs = require("fs");
const path = require("path");

function generateController(controllerName) {
  const controllerTemplate = `
      class ${controllerName} {
          // Define controller methods here
      }

      module.exports = ${controllerName};
    `;

  const controllersDir = path.join(__dirname, "../controllers");
  if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir);
  }

  const controllerFile = path.join(controllersDir, `${controllerName}.js`);

  if (fs.existsSync(controllerFile)) {
    console.error(`Controller ${controllerName} already exists!`);
    return;
  }

  fs.writeFileSync(controllerFile, controllerTemplate);

  console.log(`${controllerName} controller created successfully!`);
}

// Extracting controller name from command line arguments
const [, , controllerName] = process.argv;

if (!controllerName) {
  console.error("Please provide a controller name.");
  process.exit(1);
}

generateController(controllerName.replace(".js", ""));
