const fs = require("fs");
const path = require("path");

function generateSchema(schemaName) {
  const schemaTemplate = `
      const mongoose = require("mongoose");

      const ${schemaName} = new mongoose.Schema(
        {
          // title: {
          //   type: String,
          //   required: true,
          // },
        },
        {
          timestamps: true,
        }
      );
      module.exports = ${schemaName};
    `;

  const schemasDir = path.join(__dirname, "../../database/schemas");

  if (!fs.existsSync(schemasDir)) {
    fs.mkdirSync(schemasDir, { recursive: true });
  }

  const schemaFile = path.join(schemasDir, `${schemaName}.js`);

  if (fs.existsSync(schemaFile)) {
    console.error(`${schemaName} schema already exists!`);
    return;
  }

  fs.writeFileSync(schemaFile, schemaTemplate.trim());

  console.log(`${schemaName} schema created successfully!`);
}

// Extracting schema name from command line arguments
const [, , schemaName] = process.argv;

if (!schemaName) {
  console.error("Please provide a schema name.");
  process.exit(1);
}

generateSchema(schemaName.replace(".js", ""));
